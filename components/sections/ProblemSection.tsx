import Button from "@/components/ui/Button";
import styles from "./ProblemSection.module.css";

// Copy from docs/texts.md → "Problem Section".
// CTA routing from docs/sitemap.md → "CTA → Request Type Routing".
export default function ProblemSection() {
  return (
    <div className="container">
      <div className={styles.block}>
        <h2>Your business may not have a technology problem first.</h2>

        <p className={`lead ${styles.text}`}>
          Growth often slows because processes, data, ownership, and systems no
          longer work together.
        </p>

        <p className={styles.proof}>
          In diagnostic reviews, root causes often appear in handoffs, CRM
          logic, reporting definitions, ownership gaps, and tool sprawl.
        </p>

        <Button
          href="#diagnostic-request-form"
          variant="primary"
          icon
          className={styles.cta}
          data-request-type="Business & IT Diagnostic"
        >
          Diagnose the Operating Bottleneck
        </Button>
      </div>
    </div>
  );
}
