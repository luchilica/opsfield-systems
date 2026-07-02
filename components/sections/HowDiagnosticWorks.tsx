import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import styles from "./HowDiagnosticWorks.module.css";

// Copy from docs/texts.md → "How the Diagnostic Works".
// CTA "Start With a Diagnostic" → form, generic (no data-request-type) per sitemap.md.
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
          <li key={i}>
            <Card hover={false}>
              <div className={styles.step}>
                <div className={styles.stepHead}>
                  <span className={styles.number} aria-hidden="true">
                    {i + 1}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className={styles.connector} aria-hidden="true" />
                  )}
                </div>
                <p className={styles.stepText}>
                  <span className="xsmall">Step {i + 1}</span>
                  <br />
                  {text}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ol>

      <div className={styles.cta}>
        <Button href="#diagnostic-request-form" variant="primary" icon>
          Start With a Diagnostic
        </Button>
      </div>
    </div>
  );
}
