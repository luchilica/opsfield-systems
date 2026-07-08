"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Info, Search, CheckCircle2 } from "lucide-react";
import styles from "./DiagnosticScenarios.module.css";

// Copy from docs/texts.md → "Diagnostic Scenarios". Anonymized + illustrative.
// v2 report cards: brand header + Situation / Diagnostic found / Delivered rows.
// Do not present as verified case studies, metrics, logos or testimonials.
// Cards 2–3 collapse the triad rows behind a toggle; content stays in the DOM
// (max-height:0 + overflow:hidden, never display:none) for crawlability.
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
  { key: "situation", label: "Situation", num: "01", Icon: Info },
  { key: "found", label: "Diagnostic found", num: "02", Icon: Search },
  { key: "delivered", label: "Delivered", num: "03", Icon: CheckCircle2 },
] as const;

function ScenarioCard({
  scenario,
  index,
  collapsible,
}: {
  scenario: Scenario;
  index: number;
  collapsible: boolean;
}) {
  const [open, setOpen] = useState(false);
  const collapsed = collapsible && !open;
  const rowsId = `scenario-${index + 1}-rows`;

  return (
    <article className={styles.scenario}>
      <div className={styles.header}>
        <div>
          <p className={styles.scenarioNum}>
            Scenario · {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className={styles.client}>{scenario.client}</h3>
        </div>
        <div className={styles.envs}>
          {scenario.environment.map((e) => (
            <span key={e} className={styles.env}>
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* Triad rows. Collapsed via max-height:0 (still in the DOM for crawlers). */}
      <div
        id={rowsId}
        className={`${styles.rows} ${collapsed ? styles.rowsCollapsed : ""}`}
      >
        {ROWS.map((r) => (
          <div key={r.key} className={`${styles.rowGrid} ${styles[r.key]}`}>
            <div className={styles.rowLabel}>
              <r.Icon
                size={24}
                strokeWidth={1.5}
                className={styles.rowIcon}
                aria-hidden="true"
              />
              <span className={styles.rowNum}>{r.num}</span>
              <span className={styles.rowName}>{r.label}</span>
            </div>
            <p className={styles.rowText}>{scenario[r.key]}</p>
          </div>
        ))}
      </div>

      {collapsible && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={rowsId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Collapse scenario" : "View full scenario →"}
        </button>
      )}
    </article>
  );
}

export default function DiagnosticScenarios() {
  return (
    <div className="container">
      <p className="kicker">DIAGNOSTIC SCENARIOS</p>
      <h2 className={styles.intro}>Representative diagnostic scenarios.</h2>

      <div className={styles.list}>
        {SCENARIOS.map((s, i) => (
          <ScenarioCard key={i} scenario={s} index={i} collapsible={i > 0} />
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
