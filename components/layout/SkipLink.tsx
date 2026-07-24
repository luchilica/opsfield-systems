import { getT } from "@/i18n/t";
import styles from "./SkipLink.module.css";

export default async function SkipLink() {
  const t = await getT();
  return (
    <a href="#main-content" className={styles.skipLink}>
      {t("Skip to main content")}
    </a>
  );
}
