import {
  GitBranch,
  Layers,
  FileBadge,
  Workflow,
  FileText,
  Shield,
  BarChart3,
  Compass,
  ArrowRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import styles from "./WhatWeDiagnose.module.css";

// Copy from docs/texts.md → "What We Diagnose": two diagnostic areas + the shared
// Output list (as a "You receive" bar) + O-1 Readiness Support as a secondary
// service panel. v2 block edition. No per-card outputs/CTAs are invented.
const AREAS = [
  {
    title: "Processes",
    Icon: GitBranch,
    tone: "paper",
    description:
      "Handoffs, approvals, ownership gaps, duplicated work, undocumented workflows.",
  },
  {
    title: "Revenue, data & systems",
    Icon: Layers,
    tone: "blueTint",
    description:
      "CRM, RevOps, dashboards, reporting rules, integrations, automation, AI readiness, IT risk.",
  },
] as const;

const OUTPUTS = [
  { label: "Process map", Icon: Workflow },
  { label: "System map", Icon: Layers },
  { label: "Bottleneck list", Icon: FileText },
  { label: "Risk notes", Icon: Shield },
  { label: "Priority matrix", Icon: BarChart3 },
  { label: "Roadmap recommendation", Icon: Compass },
];

export default function WhatWeDiagnose() {
  return (
    <div className="container">
      <p className="kicker">WHAT WE DIAGNOSE</p>
      <h2 className={styles.intro}>
        We diagnose the gaps between how your business works and how your systems
        support it.
      </h2>

      <div className={styles.grid}>
        {AREAS.map(({ title, Icon, tone, description }) => (
          <Card key={title} tone={tone} hardShadow>
            <div className={styles.card}>
              <span className={styles.cardIcon}>
                <Icon size={30} aria-hidden="true" />
              </span>
              <div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.output}>
        <span className={styles.outputLabel}>You receive</span>
        <ul className={styles.outputList}>
          {OUTPUTS.map(({ label, Icon }) => (
            <li key={label} className={styles.outputBadge}>
              <Icon size={13} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.o1}>
        <div className={styles.o1Tile} aria-hidden="true">
          O-1
        </div>
        <div className={styles.o1Body}>
          <div className={styles.o1Head}>
            <span className={styles.o1Icon}>
              <FileBadge size={22} aria-hidden="true" />
            </span>
            <h3 className={styles.o1Title}>O-1 Readiness Support</h3>
            <span className={styles.o1Badge}>Secondary service</span>
          </div>
          <p className={styles.o1Desc}>
            For IT professionals and founders exploring the O-1 visa path, we help
            structure evidence of extraordinary ability: publication strategy,
            portfolio architecture, recommendation coordination, and expert
            profile positioning. We work alongside qualified immigration counsel —
            we do not provide legal advice or file petitions.
          </p>
        </div>
      </div>

      <div className={styles.cta}>
        <a href="#how-the-diagnostic-works" className={styles.textLink}>
          See How the Diagnostic Works
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
