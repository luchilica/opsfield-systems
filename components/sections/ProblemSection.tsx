import { GitBranch, Database, BarChart3, Workflow, Layers } from "lucide-react";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./ProblemSection.module.css";

// Copy from docs/texts.md → "Problem Section". Full-fill brand block (v2). The
// causes list uses the exact root-cause terms from the approved proof line;
// "Where root causes appear" echoes that sentence's framing. No invented copy.
const CAUSES = [
  { title: "Handoffs", Icon: GitBranch },
  { title: "CRM logic", Icon: Database },
  { title: "Reporting definitions", Icon: BarChart3 },
  { title: "Ownership gaps", Icon: Workflow },
  { title: "Tool sprawl", Icon: Layers },
];

export default function ProblemSection() {
  return (
    <div className="container">
      <PlusMark size={140} className={styles.plusTop} />
      <PlusMark size={80} className={styles.plusBottom} />

      <div className={styles.grid}>
        <div className={styles.block}>
          <p className={styles.eyebrow}>THE PROBLEM</p>
          <h2>Your business may not have a technology problem first.</h2>
          <p className={`lead ${styles.text}`}>
            Growth often slows because processes, data, ownership, and systems no
            longer work together.
          </p>
          <Button
            href="#diagnostic-request-form"
            variant="on-brand"
            icon
            className={styles.cta}
            data-request-type="Business & IT Diagnostic"
          >
            Diagnose the Operating Bottleneck
          </Button>
        </div>

        <div className={styles.causes}>
          <p className={styles.causesHead}>Where root causes appear</p>
          {CAUSES.map(({ title, Icon }, i) => (
            <div key={title} className={styles.cause}>
              <span className={styles.causeIcon}>
                <Icon size={19} aria-hidden="true" />
              </span>
              <span className={styles.causeName}>{title}</span>
              <span className={styles.causeNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
