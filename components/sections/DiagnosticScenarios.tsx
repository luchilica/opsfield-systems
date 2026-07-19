"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Info, Search, CheckCircle2 } from "lucide-react";
import styles from "./DiagnosticScenarios.module.css";

// Copy from docs/texts.md → "Diagnostic Scenarios". Anonymized + illustrative.
// Presented as an interactive switcher: a scenario list on the left, a detailed
// Situation → Diagnostic found → Delivered panel on the right. Every panel is
// rendered (inactive ones visually hidden, never display:none) so all scenario
// copy stays in the served HTML for crawlers.
// Do not present as verified case studies, metrics, logos or testimonials.
type Scenario = {
  client: string;
  environment: string[];
  situation: string;
  found: string;
  delivered: ReactNode;
};

const SCENARIOS: Scenario[] = [
  {
    client: "B2B services firm (≈80 employees)",
    environment: ["HubSpot"],
    situation:
      "Inbound leads were falling between marketing and sales — no defined handoff owner, no SLA, and 3 duplicate CRM fields creating confusion.",
    found:
      "4 undocumented handoff points across 2 teams with no shared visibility.",
    delivered: (
      <>
        Handoff process reduced from 5 steps to 2. Single ownership assigned per
        lead stage. Estimated revenue at risk from dropped handoffs:{" "}
        <span className={styles.metric}>$180K–$240K</span> annually. 30-day
        cleanup priority list adopted by both teams.
      </>
    ),
  },
  {
    client: "Scaling SaaS team (≈120 employees)",
    environment: ["Salesforce", "Looker"],
    situation:
      "Leadership did not trust dashboard numbers — 3 departments used different definitions for the same metrics.",
    found:
      "7 inconsistent metric definitions and 2 disconnected data sources feeding the same dashboard.",
    delivered: (
      <>
        Unified reporting definitions document covering 7 previously inconsistent
        metrics. Data-source consolidation plan projected to remove{" "}
        <span className={styles.metric}>40+ hours/month</span> of manual
        reconciliation. BI roadmap prioritized by stakeholder impact with 90-day
        execution timeline.
      </>
    ),
  },
  {
    client: "Multi-location operator (≈200 employees)",
    environment: ["Monday", "Zapier", "spreadsheets"],
    situation:
      "4 locations running different approval workflows with 6 overlapping tools and no shared process documentation.",
    found:
      "11 manual approval steps that could be reduced to 4 with workflow consolidation.",
    delivered: (
      <>
        Bottleneck map identified an estimated{" "}
        <span className={styles.metric}>$320K</span> in annual labor cost tied to
        manual approvals. Automation backlog ranked by effort and impact. 90-day
        roadmap adopted by operations leadership with projected 60% reduction in
        approval cycle time.
      </>
    ),
  },
];

const ROWS = [
  { key: "situation", label: "Situation", Icon: Info },
  { key: "found", label: "Diagnostic found", Icon: Search },
  { key: "delivered", label: "Delivered", Icon: CheckCircle2 },
] as const;

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function DiagnosticScenarios() {
  const [active, setActive] = useState(0);

  return (
    <div className="container">
      <p className={styles.badge}>DIAGNOSTIC SCENARIOS</p>
      <h2 className={styles.intro}>Representative diagnostic scenarios.</h2>

      <div className={styles.switcher}>
        {/* Selector list */}
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Diagnostic scenarios"
        >
          {SCENARIOS.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                id={`scenario-tab-${i}`}
                aria-selected={selected}
                aria-controls={`scenario-panel-${i}`}
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tabNum}>Scenario · {pad(i)}</span>
                <span className={styles.tabClient}>{s.client}</span>
                <span className={styles.tabEnvs}>
                  {s.environment.map((e) => (
                    <span key={e} className={styles.tabEnv}>
                      {e}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panels — all rendered; inactive ones visually hidden (in DOM for SEO). */}
        <div className={styles.panels}>
          {SCENARIOS.map((s, i) => {
            const selected = i === active;
            return (
              <article
                key={i}
                role="tabpanel"
                id={`scenario-panel-${i}`}
                aria-labelledby={`scenario-tab-${i}`}
                aria-hidden={!selected}
                className={`${styles.panel} ${selected ? styles.panelActive : ""}`}
              >
                <span className={styles.ghostNum} aria-hidden="true">
                  {pad(i)}
                </span>

                <div className={styles.panelHead}>
                  <p className={styles.panelNum}>Scenario · {pad(i)}</p>
                  <h3 className={styles.panelClient}>{s.client}</h3>
                  <div className={styles.envs}>
                    {s.environment.map((e) => (
                      <span key={e} className={styles.env}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <ol className={styles.timeline}>
                  {ROWS.map((r) => (
                    <li key={r.key} className={`${styles.step} ${styles[r.key]}`}>
                      <span className={styles.node}>
                        <r.Icon size={16} aria-hidden="true" />
                      </span>
                      <div className={styles.stepBody}>
                        <span className={styles.stepLabel}>{r.label}</span>
                        <p className={styles.stepText}>{s[r.key]}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
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
