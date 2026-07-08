"use client";

import { useEffect } from "react";
import { ANALYTICS_ENABLED } from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";

// Delegated, passive click observer for cta_click + nav_anchor_click. No
// preventDefault — default link behavior is untouched. While ANALYTICS_ENABLED
// is false no listener is attached and nothing happens. Every CTA on the site
// targets one of these two anchors, so classification needs no per-CTA markup.
const CTA_TARGETS = new Set([
  "#diagnostic-request-form",
  "#how-the-diagnostic-works",
]);

export default function AnalyticsClickTracker() {
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const text = (anchor.textContent ?? "").trim();

      // Header desktop + drawer nav links live inside <nav>.
      if (href.startsWith("#") && anchor.closest("nav")) {
        trackEvent("nav_anchor_click", { link_text: text, target: href });
        return;
      }

      if (CTA_TARGETS.has(href)) {
        const requestType = anchor.getAttribute("data-request-type");
        // Where on the page the CTA lives — nearest landmark or section id.
        const cta_location = anchor.closest("footer")
          ? "footer"
          : anchor.closest("header")
            ? "header"
            : anchor.closest("section[id]")?.id ?? "unknown";
        trackEvent("cta_click", {
          cta_text: text,
          target: href,
          cta_location,
          ...(requestType ? { request_type: requestType } : {}),
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
