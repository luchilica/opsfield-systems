import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import CookieConsentReopener from "@/components/analytics/CookieConsentReopener";
import { getT } from "@/i18n/t";
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
  t,
}: {
  title: string;
  links: { label: string; href: string }[];
  extra?: ReactNode;
  t: (en: string) => string;
}) {
  return (
    <div>
      <h2 className={styles.groupTitle}>{t(title)}</h2>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a href={link.href} className={styles.link}>
              {t(link.label)}
            </a>
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const t = await getT();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* CTA panel */}
        <div className={`${styles.ctaPanel} print-hide`}>
          <p className={styles.ctaText}>
            {t("Start with clarity before investing in tools or implementation.")}
          </p>
          <Button
            href="#diagnostic-request-form"
            variant="on-brand"
            data-request-type="Business & IT Diagnostic"
          >
            {t("Request Diagnostic")}
          </Button>
        </div>

        {/* Positioning */}
        <p className={styles.positioning}>
          {t(
            "Opsfield Systems — senior-led IT and business advisory for B2B companies facing process, data, and system complexity."
          )}
        </p>

        {/* Link groups */}
        <div className={styles.columns}>
          <LinkGroup title="Company" links={COMPANY_LINKS} t={t} />
          <LinkGroup title="Get Started" links={GET_STARTED_LINKS} t={t} />
          <LinkGroup
            title="Legal"
            links={LEGAL_LINKS}
            extra={<CookieConsentReopener className={styles.link} />}
            t={t}
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
