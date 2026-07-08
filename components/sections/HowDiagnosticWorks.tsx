import { Search, Gauge, Signpost } from "lucide-react";
import Button from "@/components/ui/Button";
import styles from "./HowDiagnosticWorks.module.css";

// Copy from docs/texts.md → "How the Diagnostic Works". v2 numbered step columns
// (step 2 featured), each with a title + corner icon. CTA "Start With a
// Diagnostic" → form (generic) per sitemap.md.
const STEPS = [
  {
    title: "Review",
    Icon: Search,
    text: "We review workflows, systems, CRM usage, reporting, automation, and decision bottlenecks.",
  },
  {
    title: "Map & score",
    Icon: Gauge,
    text: "We map likely root causes and score fixes by impact, effort, risk, dependency, and business value.",
  },
  {
    title: "Recommend",
    Icon: Signpost,
    text: "You receive a clear next step: audit, assessment, roadmap, advisory, implementation support, pause, or no-fit.",
  },
];

export default function HowDiagnosticWorks() {
  return (
    <div className="container">
      <p className="kicker">HOW IT WORKS</p>
      <h2 className={styles.intro}>
        From operating symptoms to a clear next step.
      </h2>

      <ol className={styles.steps}>
        {STEPS.map(({ title, Icon, text }, i) => (
          <li
            key={i}
            className={`${styles.step} ${i === 1 ? styles.stepFeatured : ""}`}
          >
            <div className={styles.stepTop}>
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon size={24} className={styles.stepIcon} aria-hidden="true" />
            </div>
            <p className={styles.stepTitle}>{title}</p>
            <p className={styles.stepText}>{text}</p>
          </li>
        ))}
      </ol>

      <Button
        href="#diagnostic-request-form"
        variant="primary"
        icon
        className={styles.cta}
      >
        Start With a Diagnostic
      </Button>
    </div>
  );
}
