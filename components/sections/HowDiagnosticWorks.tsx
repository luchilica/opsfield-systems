import Button from "@/components/ui/Button";
import styles from "./HowDiagnosticWorks.module.css";

// Copy from docs/texts.md → "How the Diagnostic Works". v2 numbered step columns
// (step 2 featured). CTA "Start With a Diagnostic" → form (generic) per sitemap.md.
const STEPS = [
  "We review workflows, systems, CRM usage, reporting, automation, and decision bottlenecks.",
  "We map likely root causes and score fixes by impact, effort, risk, dependency, and business value.",
  "You receive a clear next step: audit, assessment, roadmap, advisory, implementation support, pause, or no-fit.",
];

export default function HowDiagnosticWorks() {
  return (
    <div className="container">
      <p className="kicker">HOW IT WORKS</p>
      <h2 className={styles.intro}>
        From operating symptoms to a clear next step.
      </h2>

      <ol className={styles.steps}>
        {STEPS.map((text, i) => (
          <li
            key={i}
            className={`${styles.step} ${i === 1 ? styles.stepFeatured : ""}`}
          >
            <span className={styles.number} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className={styles.stepLabel}>Step {i + 1}</p>
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
