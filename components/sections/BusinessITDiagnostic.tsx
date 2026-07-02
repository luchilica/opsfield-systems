import { CheckCircle2, FileText, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import DiagnosticForm from "@/components/ui/DiagnosticForm";
import styles from "./BusinessITDiagnostic.module.css";

// Copy from docs/texts.md → "Business & IT Diagnostic" (Offer, Before You Commit,
// What Happens After You Submit). One composite section; sub-blocks share one panel
// and have no independent anchors except #diagnostic-request-form on the form.

const OUTPUT = [
  "Problem summary",
  "Root-cause hypotheses",
  "Fit / no-fit decision",
  "Path to audit, assessment, roadmap, advisory, or implementation",
];

const POST_SUBMIT_STEPS = [
  "We review your company and main challenge, together with any optional context you choose to provide.",
  "A senior advisor confirms fit and runs the diagnostic around symptoms, systems, bottlenecks, and risks.",
  "If there is a valid next step, we provide a fixed-scope proposal before any commitment.",
];

export default function BusinessITDiagnostic() {
  return (
    <div className="container">
      <p className="kicker">THE DIAGNOSTIC</p>
      <div className={styles.panel}>
        {/* Sub-block 1 — Offer */}
        <div className={styles.subblock}>
          <h2>
            A structured first step before another tool, hire, or implementation
            project.
          </h2>
          <p className={`lead ${styles.lead}`}>
            The first diagnostic conversation is a complimentary 30–45 minute fit
            review to frame the problem and identify likely bottleneck areas.
            Paid engagements begin only after a separate written proposal with
            defined scope and pricing.
          </p>

          <p className={styles.outputLabel}>What you receive</p>
          <ul className={styles.outputList}>
            {OUTPUT.map((item) => (
              <li key={item} className={styles.outputItem}>
                <CheckCircle2
                  size={20}
                  aria-hidden="true"
                  className={styles.outputIcon}
                />
                <span>{item}</span>
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
            Request a Business &amp; IT Diagnostic
          </Button>
        </div>

        {/* Sub-block 2 — Before You Commit (Risk-Reduction Panel) */}
        <div className={`${styles.subblock} ${styles.divided}`}>
          <h3>Before You Commit</h3>
          <p className={styles.riskText}>
            Evaluate the approach before any paid engagement.
          </p>

          <div className={styles.riskRow}>
            <FileText size={24} aria-hidden="true" className={styles.riskIcon} />
            <p>
              <span className={styles.riskLabel}>Review assets: </span>
              <span className={styles.riskText}>
                diagnostic question framework, priority matrix structure, roadmap
                structure, and example deliverables.
              </span>
            </p>
          </div>

          <div className={styles.riskRow}>
            <Shield size={24} aria-hidden="true" className={styles.riskIcon} />
            <p>
              <span className={styles.riskLabel}>Risk control: </span>
              <span className={styles.riskText}>
                no full system access is required for the initial fit review.
                Deeper access starts only after scope and NDA are agreed.
              </span>
            </p>
          </div>

          <p className={`small ${styles.privacy}`}>
            By submitting the form, you acknowledge our{" "}
            <a href="/privacy-policy">Privacy Policy</a>. We use your information
            to evaluate fit and contact you about your diagnostic request.
          </p>
        </div>

        {/* Sub-block 3 — What Happens After You Submit the Request */}
        <div className={`${styles.subblock} ${styles.divided}`}>
          <h3>What Happens After You Submit the Request</h3>
          <ol className={styles.steps}>
            {POST_SUBMIT_STEPS.map((text, i) => (
              <li key={i} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {i + 1}
                </span>
                <p className={styles.stepText}>
                  <span className="xsmall">Step {i + 1}</span>
                  <br />
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Sub-block 4 — Diagnostic Request Form */}
        <div
          id="diagnostic-request-form"
          className={`${styles.subblock} ${styles.divided}`}
        >
          <h3>Diagnostic Request Form</h3>
          <DiagnosticForm />
        </div>
      </div>
    </div>
  );
}
