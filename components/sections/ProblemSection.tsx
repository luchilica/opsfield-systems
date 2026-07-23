import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { getT } from "@/i18n/t";
import styles from "./ProblemSection.module.css";

// Copy from docs/texts.md → "Problem Section". Full-fill brand block (v2): a
// single, centered problem statement. The root-cause enumeration is NOT listed
// here — the next section (What We Diagnose) owns it, so the two no longer repeat.
export default async function ProblemSection() {
  const t = await getT();
  return (
    <div className="container">
      <PlusMark size={140} className={styles.plusTop} />

      <div className={styles.block}>
        <p className={styles.eyebrow}>{t("THE PROBLEM")}</p>
        <h2 className={styles.heading}>
          {t("Your business may not have a technology problem first.")}
        </h2>
        <p className={`lead ${styles.text}`}>
          {t(
            "Usually it's the handoffs, ownership, and data flow between teams that slow growth — long before the tools do."
          )}
        </p>
        <Button
          href="#diagnostic-request-form"
          variant="on-brand"
          icon
          className={styles.cta}
          data-request-type="Business & IT Diagnostic"
        >
          {t("Diagnose the Operating Bottleneck")}
        </Button>
      </div>
    </div>
  );
}
