import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Dynamic robots.txt. Preview blocks all crawling and omits the sitemap;
// production allows crawling and points to the sitemap. No static robots.txt
// exists in /public — this is the single source.
export default function robots(): MetadataRoute.Robots {
  if (siteConfig.isPreview) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI crawlers — allow indexing for AEO (Answer Engine Optimization)
      { userAgent: "GPTBot", allow: "/", disallow: "/api/" },
      { userAgent: "ChatGPT-User", allow: "/", disallow: "/api/" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/api/" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/api/" },
      { userAgent: "Applebot-Extended", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
