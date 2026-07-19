import { Fragment } from "react";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import styles from "./WhyOpsfield.module.css";

// Copy from docs/texts.md → "Why Opsfield Systems" (comparison table).
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
      <p className={styles.badge}>THE DIFFERENCE</p>
      <h2 className={styles.intro}>Why Opsfield Systems</h2>
      <p className={`lead ${styles.text}`}>
        The difference is what gets validated before budget, tools, or
        implementation are committed.
      </p>

      <div className={styles.table}>
        <div className={`${styles.head} ${styles.headOthers}`}>
          What others do first
        </div>
        <div className={`${styles.head} ${styles.headOpsfield}`}>
          What Opsfield does first
        </div>
        {PAIRS.map((pair, i) => (
          <Fragment key={i}>
            <div className={`${styles.cell} ${styles.cellOthers}`}>
              <span className={styles.nodeX} aria-hidden="true">
                <X size={15} strokeWidth={2.75} />
              </span>
              <span>{pair.others}</span>
            </div>
            <div className={`${styles.cell} ${styles.cellOpsfield}`}>
              <span className={styles.nodeCheck} aria-hidden="true">
                <Check size={15} strokeWidth={2.75} />
              </span>
              <span>{pair.opsfield}</span>
            </div>
          </Fragment>
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
