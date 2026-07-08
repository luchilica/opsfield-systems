import { siteConfig } from "@/lib/site-config";
import { FAQ_ITEMS, faqAnswerText } from "@/components/sections/faqData";

// Homepage JSON-LD (@graph). Pure Server Component — renders a single
// <script type="application/ld+json">. All URLs derive from getCanonicalUrl(),
// never a hardcoded domain. Templates: docs/optimization.md → "Structured Data".
// No logo / sameAs / telephone / streetAddress / aggregateRating, and no O-1.

// Homepage meta — verbatim from docs/texts.md → "Page: Diagnostic-First IT &
// Business Consulting" (mirrors app/page.tsx).
const HOME_TITLE = "Diagnostic-First IT & Business Consulting | Opsfield Systems";
const HOME_DESCRIPTION =
  "B2B companies with 50–250 employees use Opsfield Systems to diagnose process, CRM, data, and IT bottlenecks before committing to tools, hires, or implementation.";

export default function JsonLd() {
  // No trailing slash — matches the canonical/og:url/sitemap Next emits for the
  // homepage (siteConfig.url is already slash-normalized).
  const home = siteConfig.url;
  const organizationId = `${home}#organization`;
  const websiteId = `${home}#website`;
  const serviceUrl = `${home}#business-it-diagnostic`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: home,
        description:
          "Diagnostic-first IT and business consulting for B2B companies.",
        areaServed: { "@type": "Country", name: "United States" },
        address: {
          "@type": "PostalAddress",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: home,
        publisher: { "@id": organizationId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": home,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        url: home,
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": serviceUrl,
        name: "Business & IT Diagnostic",
        description:
          "A complimentary 30–45 minute diagnostic conversation to identify process, data, CRM, and IT system bottlenecks in B2B companies.",
        serviceType: "Diagnostic-first IT and business consulting",
        provider: { "@id": organizationId },
        areaServed: { "@type": "Country", name: "United States" },
        url: serviceUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${home}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faqAnswerText(item),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
