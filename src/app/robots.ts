import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "../lib/seo";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", ...(indexingEnabled ? { allow: "/", disallow: ["/api/"] } : { disallow: "/" }) }, ...(indexingEnabled ? { sitemap: `${siteUrl}/sitemap.xml` } : {}) };
}
