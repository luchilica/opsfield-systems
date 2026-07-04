import Button from "@/components/ui/Button";
import HeroDiagram from "@/components/ui/HeroDiagram";
import styles from "./Hero.module.css";

// All copy from docs/texts.md → "Hero". Do not alter wording.
export default function Hero() {
  return (
    <div className={`container ${styles.hero}`}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>B2B IT &amp; Operations Advisory</p>

        <h1 className={styles.headline}>
          Diagnostic-First IT &amp; Business{" "}
          <span className={styles.accentWord}>Consulting</span>
        </h1>

        {/* Semantically a paragraph, visually a lead. */}
        <p className={`lead ${styles.subtitle}`}>
          For B2B companies blocked by process, data, and system gaps — we
          diagnose before you build.
        </p>

        <p className={styles.supporting}>
          Opsfield Systems helps B2B teams find where operations, CRM, data
          flow, automation, and IT systems are slowing execution.
        </p>

        <div className={styles.actions}>
          <Button
            href="#diagnostic-request-form"
            variant="primary"
            icon
            data-request-type="Business & IT Diagnostic"
          >
            Request a Business &amp; IT Diagnostic
          </Button>
          <Button href="#how-the-diagnostic-works" variant="secondary">
            See How the Diagnostic Works
          </Button>
        </div>

        {/* ICP qualifier — supporting chip, not a heading or badge. */}
        <p className={styles.icpChip}>
          Best fit: B2B companies with 50–250 employees.
        </p>

        <p className={`small ${styles.trust}`}>
          Boutique advisory since 2021. Senior-led. Vendor-neutral. 4–6 active
          clients at a time.
        </p>
      </div>

      <div className={styles.visual}>
        <HeroDiagram />
      </div>
    </div>
  );
}
