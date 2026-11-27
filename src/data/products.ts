export type ProductFeature = {
  id: string;
  title: string;
  description: string;
  details: string[];
  media: {
    layout: "formulas" | "structure" | "custom" | "travel" | "materials";
    images: { src: string; alt: string; width: number; height: number }[];
  };
};

export type Product = {
  id: string;
  slug: string;
  status: "draft" | "published";
  name: string;
  brand: string;
  category: string;
  summary: string;
  features: ProductFeature[];
  layers: { material: string; description: string }[];
  colors: { id: string; label: string; swatch: string; src: string }[];
  applications: { name: string; description: string }[];
  specifications: { capacityMl: number | null; dimensionsMm: string | null; moq: number | null; leadTimeDays: number | null; model: string | null };
  media: { structure: string; video: string | null; videoWidth: number | null; videoHeight: number | null };
  seo: { title: string; description: string };
};

export const products: Product[] = [{
  id: "bobii-ball",
  slug: "bobii-ball-single-dose-container",
  status: "published",
  name: "BOBII BALL Single-Dose Container",
  brand: "BOBII BALL",
  category: "Single-dose cosmetic containers",
  summary: "Explore the BOBII BALL single-dose format, color concepts and brand-specific product development, with customization options defined for your project.",
  features: [
    // Advantages and illustrations: supplied BOBII BALL presentation, pp. 9–12.
    // Material options retain the existing project-specific website copy.
    {
      id: "formula-compatibility", title: "Versatile formula compatibility",
      description: "Bring serums, lotions, creams, oils and cleansing textures into one recognizable container platform. Formula and packaging compatibility are assessed for each project.",
      details: ["One recognizable format", "Across skincare textures", "A coordinated product range"],
      media: { layout: "formulas", images: [
        { src: "/assets/benefits/formula-serum.webp", alt: "Violet BOBII BALL container dispensing a creamy texture", width: 658, height: 1100 },
        { src: "/assets/benefits/formula-cream.webp", alt: "Pink BOBII BALL container illustrating a lotion texture", width: 665, height: 1100 },
        { src: "/assets/benefits/formula-golden-oil.webp", alt: "Golden BOBII BALL container illustrating an oil texture", width: 657, height: 1100 },
        { src: "/assets/benefits/formula-fluid.webp", alt: "Blue BOBII BALL container illustrating a fluid texture", width: 711, height: 1100 },
      ] },
    },
    {
      id: "freshness-protection", title: "Five-layer freshness protection",
      description: "A co-extruded PE / adhesive / EVOH / adhesive / PE shell helps limit oxygen permeation and protect formula freshness. Inner PE contacts the formula, while outer PE provides mechanical protection.",
      details: ["Five-layer co-extrusion", "EVOH oxygen barrier", "Protective PE layers"],
      media: { layout: "structure", images: [
        { src: "/assets/five-layer.png", alt: "Exploded BOBII BALL shell showing the five protective layers", width: 1834, height: 1601 },
      ] },
    },
    {
      id: "customizable-design", title: "Customizable design",
      description: "Develop distinctive shapes, colors and finishes around your brand. Sculpted silhouettes, decorative printing and a coordinated family of formats turn the container into a recognizable part of your product identity.",
      details: ["Distinctive shapes", "Surface finishes & graphics", "A shared brand identity"],
      media: { layout: "custom", images: [
        { src: "/assets/benefits/custom-shapes.webp", alt: "Pink custom container concepts including round, heart and star shapes", width: 1000, height: 765 },
        { src: "/assets/benefits/custom-decoration.webp", alt: "BOBII BALL decoration concepts with printed brand graphics", width: 1000, height: 407 },
      ] },
    },
    {
      id: "portable-format", title: "Lightweight & portable",
      description: "A compact, rounded single-dose format for travel pouches, everyday bags and skincare on the go. Lightweight packaging makes it easy to carry a selection of products without full-size bottles.",
      details: ["Compact rounded format", "Lightweight packaging", "Everyday carry"],
      media: { layout: "travel", images: [
        { src: "/assets/benefits/travel-pouch.webp", alt: "Small colorful capsules in a clear pouch attached to an everyday travel bag", width: 866, height: 1100 },
      ] },
    },
    {
      id: "material-options", title: "Eco-conscious material options",
      description: "Recyclable-material and PCR options are available for discussion. We consider material choices alongside your formula, packaging design and project requirements, with the final selection confirmed during development.",
      details: ["Recyclable-material options", "PCR options to discuss", "Project-specific selection"],
      media: { layout: "materials", images: [
        { src: "/assets/capsule-pearl.webp", alt: "Pearl white container color concept illustrating the single-dose format", width: 320, height: 463 },
        { src: "/assets/capsule-mint.webp", alt: "Mint container color concept illustrating the single-dose format", width: 320, height: 461 },
        { src: "/assets/capsule-peach.webp", alt: "Peach container color concept illustrating the single-dose format", width: 320, height: 462 },
      ] },
    },
  ],
  layers: [
    { material: "PE", description: "Direct contact with the material, featuring excellent chemical compatibility, suitable for various dosage forms" },
    { material: "Adhesive", description: "A bonding layer connecting the adjacent polymer layers." },
    { material: "EVOH", description: "Block oxygen permeation and inhibit the oxidative degradation of active substances" },
    { material: "Adhesive", description: "A second bonding layer connecting EVOH to PE." },
    { material: "PE", description: "Maintain strength to provide protection and buffer the impact of external factors on the EVOH barrier layer" },
  ],
  colors: [
    { id: "red", label: "Red", swatch: "#ef163d" },
    { id: "orange", label: "Orange", swatch: "#ff7415" },
    { id: "yellow", label: "Yellow", swatch: "#ffd400" },
    { id: "green", label: "Green", swatch: "#00b95d" },
    { id: "cyan", label: "Cyan", swatch: "#00cce5" },
    { id: "blue", label: "Blue", swatch: "#1556ef" },
    { id: "violet", label: "Violet", swatch: "#7933df" },
    { id: "pink", label: "Pink", swatch: "#f0189a" },
  ].map((color) => ({ ...color, src: `/assets/capsule-rainbow-${color.id}.webp` })),
  applications: [
    { name: "Serums & oils", description: "Single-dose formats for fluid skincare and oil-based formula development." },
    { name: "Creams & lotions", description: "Explore a compact format for creams, lotions and richer skincare textures." },
    { name: "Makeup & sun care", description: "Discuss foundation and sunscreen projects with our development team." },
  ],
  specifications: { capacityMl: null, dimensionsMm: null, moq: null, leadTimeDays: null, model: null },
  media: {
    structure: "/assets/five-layer.png",
    video: null,
    videoWidth: null,
    videoHeight: null,
  },
  seo: {
    title: "BOBII BALL Single-Dose Cosmetic Containers | L COSMETIX",
    description: "Explore BOBII BALL single-dose cosmetic containers, custom shapes and colors, formulation concepts, and brand-specific OEM/ODM development with L COSMETIX.",
  },
}];

export const getPublishedProducts = () => products.filter((product) => product.status === "published");
export const getProductBySlug = (slug: string) => getPublishedProducts().find((product) => product.slug === slug);
export const getProductById = (id: string) => getPublishedProducts().find((product) => product.id === id);
export const productHref = (product: Pick<Product, "slug">) => `/products/${product.slug}`;
