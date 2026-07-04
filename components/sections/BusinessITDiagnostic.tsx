import DiagnosticForm from "@/components/ui/DiagnosticForm";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./BusinessITDiagnostic.module.css";

// Copy from docs/texts.md → "Business & IT Diagnostic" (Offer, Before You Commit,
// What Happens After You Submit). One composite section; only #diagnostic-request-form
// is an anchor. v2 block layout: ink output panel + paper cards + bordered form.
const OUTPUT = [
  "Problem summary",
  "Root-cause hypotheses",
  "Fit / no-fit decision",
  "Path to audit, assessment, roadmap, advisory, or implementation",
];

const REVIEW = [
  "Diagnostic question framework",
  "Priority matrix structure",
  "Roadmap structure",
  "Example deliverables",
];

const POST_SUBMIT = [
  "We review your company and main challenge, together with any optional context you choose to provide.",
  "A senior advisor confirms fit and runs the diagnostic around symptoms, systems, bottlenecks, and risks.",
  "If there is a valid next step, we provide a fixed-scope proposal before any commitment.",
];

export default function BusinessITDiagnostic() {
  return (
    <div className="container">
      <p className="kicker">THE DIAGNOSTIC</p>
      <h2 className={styles.intro}>
        A structured first step before another tool, hire, or implementation
        project.
      </h2>
      <p className={`lead ${styles.lead}`}>
        The first diagnostic conversation is a complimentary 30–45 minute fit
        review to frame the problem and identify likely bottleneck areas. Paid
        engagements begin only after a separate written proposal with defined
        scope and pricing.
      </p>

      <div className={styles.grid}>
        {/* Left column — diagnostic output + before you commit */}
        <div className={styles.aside}>
          <div className={styles.outputPanel}>
            <p className={styles.outputLabel}>Diagnostic output</p>
            <ul className={styles.outputList}>
              {OUTPUT.map((o, i) => (
                <li key={o} className={styles.outputItem}>
                  <span className={styles.outputNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Before You Commit</h3>
            <p className={styles.muted}>
              Evaluate the approach before any paid engagement.
            </p>
            <p className={styles.reviewLabel}>Review assets</p>
            <ul className={styles.chips}>
              {REVIEW.map((r) => (
                <li key={r} className={styles.chip}>
                  {r}
                </li>
              ))}
            </ul>
            <p className={styles.muted}>
              No full system access is required for the initial fit review.
              Deeper access starts only after scope and NDA are agreed.
            </p>
          </div>
        </div>

        {/* Right column — after you submit + form */}
        <div className={styles.main}>
          <div className={styles.card}>
            <p className={styles.stepsLabel}>What happens after you submit</p>
            <ol className={styles.steps}>
              {POST_SUBMIT.map((text, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={styles.stepLabel}>Step {i + 1}</p>
                  <p className={styles.stepText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div id="diagnostic-request-form" className={styles.formPanel}>
            <div className={styles.formHeader}>
              <span className={styles.formHeaderTitle}>
                <PlusMark size={20} className={styles.formPlus} />
                Diagnostic Request Form
              </span>
              <span className={styles.formBadge}>
                Complimentary 30–45 min fit review
              </span>
            </div>
            <div className={styles.formBody}>
              <DiagnosticForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
