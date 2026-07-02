import { Compass, Workflow, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import styles from "./DeliveryModel.module.css";

// Copy from docs/texts.md → "Delivery Model". Role-only cards per design.md
// "Delivery Role Card" — no names, no photos, no invented credentials. A
// semantic role icon is used since no approved portrait exists. CTA → form,
// generic (no data-request-type).
const ROLES = [
  {
    title: "Managing Partner",
    Icon: Compass,
    responsibilities:
      "Operating model design, diagnostic methodology, roadmap prioritization, and executive decision support.",
  },
  {
    title: "Solution Architect",
    Icon: Workflow,
    responsibilities:
      "CRM architecture, RevOps pipeline design, data flow mapping, integrations, automation design, and implementation risk review.",
  },
];

export default function DeliveryModel() {
  return (
    <div className="container">
      <h2 className={styles.intro}>Senior attention without a handoff chain.</h2>
      <p className={`lead ${styles.text}`}>
        Opsfield Systems works with 4–6 active clients at a time so senior
        advisors remain involved from problem framing through scope and delivery.
      </p>

      <div className={styles.roles}>
        {ROLES.map(({ title, Icon, responsibilities }) => (
          <Card key={title}>
            <div className={styles.role}>
              <span className={styles.roleIcon}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className={styles.roleTitle}>{title}</h3>
              <p className={styles.roleText}>{responsibilities}</p>
            </div>
          </Card>
        ))}
      </div>

      <p className={styles.environments}>
        <span className={styles.environmentsLabel}>Relevant environments: </span>
        HubSpot, Salesforce, Pipedrive, Asana, Monday, Notion, QuickBooks,
        Zapier, and Make.
      </p>

      <div className={styles.cta}>
        <a href="#diagnostic-request-form" className={styles.textLink}>
          Work With Senior Advisors
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
