// Content: supplied bilingual website plan (2026-11-20), sections A2, C and F;
// BOBII BALL Chinese presentation (2026-11-11), pp. 8, 11 and 15.
// Facility ownership follows the website plan; photographs do not establish ownership or certification.
export const oemCollaboration = [
  {
    name: "OEM",
    title: "Bring your formula.",
    description: "Start with your existing formulation or product specification. We align packaging, sample work and the manufacturing route with your technical and commercial requirements.",
    scope: ["Formula & process review", "Packaging integration", "Production coordination"],
  },
  {
    name: "ODM",
    title: "Build a new product.",
    description: "Start with a brand brief or product concept. We connect product strategy, formulation development, BOBII BALL integration and sampling to shape a distinctive product for your brand.",
    scope: ["Concept development", "Formulation & packaging", "Prototypes & samples"],
  },
] as const;

export const oemCapabilityRoles = [
  { location: "Guangzhou", title: "In-house R&D & manufacturing", description: "Directly operated capabilities connect formulation research, product engineering and production development." },
  { location: "Nanjing & Singapore", title: "Independent manufacturing partners", description: "A partner network supports manufacturing routes selected for the product and project scope." },
  { location: "Singapore", title: "Global business operations", description: "International customer communication, project management and cross-border commercial coordination." },
] as const;

export const oemQualityChecks = [
  { title: "Formula & packaging", description: "Agree the compatibility, stability and performance checks for your formula, container and intended market." },
  { title: "Samples & production process", description: "Review appearance, filling, opening and dispensing through the prototype and sample work agreed for your project." },
  { title: "Specifications & handover", description: "Confirm materials, specifications, quality criteria and production responsibilities before moving into manufacturing." },
] as const;

export const oemMedia = {
  factory: { src: "/assets/bobii-manufacturing-base.webp", srcSet: "/assets/bobii-manufacturing-base-mobile.webp 640w, /assets/bobii-manufacturing-base.webp 1280w", width: 1280, height: 1790, alt: "Exterior of the Ruilai BOBII BALL manufacturing base", caption: "Ruilai · BOBII BALL manufacturing base" },
  production: { src: "/assets/bobii-production.webp", srcSet: "/assets/bobii-production-mobile.webp 640w, /assets/bobii-production.webp 1124w", width: 1124, height: 1404, alt: "Rows of BOBII BALL single-dose capsules on a production line", caption: "BOBII BALL · Single-dose capsule production" },
  team: { src: "/assets/bobii-production-team.webp", srcSet: "/assets/bobii-production-team-mobile.webp 700w, /assets/bobii-production-team.webp 1400w", width: 1400, height: 1050, alt: "Production team beside equipment processing colored BOBII BALL capsules", caption: "Production team and equipment on the manufacturing floor" },
} as const;
