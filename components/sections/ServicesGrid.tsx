"use client";

// Areas of Work — the priced "what we implement after the diagnostic" section.
// Diagnostic-first funnel is preserved: the hero card is the FREE primary
// diagnostic (→ #diagnostic-request-form) and every paid card routes back to the
// same form. Photos are illustrative (decorative alt) and duotone-treated in CSS
// to stay on the monochrome + blue system. Expand pattern mirrors FAQ.tsx
// (button + aria-expanded + hidden panel, content stays in HTML for SEO).
// Prices are floors for a lean 25–50-person team; exact scope set by diagnostic.

import { useState } from "react";
import Image from "next/image";
import { Plus, ArrowRight, Award, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/i18n/useT";
import styles from "./ServicesGrid.module.css";

const FORM_HREF = "#diagnostic-request-form";

type Service = {
  id: string;
  image: string;
  category: string;
  title: string;
  price: string;
  priceNote?: string;
  free?: boolean;
  lede: string;
  context: string;
  includes: string[];
  result: string;
  timeline: string;
  cta: string;
};

const SERVICES: Service[] = [
  {
    id: "primary-diagnostic",
    image: "/services/diagnostic.jpg",
    category: "Start here",
    title: "Primary Diagnostic",
    price: "Free",
    free: true,
    lede: "A structured first look at where your processes and systems drift apart.",
    context:
      "The primary diagnostic is a complimentary fit review: we frame the problem, surface likely bottlenecks, and tell you whether a paid engagement is even warranted — with no obligation.",
    includes: [
      "Problem framing",
      "Likely bottleneck areas",
      "Fit / no-fit decision",
      "Recommended next step",
    ],
    result: "A written next-step recommendation",
    timeline: "30–45 minutes",
    cta: "Book the free diagnostic",
  },
  {
    id: "process-operations",
    image: "/services/process.jpg",
    category: "Implementation",
    title: "Process & Operations",
    price: "from $3,500",
    priceNote: "scope set after the diagnostic",
    lede: "Redesign the handoffs, approvals, and ownership that slow a growing team down.",
    context:
      "We turn the diagnostic's process map into a working operating model: clarified ownership, documented workflows, and removed duplication — sized for a 25–50-person team, not an enterprise rollout.",
    includes: [
      "Target operating model",
      "Documented core workflows",
      "Ownership & handoff map",
      "Rollout checklist",
    ],
    result: "An operating model your team actually follows",
    timeline: "2–4 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "revops",
    image: "/services/revops.jpg",
    category: "Implementation",
    title: "RevOps: CRM, Data & Reporting",
    price: "from $4,900",
    priceNote: "scope set after the diagnostic",
    lede: "Make your CRM, pipeline, and reporting tell the truth again.",
    context:
      "We clean up CRM structure, reporting rules, and revenue data flow so your numbers are trustworthy and your team stops working around the system.",
    includes: [
      "CRM structure cleanup",
      "Reporting & dashboard rules",
      "Pipeline & data-flow fixes",
      "Core integrations",
    ],
    result: "A CRM and reporting setup you can trust",
    timeline: "3–6 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "automation",
    image: "/services/automation.jpg",
    category: "Implementation",
    title: "AI & Process Automation",
    price: "from $3,900",
    priceNote: "scope set after the diagnostic",
    lede: "Remove the manual, repetitive work — but only where it actually pays off.",
    context:
      "Starting from the diagnostic, we automate the workflows with real payback: connecting your tools, adding decision logic, and keeping a human where judgment matters.",
    includes: [
      "Automation opportunity shortlist",
      "Workflow automation build",
      "Tool & data connections",
      "Handover & documentation",
    ],
    result: "Automations that quietly save hours each week",
    timeline: "2–5 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "it-risk",
    image: "/services/security.jpg",
    category: "Implementation",
    title: "IT Risk & Security",
    price: "from $1,900",
    priceNote: "scope set after the diagnostic",
    lede: "See where your data, access, and systems put the business at risk.",
    context:
      "A focused review of accounts, access, data handling, and single points of failure — with plain-language findings and a prioritized fix list, scaled to a small company.",
    includes: [
      "Access & account review",
      "Data-handling risks",
      "Single points of failure",
      "Prioritized fix list",
    ],
    result: "A prioritized risk & fix report",
    timeline: "1–3 weeks",
    cta: "Discuss this in your diagnostic",
  },
];

function ServiceCard({
  service,
  priority,
}: {
  service: Service;
  priority: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const triggerId = `svc-trigger-${service.id}`;
  const panelId = `svc-panel-${service.id}`;

  return (
    <article
      className={`${styles.card} ${service.free ? styles.cardFree : ""}`}
    >
      <div className={styles.media}>
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={styles.img}
          priority={priority}
        />
        <span className={styles.category}>{t(service.category)}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{t(service.title)}</h3>
          <span
            className={`${styles.price} ${service.free ? styles.priceFree : ""}`}
          >
            {t(service.price)}
          </span>
        </div>
        <p className={styles.lede}>{t(service.lede)}</p>

        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            if (!open) {
              trackEvent("service_card_open", { service: service.id });
            }
            setOpen((v) => !v);
          }}
        >
          <span>{open ? t("Hide details") : t("Show details")}</span>
          <span
            aria-hidden="true"
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
          >
            <Plus size={16} />
          </span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className={styles.panel}
          hidden={!open}
        >
          <p className={styles.context}>{t(service.context)}</p>

          <p className={styles.metaLabel}>{t("What's included")}</p>
          <ul className={styles.includes}>
            {service.includes.map((item) => (
              <li key={item} className={styles.include}>
                <Check
                  size={16}
                  aria-hidden="true"
                  className={styles.checkIcon}
                />
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt className={styles.factKey}>{t("Result")}</dt>
              <dd className={styles.factVal}>{t(service.result)}</dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factKey}>{t("Timeline")}</dt>
              <dd className={styles.factVal}>{t(service.timeline)}</dd>
            </div>
          </dl>

          {service.priceNote && (
            <p className={styles.priceNote}>
              {t(service.price)} · {t(service.priceNote)}
            </p>
          )}

          <a href={FORM_HREF} className={styles.cardCta}>
            {t(service.cta)}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ServicesGrid() {
  const t = useT();

  return (
    <div className="container">
      <p className={styles.badge}>{t("AREAS OF WORK")}</p>
      <h2 className={styles.intro}>{t("From diagnostic to implementation.")}</h2>
      <p className={styles.lead}>
        {t(
          "Start free with a primary diagnostic, then move into focused implementation. Prices below are floors for a lean 25–50-person team; exact scope is set by the diagnostic.",
        )}
      </p>

      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} priority={i === 0} />
        ))}
      </div>

      {/* O-1 secondary service — quiet, muted strip; must read as secondary. */}
      <div className={styles.o1}>
        <span className={styles.o1Tile} aria-hidden="true">
          O-1
        </span>
        <div className={styles.o1Body}>
          <div className={styles.o1Head}>
            <span className={styles.o1Icon}>
              <Award size={18} aria-hidden="true" />
            </span>
            <h3 className={styles.o1Title}>{t("O-1 Readiness Support")}</h3>
            <span className={styles.o1Badge}>{t("Secondary service")}</span>
            <span className={styles.o1Price}>{t("On request")}</span>
          </div>
          <p className={styles.o1Desc}>
            {t(
              "For IT professionals and founders exploring the O-1 visa path, we help structure evidence of extraordinary ability: publication strategy, portfolio architecture, recommendation coordination, and expert profile positioning. We work alongside qualified immigration counsel — we do not provide legal advice or file petitions.",
            )}
          </p>
          <a href={FORM_HREF} className={styles.o1Cta}>
            {t("Ask about O-1 readiness")}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className={styles.footnote}>
        {t(
          "Every paid engagement starts from the free diagnostic — you only pay once scope is agreed in writing.",
        )}
      </p>
    </div>
  );
}
