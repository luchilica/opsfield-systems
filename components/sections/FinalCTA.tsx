import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./FinalCTA.module.css";

// Copy from docs/texts.md → "Final CTA". v2 full-fill brand block with + motifs.
// CTA routing from docs/sitemap.md. Does not repeat the Hero positioning.
export default function FinalCTA() {
  return (
    <div className="container">
      <PlusMark size={260} className={styles.plusTop} />
      <PlusMark size={140} className={styles.plusBottom} />

      <div className={styles.inner}>
        <h2 className={styles.heading}>
          From uncertainty to a scoped next step.
        </h2>
        <p className={`lead ${styles.text}`}>
          Clarify the bottleneck and risk level before committing budget.
        </p>

        <div className={styles.actions}>
          <Button
            href="#diagnostic-request-form"
            variant="on-brand"
            icon
            data-request-type="Business & IT Diagnostic"
          >
            Request a Business &amp; IT Diagnostic
          </Button>
          <Button
            href="#how-the-diagnostic-works"
            variant="on-brand-outline"
          >
            See How the Diagnostic Works
          </Button>
        </div>
      </div>
    </div>
  );
}
