import { Fragment } from "react";
import {
  GitBranch,
  Database,
  BarChart3,
  Workflow,
  Layers,
  ArrowRight,
} from "lucide-react";
import PlusMark from "./PlusMark";
import styles from "./HeroDiagram.module.css";

// Spec: docs/design.md (v2) → "Hero Diagnostic Map". A blocky brand-blue panel:
// mono status label, the 5 system nodes, and the diagnostic → delivery flow.
// Abstract map (no illustrative metrics) — decorative; the Hero text conveys it.
const NODES = [
  { label: "Processes", Icon: GitBranch },
  { label: "CRM / RevOps", Icon: Database },
  { label: "Data", Icon: BarChart3 },
  { label: "Automation", Icon: Workflow },
  { label: "IT Systems", Icon: Layers },
] as const;

const FLOW = ["Diagnostic", "Roadmap", "Implementation"] as const;

export default function HeroDiagram() {
  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Diagnostic system map: Processes, CRM / RevOps, Data, Automation, and IT Systems are reviewed for bottlenecks, gaps, and risks – from diagnostic to roadmap to implementation."
    >
      <PlusMark size={44} className={styles.cornerPlus} />

      <div className={styles.status}>System Diagnostic Map</div>
      <div className={styles.risks}>Bottlenecks · Gaps · Risks</div>

      <div className={styles.nodes}>
        {NODES.map(({ label, Icon }) => (
          <div key={label} className={styles.node}>
            <Icon size={18} className={styles.nodeIcon} focusable="false" />
            <span className={styles.nodeLabel}>{label}</span>
          </div>
        ))}
      </div>

      <div className={styles.flow}>
        {FLOW.map((step, i) => (
          <Fragment key={step}>
            <span className={styles.flowStep}>{step}</span>
            {i < FLOW.length - 1 && (
              <ArrowRight
                size={14}
                className={styles.flowArrow}
                focusable="false"
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
