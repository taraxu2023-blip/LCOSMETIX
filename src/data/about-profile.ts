// Sources: the official About Us page and user-supplied company materials.
// Global presence follows the corrected bilingual plan screenshot supplied on 2026-11-27.
// Use company.founded for the confirmed founding year; legal/contact details remain in company.ts.
// These operational roles do not establish ownership of every listed manufacturing facility.
export const aboutProfile = {
  headline: { line1: "Research-led.", line2: "Client-focused." },
  mission: {
    title: "Our mission and vision",
    body: "To empower beauty brands through proprietary technology, science-driven product development, and integrated manufacturing solutions.",
    vision: "To become a trusted international beauty technology partner.",
    philosophy: "Science Is the Language of Skin. We translate scientific understanding into meaningful product experiences.",
  },
  leadership: { name: "Tara Xu", role: "CEO" },
  introduction: "L COSMETIX is an R&D-driven cosmetics supply chain company working with beauty brands on client-focused product development. We connect ingredients, formulations, packaging and manufacturing across facial care, body care, hair care, makeup and beauty devices.",
  positioning: "We bring research, design and supply-chain coordination into the same development conversation, so your product brief guides the technical work.",
  focusAreas: ["Facial care", "Body care", "Hair care", "Makeup", "Beauty devices"],
  story: [
    "Product development starts with the intended use, customer and market. We discuss the formula, packaging and product experience together, then define the development work and responsibilities needed to move the idea forward.",
    "Our Guangzhou research and project teams connect with ingredient, sourcing, manufacturing and export functions across our network. This coordinated approach supports projects from an initial direction through design, sample review and production preparation.",
  ],
  capabilities: [
    { title: "Research & development", description: "Explore formulation, packaging and beauty-device development around the product brief, with technical requirements defined for the intended application." },
    { title: "Ingredients & sourcing", description: "Connect raw-ingredient research and supply with the sourcing needs of your formulation and target market." },
    { title: "Packaging & design", description: "Consider format, appearance and the way a product is used alongside its formulation, rather than treating packaging as a separate decision." },
    { title: "Manufacturing & export", description: "Coordinate the selected manufacturing route, order execution and export requirements, with the participating teams and responsibilities agreed for each project." },
  ],
  commercialHub: {
    location: "Singapore",
    title: "Global Business Operations",
    description: "Singapore serves as our international commercial hub, supporting global customer relationships, business development, project management, and cross-border collaboration.",
    functions: ["Global customer relationships", "Business development", "Project management", "Cross-border collaboration"],
  },
  network: [
    { id: "guangzhou-rd", location: "Guangzhou, China", title: "In-House R&D", description: "Our directly operated R&D center in Guangzhou focuses on cosmetic formulation, proprietary Single-Dose Technology, BOBII BALL development, and product innovation." },
    { id: "guangzhou-manufacturing", location: "Guangzhou, China", title: "In-House Manufacturing", description: "Our directly operated manufacturing base in Guangzhou supports process development, product manufacturing, and the commercialization of innovative beauty products, strengthening collaboration between R&D and production." },
    { id: "nanjing-partner", location: "Nanjing, China", title: "Manufacturing Partner", description: "Our independent OEM manufacturing partner in Nanjing supports commercial-scale production for selected cosmetic applications as part of our flexible manufacturing network." },
    { id: "singapore-partner", location: "Singapore", title: "Manufacturing Partner", description: "Our independent OEM manufacturing partner in Singapore provides additional contract manufacturing capabilities for product-specific and international market requirements." },
  ],
  manufacturingIntro: "A development brief connects the formula, packaging, sample review and production requirements. We align the work with the selected team and manufacturing route, then confirm specifications, responsibilities and the checks needed before production.",
  bobiiIntro: "BOBII BALL brings our single-dose work into a distinctive cosmetic container. Explore its five-layer material structure, color concepts and formulation-development directions, or discuss a format for your own brand.",
} as const;
