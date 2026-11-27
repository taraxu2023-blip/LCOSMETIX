// Source: L_COSMETIX_官网重建完整方案_中英文文案_V1.docx, sections A2–C and F.
// The user confirmed the founding year as 2015 on 2026-11-26; company.ts is the shared source.
// Facility roles describe the supplied business structure, not independently audited certification.
export const companyProfile = {
  introduction: "L COSMETIX is a Singapore-based beauty technology and innovation company connecting single-dose packaging, cosmetic research and development, and OEM/ODM collaboration.",
  story: [
    "Our roots in Korean beauty brand consultancy shaped how we understand a product: through its formula, presentation and place in a brand’s portfolio. That perspective has developed into a focus on single-dose technology, product engineering and manufacturing collaboration.",
    "Today, BOBII BALL brings that work into a distinctive single-dose format. We connect our Guangzhou development and production capabilities with international business operations in Singapore and independent manufacturing partners, helping brands move from an initial idea to an agreed development route.",
  ],
  principles: [
    { label: "Our mission", title: "Enable the next idea.", description: "To empower beauty brands through technology, science-driven product development and integrated manufacturing solutions." },
    { label: "Our vision", title: "Build lasting partnerships.", description: "To become a trusted international beauty technology partner, connecting technical development with commercial needs." },
    { label: "Our philosophy", title: "Science is the language of skin.", description: "We translate scientific understanding into meaningful product experiences, with formulation, packaging and use considered together." },
  ],
} as const;

export const inHouseCapabilities = [
  { location: "Singapore", title: "Global business operations", description: "Our international commercial hub supports customer relationships, business development, project management and cross-border collaboration." },
  { location: "Guangzhou", title: "In-house research & development", description: "Our directly operated R&D center focuses on cosmetic formulation, single-dose technology, BOBII BALL development and product innovation." },
  { location: "Guangzhou", title: "In-house manufacturing", description: "Our directly operated production base supports process development, product manufacturing and the commercialization of innovative beauty products." },
] as const;

export const manufacturingPartners = [
  { location: "Nanjing", title: "Independent manufacturing partner", description: "An independent OEM partner supports commercial-scale production for selected cosmetic applications within our manufacturing network." },
  { location: "Singapore", title: "Independent manufacturing partner", description: "An independent OEM partner provides additional contract manufacturing options for product-specific and international market requirements." },
] as const;

export const oemOdmServices = [
  { title: "Product strategy", description: "Define the product direction, intended use, target market and role within your brand portfolio." },
  { title: "Formulation development", description: "Discuss formula direction, ingredients and texture, with compatibility requirements assessed for the selected format." },
  { title: "BOBII BALL integration", description: "Consider the container, formula and production process together when developing a single-dose product." },
  { title: "Packaging design", description: "Explore shape, color, capacity and presentation options according to technical feasibility and project scope." },
  { title: "Prototyping & sampling", description: "Use agreed prototypes and samples to review appearance, formula, user experience and development priorities." },
  { title: "Manufacturing & quality coordination", description: "Define a suitable production route, specifications, quality requirements and handover responsibilities with the appropriate facility or partner." },
] as const;

export const projectApproach = [
  { title: "Define the brief", description: "Share your company, target market, formula direction, preferred format, estimated volume and launch plans. Together, we define the development scope." },
  { title: "Develop the concept", description: "Align the formula, packaging and customization direction, then identify the prototype or sample work needed to evaluate the idea." },
  { title: "Review & validate", description: "Review project samples and agree the applicable compatibility, stability, performance and quality checks. Requirements depend on the formula and target market." },
  { title: "Prepare for production", description: "Confirm the specification, production route, order conditions and agreed responsibilities before moving toward manufacturing and delivery." },
] as const;
