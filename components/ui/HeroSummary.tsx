import { Info, Search, CheckCircle2 } from "lucide-react";
import styles from "./HeroSummary.module.css";

// Hero brand panel — an illustrative diagnostic summary (mirrors Scenario 01).
// Situation / Diagnostic found / Delivered read as a timeline (the diagnostic
// process), capped by two headline metrics. The figures are illustrative,
// estimate-framed — not a verified Opsfield result.
const ROWS = [
  {
    label: "01 · Situation",
    text: "Leads dropping between marketing & sales",
    Icon: Info,
  },
  {
    label: "02 · Diagnostic found",
    text: "4 undocumented handoff points, 2 teams",
    Icon: Search,
  },
  {
    label: "03 · Delivered",
    text: "5 steps → single owner per stage",
    Icon: CheckCircle2,
  },
] as const;

export default function HeroSummary() {
  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Illustrative diagnostic summary: a B2B services firm where leads dropped between marketing and sales; the diagnostic found four undocumented handoff points and delivered a single owner per lead stage, with an estimated $180K+ in revenue at risk addressed on a 30-day cleanup."
    >
      <div className={styles.header}>
        <p className={styles.eyebrow}>Diagnostic summary</p>
        <span className={styles.tag}>Representative scenario</span>
      </div>
      <p className={styles.client}>B2B services firm · ~80 employees</p>

      <ol className={styles.timeline}>
        {ROWS.map((r) => (
          <li key={r.label} className={styles.step}>
            <span className={styles.node}>
              <r.Icon size={16} aria-hidden="true" />
            </span>
            <p className={styles.stepText}>{r.text}</p>
          </li>
        ))}
      </ol>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <p className={styles.metricNum}>$180K+</p>
          <p className={styles.metricCap}>Revenue at risk (est.)</p>
        </div>
        <div className={styles.metric}>
          <p className={styles.metricNum}>30-day</p>
          <p className={styles.metricCap}>Cleanup priority</p>
        </div>
      </div>
    </div>
  );
}
