import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./DeliveryModel.module.css";

// Copy from docs/texts.md → "Delivery Model". Role-only cards (no names, photos,
// or invented credentials); responsibilities are the exact terms from the Focus
// lines, listed as bullets. v2 ink block. CTA text link → form (generic).
const ROLES = [
  {
    title: "Managing Partner",
    tone: "brand",
    responsibilities: [
      "Operating model design",
      "Diagnostic methodology",
      "Roadmap prioritization",
      "Executive decision support",
    ],
  },
  {
    title: "Solution Architect",
    tone: "paper",
    responsibilities: [
      "CRM architecture",
      "RevOps pipeline design",
      "Data flow mapping",
      "Integrations",
      "Automation design",
      "Implementation risk review",
    ],
  },
] as const;

const ENVIRONMENTS = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Asana",
  "Monday",
  "Notion",
  "QuickBooks",
  "Zapier",
  "Make",
];

export default function DeliveryModel() {
  return (
    <div className="container">
      <PlusMark size={220} className={styles.plusTop} />
      <PlusMark size={120} className={styles.plusBottom} />

      <div className={styles.inner}>
        <p className="kicker">DELIVERY MODEL</p>
        <h2 className={styles.intro}>Senior attention without a handoff chain.</h2>
        <p className={`lead ${styles.text}`}>
          Opsfield Systems works with 4–6 active clients at a time so senior
          advisors remain involved from problem framing through scope and
          delivery.
        </p>

        <div className={styles.roles}>
          {ROLES.map(({ title, tone, responsibilities }) => (
            <Card key={title} tone={tone} hardShadow hover={false}>
              <div className={styles.role}>
                <h3
                  className={`${styles.roleTitle} ${
                    tone === "brand" ? styles.onDark : ""
                  }`}
                >
                  {title}
                </h3>
                <ul className={styles.respList}>
                  {responsibilities.map((r) => (
                    <li
                      key={r}
                      className={`${styles.resp} ${
                        tone === "brand" ? styles.respOnDark : ""
                      }`}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.envBlock}>
          <p className={styles.envLabel}>Relevant environments</p>
          <ul className={styles.envList}>
            {ENVIRONMENTS.map((e) => (
              <li key={e} className={styles.envItem}>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cta}>
          <a href="#diagnostic-request-form" className={styles.textLink}>
            Work With Senior Advisors
            <ArrowRight size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
