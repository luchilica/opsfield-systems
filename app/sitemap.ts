import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// MVP sitemap: homepage only (the sole "Index" route per docs/sitemap.md).
// Legal pages (noindex), the 404, and on-page section anchors are excluded.
// Preview returns no URLs so preview hosts never publish a useful sitemap.
// Uses siteConfig.url (no trailing slash) to match the canonical Next actually
// renders for the homepage (Next strips the root trailing slash).
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.isPreview) return [];

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
