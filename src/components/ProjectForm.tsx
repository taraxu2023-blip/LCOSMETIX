"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { company } from "../data/company";
import { getPublishedProducts } from "../data/products";
import { getPublishedConceptCollections } from "../data/concepts";

export default function ProjectForm({ productId }: { productId?: string }) {
  const availableProducts = getPublishedProducts();
  const initialProductId = productId || availableProducts[0]?.id || "";
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [selectedConceptId, setSelectedConceptId] = useState("");
  const conceptCollections = getPublishedConceptCollections(selectedProductId);
  const [intent, setIntent] = useState("Samples");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest: intent }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true || typeof result.reference !== "string") throw new Error(result.error || "Your inquiry could not be saved. Please try again.");
      setReceipt(result.reference);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Connection interrupted. Please try again or email us.");
    } finally { submitting.current = false; setPending(false); }
  }

  return (
    <div className="contact-layout">
      <div className="contact-heading">
        <img className="inquiry-logo" src="/assets/lcosmetix-logo.webp" alt={company.displayName} width="900" height="117" />
        <h2 className="inquiry-specialization">{company.specialization}</h2>
        <p>Tell our factory and export team what you have in mind.</p>
        <address className="company-contact">
          <a href={`mailto:${company.email}`}>{company.email} <ArrowUpRight size={16} /></a>
          <span>{company.legalName}</span>
          <span>{company.address}</span>
        </address>
      </div>
      <div>
        {receipt && (
          <div className="brief-success" role="status">
            <Check size={32} />
            <h3>Thank you. Your inquiry has been saved.</h3>
            <p>Keep this reference for any follow-up with our team.</p>
            <p className="inquiry-reference">{receipt}</p>
            <a className="text-link" href={`mailto:${company.email}?subject=${encodeURIComponent(`BOBII BALL inquiry ${receipt}`)}`}>
              Email our team <ArrowUpRight size={18} />
            </a>
            <button className="text-link" type="button" onClick={() => { form.current?.reset(); setIntent("Samples"); setSelectedProductId(initialProductId); setSelectedConceptId(""); setReceipt(null); }}>
              Start another inquiry <ArrowUpRight size={18} />
            </button>
          </div>
        )}
        <form ref={form} onSubmit={submitInquiry} className="project-form" hidden={!!receipt}>
          <fieldset disabled={pending}>
            <legend>I’m interested in</legend>
            <div className="intent-options">
              {["Samples", "Private label", "Custom development"].map((option) => (
                <label key={option} className={intent === option ? "is-selected" : ""}>
                  <input type="radio" name="interest" value={option} checked={intent === option} onChange={() => setIntent(option)} />{option}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form-pair">
            <label>Your name *<input required name="name" autoComplete="name" placeholder="Your full name" maxLength={120} /></label>
            <label>Company<input name="company" autoComplete="organization" placeholder="Your brand or company" maxLength={150} /></label>
          </div>
          <div className="form-pair">
            <label>Work email *<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" maxLength={254} /></label>
            <label>Country / region *<input required name="country" autoComplete="country-name" placeholder="Your country or region" maxLength={100} /></label>
          </div>
          <div className="form-pair">
            <label>Product *<select name="productId" required value={selectedProductId} onChange={(event) => { setSelectedProductId(event.target.value); setSelectedConceptId(""); }}>
              {availableProducts.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
            </select></label>
            <label>Your WhatsApp (optional)<input type="tel" name="whatsapp" autoComplete="tel" placeholder="Include country code" maxLength={60} /></label>
          </div>
          {conceptCollections.length > 0 && <label>Product concept (optional)<select name="conceptId" value={selectedConceptId} onChange={(event) => setSelectedConceptId(event.target.value)}>
            <option value="">Discuss my own idea / not decided yet</option>
            {conceptCollections.map((concept) => <option key={concept.id} value={concept.id}>{concept.name}</option>)}
          </select><span className="form-field-note">Development concepts. Sampling availability and validation requirements are assessed per project.</span></label>}
          <div className="form-pair">
            <label>Target market (optional)<input name="targetMarket" placeholder="Where you plan to launch" maxLength={150} /></label>
            <label>Estimated order volume (optional)<input name="estimatedQuantity" placeholder="Quantity or a preliminary range" maxLength={100} /></label>
          </div>
          <label>Product requirement *<input name="productRequirement" required placeholder="Format, formula type, estimated quantity…" maxLength={500} /></label>
          <label>Message *<textarea name="message" required rows={3} placeholder="Tell us about your project and launch plans." maxLength={4000} /></label>
          <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="pill dark-pill" disabled={pending}>{pending ? "Saving your inquiry…" : "Get a Quote"} <ArrowUpRight size={20} /></button>
          <p className="fine-print">Required fields are marked *. Your contact details and project information are used to respond to your inquiry.</p>
        </form>
      </div>
    </div>
  );
}
