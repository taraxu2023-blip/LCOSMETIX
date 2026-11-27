/**
 * Content source: L_COSMETIX_官网重建完整方案_中英文文案_V1.docx,
 * sections 4 and E (13 collections / 23 formulation concepts).
 * Publication is a website visibility setting, separate from development stage.
 * Concentrations, efficacy, sampling availability and commercial readiness have
 * not been supplied as verified specifications and are not inferred here.
 */
export type ProductConceptCollection = {
  id: string;
  containerProductId: string;
  publicationStatus: "draft" | "published";
  developmentStage: "concept" | "sampling" | "validated";
  name: string;
  category: string;
  summary: string;
  productNames: string[];
  formulationThemes: string[];
  sourcePages: string;
  illustration: { src: string; alt: string; width: number; height: number };
};

const capsuleIllustrations = {
  blue: { src: "/assets/capsule-rainbow-blue.webp", height: 461 },
  cyan: { src: "/assets/capsule-rainbow-cyan.webp", height: 458 },
  green: { src: "/assets/capsule-rainbow-green.webp", height: 461 },
  orange: { src: "/assets/capsule-rainbow-orange.webp", height: 461 },
  pink: { src: "/assets/capsule-rainbow-pink.webp", height: 462 },
  red: { src: "/assets/capsule-rainbow-red.webp", height: 460 },
  violet: { src: "/assets/capsule-rainbow-violet.webp", height: 461 },
  yellow: { src: "/assets/capsule-rainbow-yellow.webp", height: 460 },
  aqua: { src: "/assets/capsule-aqua.webp", height: 463 },
  mint: { src: "/assets/capsule-mint.webp", height: 461 },
  lilac: { src: "/assets/capsule-lilac.webp", height: 463 },
  peach: { src: "/assets/capsule-peach.webp", height: 462 },
  pearl: { src: "/assets/capsule-pearl.webp", height: 463 },
} as const;

type ConceptInput = Omit<ProductConceptCollection,
  "containerProductId" | "publicationStatus" | "developmentStage" | "illustration"
> & { color: keyof typeof capsuleIllustrations };

function developmentConcept({ color, ...input }: ConceptInput): ProductConceptCollection {
  return {
    ...input,
    containerProductId: "bobii-ball",
    publicationStatus: "published",
    developmentStage: "concept",
    illustration: {
      src: capsuleIllustrations[color].src,
      alt: `${color[0].toUpperCase()}${color.slice(1)} BOBII BALL container concept illustration`,
      width: 320,
      height: capsuleIllustrations[color].height,
    },
  };
}

