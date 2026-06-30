"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { FAQ_ITEMS } from "./faqData";
import { trackEvent } from "@/lib/analytics";
import styles from "./FAQ.module.css";

// Q&A content lives in ./faqData (shared with the FAQPage JSON-LD so schema and
// visible text never diverge). Fit / Not Fit answers render as semantic lists
// per docs/optimization.md → "Fit / Not Fit implementation".

export default function FAQ() {
  // First item open by default; single-open accordion.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container">
      <h2 className={styles.intro}>FAQ</h2>

      <div className={styles.list}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const triggerId = `faq-trigger-${i}`;
          const panelId = `faq-panel-${i}`;

          return (
            <div key={i} className={styles.item}>
              <h3 className={styles.heading}>
                <button
                  type="button"
                  id={triggerId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    if (!isOpen) {
                      trackEvent("faq_item_open", { faq_question: item.q });
                    }
                    setOpenIndex(isOpen ? -1 : i);
                  }}
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
              </h3>

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
