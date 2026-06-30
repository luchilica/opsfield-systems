import { GitBranch, Layers, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import styles from "./WhatWeDiagnose.module.css";

// Copy from docs/texts.md → "What We Diagnose". The document defines exactly two
// service areas (Processes; Revenue / data / systems) and one shared Output —
// no per-card outputs or CTAs are invented.
const AREAS = [
  {
    title: "Processes",
    Icon: GitBranch,
    description:
      "Handoffs, approvals, ownership gaps, duplicated work, undocumented workflows.",
  },
  {
    title: "Revenue / data / systems",
    Icon: Layers,
    description:
      "CRM, RevOps, dashboards, reporting rules, integrations, automation, AI readiness, IT risk.",
  },
];

export default function WhatWeDiagnose() {
  return (
    <div className="container">
      <h2 className={styles.intro}>
        We diagnose the gaps between how your business works and how your systems
        support it.
      </h2>

      <div className={styles.grid}>
        {AREAS.map(({ title, Icon, description }) => (
          <Card key={title}>
            <div className={styles.card}>
              <Icon size={24} className={styles.cardIcon} aria-hidden="true" />
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Shared output / deliverable for the whole diagnostic. */}
      <p className={styles.output}>
        <span className={styles.outputLabel}>Output:</span> process map, system
        map, bottleneck list, risk notes, priority matrix, and roadmap
        recommendation.
      </p>

      {/* Text-link CTA → How the Diagnostic Works (docs/sitemap.md Internal Linking Map). */}
      <div className={styles.cta}>
        <a href="#how-the-diagnostic-works" className={styles.textLink}>
          See How the Diagnostic Works
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