export const productConceptCollections: ProductConceptCollection[] = [
  developmentConcept({
    id: "advanced-hydration", name: "Advanced Hydration for Dry Skin",
    category: "Hydration & barrier care", color: "blue", sourcePages: "4–5",
    summary: "A toner, essence and oil-cream direction for dry-skin product development.",
    productNames: ["Hydrating Toner", "Repair Essence", "Nourishing Oil Cream"],
    formulationThemes: ["Hyaluronic acid", "Ceramides", "Botanical oils"],
  }),
  developmentConcept({
    id: "pha-clarifying", name: "PHA Clarifying Collection",
    category: "Clarifying & oil control", color: "green", sourcePages: "6–7",
    summary: "A coordinated toner, essence and gel-cream concept for clarifying skincare briefs.",
    productNames: ["Clarifying Soft Toner", "Clarifying Essence", "Clarifying Gel Cream"],
    formulationThemes: ["PHA", "Niacinamide", "Salicylic acid"],
  }),
  developmentConcept({
    id: "soothing-collection", name: "Soothing Collection",
    category: "Sensitive skin care", color: "cyan", sourcePages: "8–9",
    summary: "A three-part skincare direction built around soothing and barrier-care formulation themes.",
    productNames: ["Soothing Hydration Toner", "Soothing Repair Essence", "Soothing Barrier Cream"],
    formulationThemes: ["Centella", "Panthenol", "Ectoin", "Ceramides"],
  }),
  developmentConcept({
    id: "retinol-renewal", name: "Retinol Renewal",
    category: "Renewal skincare", color: "violet", sourcePages: "10–11",
    summary: "A retinol-led toner, essence and cream concept for a coordinated skincare range.",
    productNames: ["Retinol Renewal Toner", "Retinol Renewal Essence", "Retinol Renewal Cream"],
    formulationThemes: ["Retinol", "Niacinamide", "Peptides"],
  }),
  developmentConcept({
    id: "sensitive-skin-renewal", name: "Sensitive Skin Renewal",
    category: "Renewal skincare", color: "pink", sourcePages: "12–13",
    summary: "A renewal-oriented toner, essence and cream direction for sensitive-skin development briefs.",
    productNames: ["Soothing Renewal Toner", "Renewal Repair Essence", "Renewal Barrier Cream"],
    formulationThemes: ["Peptides", "Niacinamide", "Ectoin"],
  }),
  developmentConcept({
    id: "balancing-ferment-oil", name: "Balancing Ferment Oil",
    category: "Facial oils", color: "yellow", sourcePages: "14",
    summary: "A facial-oil development direction exploring squalane and botanical lipids.",
    productNames: ["Balancing Ferment Oil"],
    formulationThemes: ["Squalane", "Botanical lipids"],
  }),
  developmentConcept({
    id: "nourishing-facial-oil", name: "Nourishing Facial Oil",
    category: "Facial oils", color: "orange", sourcePages: "15",
    summary: "An oil-format concept for brands exploring single-dose facial care.",
    productNames: ["Nourishing Facial Oil"],
    formulationThemes: ["Botanical oils", "Ceramide NP"],
  }),
  developmentConcept({
    id: "radiance-tone-up-cream", name: "Radiance Tone-Up Cream",
    category: "Hybrid beauty & sun care", color: "red", sourcePages: "16",
    summary: "A tone-up cream direction connecting skincare and cosmetic product development.",
    productNames: ["Radiance Tone-Up Cream"],
    formulationThemes: ["Niacinamide", "Tone-up cream concept"],
  }),
  developmentConcept({
    id: "gentle-cleansing-oil", name: "Gentle Cleansing Oil",
    category: "Cleansing solutions", color: "aqua", sourcePages: "17",
    summary: "A cleansing-oil concept with an emulsifying system to discuss during formulation development.",
    productNames: ["Gentle Cleansing Oil"],
    formulationThemes: ["Oil cleansing", "Emulsifying system"],
  }),
  developmentConcept({
    id: "gentle-cleansing-milk", name: "Gentle Cleansing Milk",
    category: "Cleansing solutions", color: "mint", sourcePages: "18",
    summary: "A milk-texture cleansing direction for a single-dose facial cleansing project.",
    productNames: ["Gentle Cleansing Milk"],
    formulationThemes: ["Milk-texture cleansing concept"],
  }),
  developmentConcept({
    id: "fresh-foam-cleanser", name: "Fresh Foam Cleanser",
    category: "Cleansing solutions", color: "lilac", sourcePages: "19",
    summary: "A foam-cleanser direction exploring an amino-acid and soap-based cleansing system.",
    productNames: ["Fresh Foam Cleanser"],
    formulationThemes: ["Amino-acid cleansing", "Soap-based system"],
  }),
  developmentConcept({
    id: "hydrating-foundation-serum", name: "Hydrating Foundation Serum",
    category: "Hybrid beauty & sun care", color: "peach", sourcePages: "20",
    summary: "A serum-inspired foundation direction for hybrid skincare and makeup development.",
    productNames: ["Hydrating Foundation Serum"],
    formulationThemes: ["Serum-inspired foundation concept"],
  }),
  developmentConcept({
    id: "daily-defense-sunscreen", name: "Daily Defense Sunscreen",
    category: "Hybrid beauty & sun care", color: "pearl", sourcePages: "21",
    summary: "A single-dose sunscreen development direction, with formula and performance testing defined per project.",
    productNames: ["Daily Defense Sunscreen"],
    formulationThemes: ["Single-dose sunscreen development"],
  }),
];

export function getPublishedConceptCollections(containerProductId?: string) {
  return productConceptCollections.filter((collection) =>
    collection.publicationStatus === "published" &&
    (containerProductId === undefined || collection.containerProductId === containerProductId),
  );
}

export function getConceptById(id: string) {
  return getPublishedConceptCollections().find((collection) => collection.id === id);
}
