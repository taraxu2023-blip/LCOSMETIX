import type { Metadata } from "next";

// Indexing is opt-in. Do not automatically publish the existing official site's URL.
const configuredUrl = process.env.SITE_URL;
export const siteUrl = configuredUrl && /^https:\/\/[a-z0-9.-]+(?::\d+)?\/?$/i.test(configuredUrl)
  ? configuredUrl.replace(/\/$/, "") : null;
export const indexingEnabled = process.env.ENABLE_INDEXING === "true" && siteUrl !== null;

export function pageMetadata(copy: { title: string; description: string }, path: string): Metadata {
  return {
    ...copy,
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}${path}` } } : {}),
    robots: { index: indexingEnabled, follow: indexingEnabled },
    openGraph: { ...copy, type: "website", locale: "en_US", ...(siteUrl ? { url: `${siteUrl}${path}` } : {}) },
  };
}
