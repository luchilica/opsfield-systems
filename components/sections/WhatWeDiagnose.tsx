import {
  GitBranch,
  Layers,
  Workflow,
  FileText,
  Shield,
  BarChart3,
  Compass,
  ArrowRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { getT } from "@/i18n/t";
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
    tone: "paper",
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

export default async function WhatWeDiagnose() {
  const t = await getT();
  return (
    <div className="container">
      <p className={styles.badge}>{t("WHAT WE DIAGNOSE")}</p>
      <h2 className={styles.intro}>
        {t(
          "We diagnose the gaps between how your business works and how your systems support it.",
        )}
      </h2>

      <div className={styles.top}>
        <div className={styles.areas}>
          {AREAS.map(({ title, Icon, tone, description }) => (
            <Card key={title} tone={tone} soft>
              <div className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3 className={styles.cardTitle}>{t(title)}</h3>
                  <p className={styles.cardDesc}>{t(description)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.output}>
          <p className={styles.outputLabel}>{t("What you receive")}</p>
          <ul className={styles.outputGrid}>
            {OUTPUTS.map(({ label, Icon }) => (
              <li key={label} className={styles.outputCard}>
                <span className={styles.outputIcon}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className={styles.outputName}>{t(label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.o1}>
        <span className={styles.o1Tile} aria-hidden="true">
          O-1
        </span>
        <div className={styles.o1Body}>
          <div className={styles.o1Head}>
            <h3 className={styles.o1Title}>{t("O-1 Readiness Support")}</h3>
            <span className={styles.o1Badge}>{t("Secondary service")}</span>
          </div>
          <p className={styles.o1Desc}>
            {t(
              "For founders and IT professionals pursuing the O-1 visa, we structure the evidence of extraordinary ability — working alongside your immigration counsel, not replacing it.",
            )}
          </p>
        </div>
      </div>

      <div className={styles.cta}>
        <a href="#how-the-diagnostic-works" className={styles.textLink}>
          {t("See How the Diagnostic Works")}
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
