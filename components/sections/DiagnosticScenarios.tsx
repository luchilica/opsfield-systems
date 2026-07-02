import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import styles from "./DiagnosticScenarios.module.css";

// Copy from docs/texts.md → "Diagnostic Scenarios". Anonymized + illustrative.
// Do not present as verified case studies, metrics, logos or testimonials.
const SCENARIOS = [
  {
    clientType: "B2B services firm (≈80 employees, HubSpot)",
    situation:
      "Inbound leads were falling between marketing and sales — no defined handoff owner, no SLA, and 3 duplicate CRM fields creating confusion.",
    found:
      "4 undocumented handoff points across 2 teams with no shared visibility.",
    delivered:
      "Handoff process reduced from 5 steps to 2. Single ownership assigned per lead stage. Estimated revenue at risk from dropped handoffs: $180K–$240K annually. 30-day cleanup priority list adopted by both teams.",
  },
  {
    clientType: "Scaling SaaS team (≈120 employees, Salesforce + Looker)",
    situation:
      "Leadership did not trust dashboard numbers — 3 departments used different definitions for the same metrics.",
    found:
      "7 inconsistent metric definitions and 2 disconnected data sources feeding the same dashboard.",
    delivered:
      "Unified reporting definitions document covering 7 previously inconsistent metrics. Data-source consolidation plan eliminated 40+ hours/month of manual reconciliation. BI roadmap prioritized by stakeholder impact with 90-day execution timeline.",
  },
  {
    clientType: "Multi-location operator (≈200 employees, Monday + Zapier + spreadsheets)",
    situation:
      "4 locations running different approval workflows with 6 overlapping tools and no shared process documentation.",
    found:
      "11 manual approval steps that could be reduced to 4 with workflow consolidation.",
    delivered:
      "Bottleneck map identified $320K in annual labor cost tied to manual approvals. Automation backlog ranked by effort and impact. 90-day roadmap adopted by operations leadership with projected 60% reduction in approval cycle time.",
  },
];

export default function DiagnosticScenarios() {
  return (
    <div className="container">
      <h2 className={styles.intro}>Representative diagnostic scenarios.</h2>

      <div className={styles.list}>
        {SCENARIOS.map((s, i) => (
          <Card key={i} as="article" hover={false} className={styles.scenario}>
            <div className={styles.scenarioInner}>
              <p className={styles.clientType}>{s.clientType}</p>
              <p className={styles.row}>
                <span className={styles.label}>Situation: </span>
                <span className={styles.value}>{s.situation}</span>
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Diagnostic found: </span>
                <span className={styles.value}>{s.found}</span>
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Delivered: </span>
                <span className={styles.value}>{s.delivered}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className={`small ${styles.note}`}>
        Scenarios are anonymized composites. Figures are illustrative and reflect
        the type of impact diagnostic work typically identifies.
      </p>

      {/* Text-link CTA → form, generic (no data-request-type) per sitemap.md. */}
      <div className={styles.cta}>
        <a href="#diagnostic-request-form" className={styles.textLink}>
          Request a Diagnostic for Your Team
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
