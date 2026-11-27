// Workbook information and explicit user corrections; see docs/CONTENT.md for sources.
export const company = {
  legalName: "LCOSMETIX PTE.LTD.",
  displayName: "L COSMETIX",
  chineseName: "莱度技术",
  founded: 2015,
  factoryArea: "3,000+ m²",
  teamSize: "30+",
  role: "Source manufacturer & OEM/ODM solution provider",
  specialization: "specializing in proprietary Single-Dose Technology, cosmetic research and development, and integrated OEM/ODM solutions.",
  markets: ["Asia", "Europe", "United States"],
  customers: ["Beauty brands", "Importers & distributors", "OEM manufacturers"],
  email: "info@lcosmetix.com",
  address: "50 Chin Swee Rd, #05-05 Singapore Thong Chai Building, Singapore 169874",
  phone: null,
  whatsapp: null,
  linkedin: null,
  website: "https://www.lcosmetix.com",
  images: {
    factory: { src: "/assets/bobii-manufacturing-base.webp", alt: "BOBIIBALL manufacturing base, supplied by L COSMETIX", width: 1280, height: 1790 },
    production: { src: "/assets/bobii-production.webp", alt: "Single-dose containers on the BOBII BALL production line", width: 1124, height: 1404 },
  },
  // A named certification is not a verified certificate. Never render pending items as badges.
  pending: { certification: "ISO 22716 — certificate and scope not supplied", patentDocuments: null },
} as const;

export const companyStats = [
  { value: String(company.founded), label: "Established" },
  { value: company.factoryArea, label: "Factory area" },
  { value: company.teamSize, label: "Team members" },
];
