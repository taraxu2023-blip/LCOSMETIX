export type Product = {
  id: string;
  slug: string;
  status: "draft" | "published";
  name: string;
  brand: string;
  category: string;
  summary: string;
  features: { title: string; description: string; scope?: "product" | "technology" }[];
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
    { title: "Five-layer barrier", description: "A co-extruded PE / adhesive / EVOH / adhesive / PE structure designed to help protect sensitive formulas.", scope: "technology" },
    { title: "Versatile formula compatibility", description: "Explore serums, creams, lotions, oils, foundations and sunscreens. Compatibility is assessed for each formula.", scope: "technology" },
    { title: "Customizable design", description: "Develop shapes, colors and capacities around your brand and project requirements." },
    { title: "Lightweight & eco-conscious", description: "Lightweight single-dose packaging, with recyclable-material and PCR options available for discussion. Final material choice is project-specific." },
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
