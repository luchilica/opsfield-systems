import Button from "@/components/ui/Button";
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

// Process-to-automation flow (docs/texts.md → "Flow").
const FLOW = ["Diagnostic", "Automation opportunity", "Roadmap or limited scope"];

export default function AIProcessAutomation() {
  return (
    <div className="container">
      <p className="kicker">AI &amp; AUTOMATION</p>
      <h2 className={styles.heading}>
        From diagnostic to implementation: AI &amp; Process Automation.
      </h2>
      <p className={`lead ${styles.text}`}>
        When the diagnostic identifies a clear automation opportunity, Opsfield
        Systems can help turn findings into a practical automation roadmap or
        limited implementation scope.
      </p>

      <ol className={styles.flow} aria-label="From diagnostic to automation">
        {FLOW.map((step) => (
          <li key={step} className={styles.flowStep}>
            {step}
          </li>
        ))}
      </ol>

      <div className={styles.scopeBox}>
        <div className={styles.scopeRow}>
          <span className={styles.scopeLabel}>Scope</span>
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
      </div>

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
  );
}
