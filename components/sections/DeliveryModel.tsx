import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import styles from "./DeliveryModel.module.css";

// Copy from docs/texts.md → "Delivery Model". Names/bios are fictional
// working-brand placeholders (authorized) to be replaced before production.
// CTA → form, generic (no data-request-type).
const TEAM = [
  {
    slug: "daniel-kovacs",
    name: "Daniel Kovacs",
    role: "Managing Partner",
    initials: "DK",
    focus:
      "Operating model design, diagnostic methodology, roadmap prioritization, and executive decision support.",
    background:
      "12+ years in B2B operations consulting. Previously led process transformation at mid-market SaaS and services firms across CRM, RevOps, and cross-functional workflow design.",
  },
  {
    slug: "alina-torres",
    name: "Alina Torres",
    role: "Solution Architect",
    initials: "AT",
    focus:
      "CRM architecture, RevOps pipeline design, data flow mapping, integrations, automation design, and implementation risk review.",
    background:
      "10+ years in systems architecture and integration. Deep experience with HubSpot, Salesforce, and multi-tool B2B environments including Zapier, Make, and custom middleware.",
  },
];

// Build-time check: render the WebP portrait if it exists, otherwise an initials
// placeholder. Dropping the file into public/images/team/ and rebuilding swaps
// the placeholder for the photo automatically — no code change needed.
function portraitSrc(slug: string): string | null {
  const rel = `/images/team/${slug}.webp`;
  const abs = path.join(process.cwd(), "public", "images", "team", `${slug}.webp`);
  return existsSync(abs) ? rel : null;
}

export default function DeliveryModel() {
  return (
    <div className="container">
      <h2 className={styles.intro}>Senior attention without a handoff chain.</h2>
      <p className={`lead ${styles.text}`}>
        Opsfield Systems works with 4–6 active clients at a time so senior
        advisors remain involved from problem framing through scope and delivery.
      </p>

      {/* Team photos: generate AI headshots via HeadshotPro, Dreamwave, or
          Fotor. Save as WebP 400×400+. Do not use real people's photos without
          consent. Replace placeholders before production. */}
      <div className={styles.roles}>
        {TEAM.map((member) => {
          const src = portraitSrc(member.slug);
          const alt = `${member.name}, ${member.role} at Opsfield Systems`;
          return (
            <Card key={member.slug}>
              <div className={styles.member}>
                {src ? (
                  <Image
                    src={src}
                    alt={alt}
                    width={120}
                    height={120}
                    className={styles.photo}
                  />
                ) : (
                  <span className={styles.avatar} aria-hidden="true">
                    {member.initials}
                  </span>
                )}
                <h3 className={styles.roleTitle}>{member.name}</h3>
                <p className={styles.roleLabel}>{member.role}</p>
                <p className={styles.roleText}>
                  <span className={styles.fieldLabel}>Focus: </span>
                  {member.focus}
                </p>
                <p className={styles.roleText}>
                  <span className={styles.fieldLabel}>Background: </span>
                  {member.background}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <p className={styles.environments}>
        <span className={styles.environmentsLabel}>Relevant environments: </span>
        HubSpot, Salesforce, Pipedrive, Asana, Monday, Notion, QuickBooks,
        Zapier, and Make.
      </p>

      <div className={styles.cta}>
        <a href="#diagnostic-request-form" className={styles.textLink}>
          Work With Senior Advisors
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
