// Sources: the official About Us page and the company-role diagram supplied by the user.
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
  headquarters: {
    location: "Guangzhou, China",
    title: "R&D & project headquarters",
    description: "Guangzhou brings together formulation, packaging and device development with design, finished-goods sales, order execution and administrative support.",
    functions: ["Formulation, packaging & device R&D", "Design team", "Finished-goods sales & order execution", "Administration"],
  },
  network: [
    { location: "Shanghai, China", title: "Ingredients research & supply", description: "Raw-ingredient R&D, sales and order execution support the ingredient side of product development." },
    { location: "Hong Kong", title: "International business finance", description: "Financing coordination supports international business within the company network." },
    { location: "Singapore", title: "Sourcing & export", description: "Sourcing for markets outside Europe and America connects with finished-goods export operations." },
    { location: "Foshan, Guangdong, China", title: "Manufacturing network", description: "A manufacturing location within the network supports the production route selected for the project." },
    { location: "Osan-si, Gyeonggi-do, South Korea", title: "Manufacturing network", description: "The Korean manufacturing location forms part of the network available for product-specific production coordination." },
  ],
  manufacturingIntro: "A development brief connects the formula, packaging, sample review and production requirements. We align the work with the selected team and manufacturing route, then confirm specifications, responsibilities and the checks needed before production.",
  bobiiIntro: "BOBII BALL brings our single-dose work into a distinctive cosmetic container. Explore its five-layer material structure, color concepts and formulation-development directions, or discuss a format for your own brand.",
} as const;
