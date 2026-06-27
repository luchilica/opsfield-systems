import { Bot } from "lucide-react";
import Button from "@/components/ui/Button";
import styles from "./AIProcessAutomation.module.css";

// Copy from docs/texts.md → "AI & Process Automation".
// CTA routing from docs/sitemap.md → "CTA → Request Type Routing".
// Bot icon is permitted ONLY in this section (docs/design.md → Icon Rules).
const SCOPE = [
  "Workflow automation",
  "CRM automation",
  "Document processing",
  "Lead scoring",
  "Reporting automation",
  "AI readiness",
];

export default function AIProcessAutomation() {
  return (
    <div className="container">
      <div className={styles.block}>
        <Bot size={32} className={styles.icon} aria-hidden="true" />

        <h2 className={styles.heading}>
          From diagnostic to implementation: AI &amp; Process Automation.
        </h2>

        <p className={`lead ${styles.text}`}>
          When the diagnostic identifies a clear automation opportunity, Opsfield
          Systems can help turn findings into a practical automation roadmap or
          limited implementation scope.
        </p>

        <p className={styles.scopeLabel}>Scope</p>
        <ul className={styles.scope}>
          {SCOPE.map((item) => (
            <li key={item} className={styles.scopeItem}>
              {item}
            </li>
          ))}
        </ul>

        <p className={styles.principle}>
          We automate the right process, not the loudest request.
        </p>

        <Button
          href="#diagnostic-request-form"
          variant="primary"
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
