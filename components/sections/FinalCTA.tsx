import Button from "@/components/ui/Button";
import styles from "./FinalCTA.module.css";

// Copy from docs/texts.md → "Final CTA". CTA routing from docs/sitemap.md.
export default function FinalCTA() {
  return (
    <div className="container">
      <div className={styles.panel}>
        <h2 className={styles.heading}>
          Turn operational uncertainty into a scoped next step.
        </h2>
        <p className={`lead ${styles.text}`}>
          Clarify the bottleneck, decision risk, and appropriate level of work
          before committing budget.
        </p>

        <div className={styles.actions}>
          <Button
            href="#diagnostic-request-form"
            variant="primary"
            icon
            className={styles.primaryBtn}
            data-request-type="Business & IT Diagnostic"
          >
            Request a Business &amp; IT Diagnostic
          </Button>
          <Button
            href="#how-the-diagnostic-works"
            variant="secondary"
            className={styles.secondaryBtn}
          >
            See How the Diagnostic Works
          </Button>
        </div>
      </div>
    </div>
  );
}
