import { ArrowRight } from "lucide-react";
import styles from "./DiagnosticScenarios.module.css";

// Copy from docs/texts.md → "Diagnostic Scenarios". Anonymized + illustrative.
// v2 report cards: brand header + Situation / Diagnostic found / Delivered rows.
// Do not present as verified case studies, metrics, logos or testimonials.
type Scenario = {
  client: string;
  environment: string[];
  situation: string;
  found: string;
  delivered: string;
};

const SCENARIOS: Scenario[] = [
  {
    client: "B2B services firm (≈80 employees)",
    environment: ["HubSpot"],
    situation:
      "Inbound leads were falling between marketing and sales — no defined handoff owner, no SLA, and 3 duplicate CRM fields creating confusion.",
    found:
      "4 undocumented handoff points across 2 teams with no shared visibility.",
    delivered:
      "Handoff process reduced from 5 steps to 2. Single ownership assigned per lead stage. Estimated revenue at risk from dropped handoffs: $180K–$240K annually. 30-day cleanup priority list adopted by both teams.",
  },
  {
    client: "Scaling SaaS team (≈120 employees)",
    environment: ["Salesforce", "Looker"],
    situation:
      "Leadership did not trust dashboard numbers — 3 departments used different definitions for the same metrics.",
    found:
      "7 inconsistent metric definitions and 2 disconnected data sources feeding the same dashboard.",
    delivered:
      "Unified reporting definitions document covering 7 previously inconsistent metrics. Data-source consolidation plan projected to remove 40+ hours/month of manual reconciliation. BI roadmap prioritized by stakeholder impact with 90-day execution timeline.",
  },
  {
    client: "Multi-location operator (≈200 employees)",
    environment: ["Monday", "Zapier", "spreadsheets"],
    situation:
      "4 locations running different approval workflows with 6 overlapping tools and no shared process documentation.",
    found:
      "11 manual approval steps that could be reduced to 4 with workflow consolidation.",
    delivered:
      "Bottleneck map identified an estimated $320K in annual labor cost tied to manual approvals. Automation backlog ranked by effort and impact. 90-day roadmap adopted by operations leadership with projected 60% reduction in approval cycle time.",
  },
];

const ROWS = [
  { key: "situation", label: "Situation", num: "01" },
  { key: "found", label: "Diagnostic found", num: "02" },
  { key: "delivered", label: "Delivered", num: "03" },
] as const;

export default function DiagnosticScenarios() {
  return (
    <div className="container">
      <p className="kicker">DIAGNOSTIC SCENARIOS</p>
      <h2 className={styles.intro}>Representative diagnostic scenarios.</h2>

      <div className={styles.list}>
        {SCENARIOS.map((s, i) => (
          <article key={i} className={styles.scenario}>
            <div className={styles.header}>
              <div>
                <p className={styles.scenarioNum}>
                  Scenario · {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.client}>{s.client}</h3>
              </div>
              <div className={styles.envs}>
                {s.environment.map((e) => (
                  <span key={e} className={styles.env}>
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {ROWS.map((r) => (
              <div key={r.key} className={`${styles.rowGrid} ${styles[r.key]}`}>
                <div className={styles.rowLabel}>
                  <span className={styles.rowNum}>{r.num}</span>
                  <span className={styles.rowName}>{r.label}</span>
                </div>
                <p className={styles.rowText}>{s[r.key]}</p>
              </div>
            ))}
          </article>
        ))}
      </div>

      <p className={styles.note}>
        Scenarios are anonymized composites. Figures are illustrative and reflect
        the type of impact diagnostic work typically identifies.
      </p>

      <div className={styles.cta}>
        <a href="#diagnostic-request-form" className={styles.textLink}>
          Request a Diagnostic for Your Team
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
