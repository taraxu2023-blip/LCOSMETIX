import type { MetadataRoute } from "next";
import { getPublishedProducts, productHref } from "../data/products";
import { indexingEnabled, siteUrl } from "../lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled || !siteUrl) return [];
  return ["/", "/about", "/oem-odm", "/single-dose-technology", ...getPublishedProducts().map(productHref)].map((path) => ({ url: `${siteUrl}${path}` }));
}
