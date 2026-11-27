import { getProductById, productHref } from "./products";
import { getPublishedConceptCollections } from "./concepts";
import { productConceptsHref } from "../lib/navigation";

type NewsItem = {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
  publishedAt: string | null;
  dateLabel: string | null;
};

// The exact date describes the actual website update, not a product launch.
// Other supplied materials establish a year only; no day/month is inferred.
export function getLatestNews(): NewsItem[] {
  const product = getProductById("bobii-ball");
  const collections = product ? getPublishedConceptCollections(product.id) : [];
  const conceptCount = collections.reduce((total, collection) => total + collection.productNames.length, 0);
  return [
    {
      id: "single-dose-technology-hub",
      category: "Website update",
      title: "Explore our Single-Dose Technology hub",
      summary: "Our dedicated technology page brings together the five-layer structure, material principles, formula compatibility and sample requests.",
      href: "/single-dose-technology",
      image: { src: "/assets/news-five-layer.webp", alt: "Exploded view of the five-layer BOBII BALL container", width: 256, height: 223 },
      publishedAt: "2026-11-27",
      dateLabel: "27 Nov 2026",
    },
    ...(product ? [{
      id: "bobii-ball-format",
      category: "Product news",
      title: "Introducing the BOBII BALL single-dose format",
      summary: "Introduced in 2026, BOBII BALL connects container design, formulation development and single-dose filling for beauty brands.",
      href: productHref(product),
      image: { src: product.colors.find((color) => color.id === "violet")?.src || product.colors[0].src, alt: "Violet BOBII BALL single-dose container concept", width: 320, height: 461 },
      publishedAt: null,
      dateLabel: "2026",
    }, {
      id: "formulation-collections",
      category: "Product innovations",
      title: `${collections.length} collections. ${conceptCount} development concepts.`,
      summary: "Explore skincare, facial oils, cleansing, hybrid makeup and sun care as starting points for brand-specific development.",
      href: productConceptsHref,
      image: { src: product.colors.find((color) => color.id === "blue")?.src || product.colors[0].src, alt: "Blue BOBII BALL container illustrating formulation concepts", width: 320, height: 461 },
      publishedAt: null,
      dateLabel: null,
    }] : []),
  ];
}
