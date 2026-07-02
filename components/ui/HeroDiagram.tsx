import { Fragment } from "react";
import {
  GitBranch,
  Database,
  BarChart3,
  Workflow,
  Layers,
  ArrowRight,
} from "lucide-react";
import styles from "./HeroDiagram.module.css";

// Spec: docs/design.md → "Hero Diagnostic Map". A contained diagnostic-readout
// panel: status header, the 5 system nodes, and the diagnostic → delivery flow.
// Decorative — hidden from assistive tech; the Hero text conveys the meaning.
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
      aria-label="Diagnostic system map: Processes, CRM / RevOps, Data, Automation, and IT Systems are reviewed for bottlenecks, gaps, and risks — from diagnostic to roadmap to implementation."
    >
      <div className={styles.status}>
        <span className={styles.pulse} />
        Bottlenecks · Gaps · Risks
      </div>

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
