import {
  ArrowRight,
  Boxes,
  Workflow,
  Map,
  Compass,
  Database,
  GitBranch,
  Share2,
  Cable,
  Cpu,
  Shield,
} from "lucide-react";
import Card from "@/components/ui/Card";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./DeliveryModel.module.css";

// Copy from docs/texts.md → "Delivery Model". Role-only cards (no names, photos,
// or invented credentials); responsibilities are the exact terms from the Focus
// lines. Initials tile + role subtitle + icon bullets. v2 ink block.
const ROLES = [
  {
    title: "Managing Partner",
    initials: "MP",
    subtitle: "Operating model & diagnostic lead",
    tone: "brand",
    responsibilities: [
      { Icon: Boxes, text: "Operating model design" },
      { Icon: Workflow, text: "Diagnostic methodology" },
      { Icon: Map, text: "Roadmap prioritization" },
      { Icon: Compass, text: "Executive decision support" },
    ],
  },
  {
    title: "Solution Architect",
    initials: "SA",
    subtitle: "CRM / RevOps & data flow",
    tone: "paper",
    responsibilities: [
      { Icon: Database, text: "CRM architecture" },
      { Icon: GitBranch, text: "RevOps pipeline design" },
      { Icon: Share2, text: "Data flow mapping" },
      { Icon: Cable, text: "Integrations" },
      { Icon: Cpu, text: "Automation design" },
      { Icon: Shield, text: "Implementation risk review" },
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
          {ROLES.map(({ title, initials, subtitle, tone, responsibilities }) => (
            <Card key={title} tone={tone} hardShadow hover={false}>
              <div className={styles.role}>
                <div className={styles.roleHead}>
                  <span
                    className={`${styles.avatar} ${
                      tone === "brand" ? styles.avatarOnBrand : styles.avatarOnPaper
                    }`}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <div>
                    <h3
                      className={`${styles.roleTitle} ${
                        tone === "brand" ? styles.onDark : ""
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`${styles.roleSub} ${
                        tone === "brand" ? styles.roleSubOnDark : ""
                      }`}
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>

                <p
                  className={`${styles.engLabel} ${
                    tone === "brand" ? styles.engLabelOnDark : ""
                  }`}
                >
                  Role in the engagement
                </p>

                <ul className={styles.respList}>
                  {responsibilities.map(({ Icon, text }) => (
                    <li
                      key={text}
                      className={`${styles.resp} ${
                        tone === "brand" ? styles.respOnDark : ""
                      }`}
                    >
                      <Icon
                        size={16}
                        className={styles.respIcon}
                        aria-hidden="true"
                      />
                      <span>{text}</span>
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
