"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import styles from "./FAQ.module.css";

// All Q&A copy from docs/texts.md → "FAQ".
// Fit / Not Fit answers are rendered as semantic lists per
// docs/optimization.md → "Fit / Not Fit implementation" (allowed restructuring
// of the compact source paragraph into concise lists).

type FaqItem =
  | { q: string; type: "text"; a: string }
  | { q: string; type: "fit"; intro: string; items: string[] }
  | {
      q: string;
      type: "notfit";
      intro: string;
      items: string[];
      closing: string;
    };

const ITEMS: FaqItem[] = [
  {
    q: "Is this a sales call?",
    type: "text",
    a: "No. It is a structured diagnostic conversation to identify likely bottlenecks and the safest next step.",
  },
  {
    q: "How much does the diagnostic cost?",
    type: "text",
    a: "The initial diagnostic conversation (30–45 minutes) is complimentary and carries no obligation. If the diagnostic identifies a clear next step, we provide a fixed-scope proposal with defined deliverables and pricing before any commitment. Paid engagements are scoped individually based on the number of systems, workflows, and stakeholders involved.",
  },
  {
    q: "How long does the diagnostic process take?",
    type: "text",
    a: "The first conversation takes 30–45 minutes. A paid audit, assessment, or roadmap usually depends on the number of systems, workflows, and stakeholders involved.",
  },
  {
    q: "Do you implement systems?",
    type: "text",
    a: "Yes, when the diagnostic, audit, assessment, roadmap, or architecture review validates the scope.",
  },
  {
    q: "Do you work remotely or on-site?",
    type: "text",
    a: "Most diagnostic and advisory work is remote-first. On-site work in California is available when the scope requires it.",
  },
  {
    q: "What systems do you work with?",
    type: "text",
    a: "We work with environments using HubSpot, Salesforce, Pipedrive, Asana, Monday, Notion, QuickBooks, Zapier, Make, and related business tools.",
  },
  {
    q: "Who do you work with best?",
    type: "fit",
    intro: "Our strongest fit is a B2B company with 50–250 employees that is facing:",
    items: [
      "Cross-functional process or system complexity",
      "Weak visibility across CRM or SaaS tools",
      "Unclear automation or AI priorities",
      "A high-impact migration or integration decision that needs independent review",
    ],
  },
  {
    q: "When are you not the right fit?",
    type: "notfit",
    intro: "We are usually not the right fit for:",
    items: [
      "Hourly staff augmentation",
      "Basic tool setup without process or data complexity",
      "A predetermined tool-first project that excludes problem definition",
      "Requests for guaranteed ROI before baseline analysis",
    ],
    closing:
      "A no-fit decision is a valid outcome, and we will recommend a safer next step where possible.",
  },
  {
    q: "Do you guarantee ROI?",
    type: "text",
    a: "No. ROI requires baseline data, scope definition, adoption risk review, and implementation assumptions.",
  },
];

export default function FAQ() {
  // First item open by default; single-open accordion.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container">
      <h2 className={styles.intro}>FAQ</h2>

      <div className={styles.list}>
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const triggerId = `faq-trigger-${i}`;
          const panelId = `faq-panel-${i}`;

          return (
            <div key={i} className={styles.item}>
              <h4 className={styles.heading}>
                <button
                  type="button"
                  id={triggerId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`${styles.chevron} ${
                      isOpen ? styles.chevronOpen : ""
                    }`}
                  />
                </button>
              </h4>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={styles.panel}
                hidden={!isOpen}
              >
                {item.type === "text" && (
                  <p className={styles.answer}>{item.a}</p>
                )}

                {item.type === "fit" && (
                  <>
                    <p className={styles.answer}>{item.intro}</p>
                    <ul className={styles.criteria}>
                      {item.items.map((c) => (
                        <li key={c} className={styles.criterion}>
                          <CheckCircle2
                            size={20}
                            aria-hidden="true"
                            className={styles.fitIcon}
                          />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {item.type === "notfit" && (
                  <>
                    <p className={styles.answer}>{item.intro}</p>
                    <ul className={styles.criteria}>
                      {item.items.map((c) => (
                        <li key={c} className={styles.criterion}>
                          <XCircle
                            size={20}
                            aria-hidden="true"
                            className={styles.notFitIcon}
                          />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`${styles.answer} ${styles.closing}`}>
                      {item.closing}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
