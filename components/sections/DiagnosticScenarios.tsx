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
      "Handoff process reduced from 5 steps to 2. Single ownership assigned per lead stage. 30-day cleanup priority list adopted by both teams.",
  },
  {
    clientType: "Scaling SaaS team (≈120 employees, Salesforce + Looker)",
    situation:
      "Leadership did not trust dashboard numbers — 3 departments used different definitions for the same metrics.",
    found:
      "7 inconsistent metric definitions and 2 disconnected data sources feeding the same dashboard.",
    delivered:
      "Unified reporting definitions document, data-source consolidation plan, and a BI roadmap prioritized by stakeholder impact.",
  },
  {
    clientType: "Multi-location operator (≈200 employees, Monday + Zapier + spreadsheets)",
    situation:
      "4 locations running different approval workflows with 6 overlapping tools and no shared process documentation.",
    found:
      "11 manual approval steps that could be reduced to 4 with workflow consolidation.",
    delivered:
      "Bottleneck map, automation backlog ranked by effort and impact, and a 90-day roadmap adopted by operations leadership.",
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
        Scenarios are anonymized. Details reflect the type of diagnostic work and
        deliverables Opsfield provides.
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
