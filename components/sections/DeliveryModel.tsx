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
import styles from "./DeliveryModel.module.css";

// Copy from docs/texts.md → "Delivery Model". Role-only cards (no names, photos,
// or invented credentials); responsibilities are the exact terms from the Focus
// lines. Initials tile + role subtitle + icon bullets. v2 ink block.
const ROLES = [
  {
    title: "Managing Partner",
    initials: "MP",
    subtitle: "Operating model & diagnostic lead",
    tone: "paper",
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
      <div className={styles.inner}>
        <p className={styles.badge}>DELIVERY MODEL</p>
        <h2 className={styles.intro}>Senior attention without a handoff chain.</h2>
        <p className={`lead ${styles.text}`}>
          Opsfield Systems works with 4–6 active clients at a time so senior
          advisors remain involved from problem framing through scope and
          delivery.
        </p>

        <div className={styles.roles}>
          {ROLES.map(({ title, initials, subtitle, responsibilities }) => (
            <Card key={title} tone="paper" soft hover={false}>
              <div className={styles.role}>
                <div className={styles.roleHead}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials}
                  </span>
                  <div>
                    <h3 className={styles.roleTitle}>{title}</h3>
                    <p className={styles.roleSub}>{subtitle}</p>
                  </div>
                </div>

                <div className={styles.respDivider}>
                  <span className={styles.respLabel}>Focus</span>
                </div>

                <ul className={styles.respList}>
                  {responsibilities.map(({ Icon, text }) => (
                    <li key={text} className={styles.resp}>
                      <span className={styles.respIcon}>
                        <Icon size={15} aria-hidden="true" />
                      </span>
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
