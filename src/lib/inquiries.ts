import { randomUUID } from "node:crypto";
import { persistInquiryRecord } from "./inquiry-storage.ts";
import { getProductById } from "../data/products.ts";
import { getConceptById } from "../data/concepts.ts";

export const inquiryInterests = ["Samples", "Private label", "Custom development"] as const;
export type Inquiry = {
  name: string; email: string; company: string; country: string; whatsapp: string;
  interest: string; productId: string; productRequirement: string; message: string;
  conceptId: string; targetMarket: string; estimatedQuantity: string;
};

export function validateInquiry(input: unknown): Inquiry {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Please complete the inquiry form.");
  const data = input as Record<string, unknown>;
  if (data.website) throw new Error("Unable to accept this inquiry.");
  const field = (name: string, max: number, required = true) => {
    const value = data[name];
    if (value !== undefined && typeof value !== "string") throw new Error(`Invalid ${name}.`);
    const text = typeof value === "string" ? value.trim() : "";
    if ((required && !text) || text.length > max || text.includes("\0")) throw new Error(`Please check ${name}.`);
    return text;
  };
  const inquiry = {
    name: field("name", 120), email: field("email", 254), company: field("company", 150, false),
    country: field("country", 100), whatsapp: field("whatsapp", 60, false), interest: field("interest", 40),
    productId: field("productId", 100), productRequirement: field("productRequirement", 500), message: field("message", 4000),
    conceptId: field("conceptId", 100, false), targetMarket: field("targetMarket", 150, false), estimatedQuantity: field("estimatedQuantity", 100, false),
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) throw new Error("Please enter a valid email address.");
  if (!inquiryInterests.some((value) => value === inquiry.interest)) throw new Error("Please choose an inquiry type.");
  if (!getProductById(inquiry.productId)) throw new Error("Please choose an available product.");
  if (inquiry.conceptId) {
    const concept = getConceptById(inquiry.conceptId);
    if (!concept || concept.containerProductId !== inquiry.productId) throw new Error("Please choose an available concept for this product.");
  }
  return inquiry;
}

export async function saveInquiry(inquiry: Inquiry, storageDirectory?: string) {
  const product = getProductById(inquiry.productId);
  if (!product) throw new Error("Product is unavailable.");
  const concept = inquiry.conceptId ? getConceptById(inquiry.conceptId) : null;
  if (inquiry.conceptId && (!concept || concept.containerProductId !== product.id)) throw new Error("Product concept is unavailable.");
  const reference = randomUUID();
  const record = {
    reference, createdAt: new Date().toISOString(), ...inquiry,
    product: { id: product.id, name: product.name, slug: product.slug },
    concept: concept ? { id: concept.id, name: concept.name, developmentStage: concept.developmentStage, productNames: concept.productNames } : null,
  };
  await persistInquiryRecord(reference, JSON.stringify(record, null, 2) + "\n", { directory: storageDirectory });
  return { reference };
}
