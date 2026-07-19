import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./AIProcessAutomation.module.css";

// Copy from docs/texts.md → "AI & Process Automation". v2 ink block edition.
// CTA routing from docs/sitemap.md → "CTA → Request Type Routing".
const SCOPE = [
  "Workflow automation",
  "CRM automation",
  "Document processing",
  "Lead scoring",
  "Reporting automation",
  "AI readiness",
];

// Process-to-automation flow (docs/texts.md → "Flow") as a numbered pipeline:
// Diagnostic → Automation opportunity → Roadmap / limited scope.
const FLOW = [
  { n: "01", label: "Diagnostic" },
  { n: "02", label: "Automation opportunity" },
  { n: "03", label: "Roadmap or limited scope" },
] as const;

export default function AIProcessAutomation() {
  return (
    <div className="container">
      <PlusMark size={220} className={styles.plusTop} />
      <PlusMark size={120} className={styles.plusBottom} />

      <div className={styles.inner}>
        <p className={styles.badge}>AI &amp; AUTOMATION</p>
        <h2 className={styles.heading}>
          From diagnostic to implementation: AI &amp; Process Automation.
        </h2>
        <p className={`lead ${styles.text}`}>
          When the diagnostic identifies a clear automation opportunity, Opsfield
          Systems can help turn findings into a practical automation roadmap or
          limited implementation scope.
        </p>

        <ol className={styles.flow} aria-label="From diagnostic to automation">
          {FLOW.map((step, i) => (
            <Fragment key={step.n}>
              <li className={styles.pill}>
                <span className={styles.pillNode}>{step.n}</span>
                <span className={styles.pillLabel}>{step.label}</span>
              </li>
              {i < FLOW.length - 1 && (
                <li className={styles.flowArrow} aria-hidden="true">
                  <ArrowRight size={20} />
                </li>
              )}
            </Fragment>
          ))}
        </ol>

        <div className={styles.scopeBox}>
          <p className={styles.scopeLabel}>Scope</p>
          <ul className={styles.scope}>
            {SCOPE.map((item) => (
              <li key={item} className={styles.scopeItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className={styles.principle}>
          We automate the right process, not the loudest request.
        </blockquote>

        <Button
          href="#diagnostic-request-form"
          variant="on-brand"
          icon
          className={styles.cta}
          data-request-type="AI & Process Automation Review"
        >
          Assess Automation Opportunities
        </Button>
      </div>
    </div>
  );
}
