import Button from "@/components/ui/Button";
import styles from "./WhyOpsfield.module.css";

// Copy from docs/texts.md → "Why Opsfield Systems".
// CTA → form with data-request-type "Business & IT Diagnostic" per sitemap.md.
const PAIRS = [
  {
    others: "SaaS integrator → picks a platform",
    opsfield: "Maps your process and data flow",
  },
  {
    others: "Automation agency → automates existing workflow",
    opsfield: "Checks if the workflow should exist",
  },
  {
    others: "Internal hire → builds what is requested",
    opsfield: "Diagnoses what is actually needed",
  },
  {
    others: "Dev agency → writes code to spec",
    opsfield: "Reviews whether the spec solves the problem",
  },
];

export default function WhyOpsfield() {
  return (
    <div className="container">
      <p className="kicker">THE DIFFERENCE</p>
      <h2 className={styles.intro}>Why Opsfield Systems</h2>
      <p className={`lead ${styles.text}`}>
        The difference is what gets validated before budget, tools, or
        implementation are committed.
      </p>

      <div className={styles.pairs}>
        {PAIRS.map((pair, i) => (
          <div key={i} className={styles.pair}>
            <div className={`${styles.half} ${styles.others}`}>
              <span className={`xsmall ${styles.othersLabel}`}>Others</span>
              <span className={styles.cellText}>{pair.others}</span>
            </div>
            <div className={`${styles.half} ${styles.opsfield}`}>
              <span className={`xsmall ${styles.opsfieldLabel}`}>Opsfield</span>
              <span className={styles.cellText}>{pair.opsfield}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <Button
          href="#diagnostic-request-form"
          variant="primary"
          icon
          data-request-type="Business & IT Diagnostic"
        >
          Validate the Decision Before You Implement
        </Button>
      </div>
    </div>
  );
}
