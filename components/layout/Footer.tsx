import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import CookieConsentReopener from "@/components/analytics/CookieConsentReopener";
import styles from "./Footer.module.css";

// Copy, labels and targets from docs/texts.md + docs/sitemap.md → "Footer".
// Note: "Team" → #delivery-model (NOT #team).
const COMPANY_LINKS = [
  { label: "Team", href: "#delivery-model" },
  { label: "Services", href: "#what-we-diagnose" },
  { label: "Results", href: "#proof-examples" },
  { label: "Contact", href: "#diagnostic-request-form" },
];

const GET_STARTED_LINKS = [
  { label: "Request Diagnostic", href: "#diagnostic-request-form" },
  { label: "How It Works", href: "#how-the-diagnostic-works" },
  { label: "FAQ", href: "#faq" },
];

// Legal links are real page routes, not anchors.
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

function LinkGroup({
  title,
  links,
  extra,
}: {
  title: string;
  links: { label: string; href: string }[];
  extra?: ReactNode;
}) {
  return (
    <div>
      <h2 className={styles.groupTitle}>{title}</h2>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* CTA panel */}
        <div className={styles.ctaPanel}>
          <p className={styles.ctaText}>
            Start with clarity before investing in tools or implementation.
          </p>
          <Button
            href="#diagnostic-request-form"
            variant="primary"
            data-request-type="Business & IT Diagnostic"
          >
            Request a Diagnostic
          </Button>
        </div>

        {/* Positioning */}
        <p className={styles.positioning}>
          Opsfield Systems — senior-led IT and business advisory for B2B
          companies facing process, data, and system complexity.
        </p>

        {/* Link groups */}
        <div className={styles.columns}>
          <LinkGroup title="Company" links={COMPANY_LINKS} />
          <LinkGroup title="Get Started" links={GET_STARTED_LINKS} />
          <LinkGroup
            title="Legal"
            links={LEGAL_LINKS}
            extra={<CookieConsentReopener className={styles.link} />}
          />
        </div>

        {/* Copyright */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Opsfield Systems. California, USA.
          </p>
        </div>
      </div>
    </footer>
  );
}
