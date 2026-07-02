import { GitBranch, Database, BarChart3, Workflow, Layers } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import styles from "./ProblemSection.module.css";

// Copy from docs/texts.md → "Problem Section". The 5 symptom cards use the exact
// root-cause terms from the approved proof line — icon + term only, no invented
// descriptions. CTA routing from docs/sitemap.md → "CTA → Request Type Routing".
const SYMPTOMS = [
  { title: "Handoffs", Icon: GitBranch },
  { title: "CRM logic", Icon: Database },
  { title: "Reporting definitions", Icon: BarChart3 },
  { title: "Ownership gaps", Icon: Workflow },
  { title: "Tool sprawl", Icon: Layers },
];

export default function ProblemSection() {
  return (
    <div className="container">
      <p className="kicker">THE PROBLEM</p>
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
      </div>

      <ul className={styles.symptoms}>
        {SYMPTOMS.map(({ title, Icon }) => (
          <li key={title}>
            <Card hover={false}>
              <div className={styles.symptom}>
                <span className={styles.symptomIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className={styles.symptomTitle}>{title}</h3>
              </div>
            </Card>
          </li>
        ))}
      </ul>

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
  );
}
