import { Fragment } from "react";
import {
  GitBranch,
  Database,
  BarChart3,
  Workflow,
  Layers,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import styles from "./HeroDiagram.module.css";

// Spec: docs/design.md → "Hero Diagnostic Map — visual specification".
// 5 nodes with specified Lucide icons, center callout, bottom flow.
const NODES = [
  { label: "Processes", Icon: GitBranch },
  { label: "CRM / RevOps", Icon: Database },
  { label: "Data", Icon: BarChart3 },
  { label: "Automation", Icon: Workflow },
  { label: "IT Systems", Icon: Layers },
] as const;

const FLOW = ["Diagnostic", "Roadmap", "Implementation"] as const;

// Decorative diagram — hidden from assistive tech; the Hero text conveys the meaning.
export default function HeroDiagram() {
  return (
    <div className={styles.diagram} aria-hidden="true">
      <div className={styles.nodes}>
        {NODES.map(({ label, Icon }, i) => (
          <Fragment key={label}>
            <div className={styles.node}>
              <Icon size={20} className={styles.nodeIcon} focusable="false" />
              <span className={styles.nodeLabel}>{label}</span>
            </div>
            {i < NODES.length - 1 && (
              <span className={styles.connector}>
                <ChevronRight size={16} focusable="false" />
              </span>
            )}
          </Fragment>
        ))}
      </div>

      <div className={styles.callout}>Bottlenecks · Gaps · Risks</div>

      <div className={styles.flow}>
        {FLOW.map((step, i) => (
          <Fragment key={step}>
            <span>{step}</span>
            {i < FLOW.length - 1 && (
              <ArrowRight size={16} className={styles.flowArrow} focusable="false" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
