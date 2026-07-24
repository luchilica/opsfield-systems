import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { getLocale } from "next-intl/server";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { getT } from "@/i18n/t";
import styles from "./LegalPageLayout.module.css";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default async function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const t = await getT();
  const locale = (await getLocale()) as Locale;
  const prefix = LOCALE_META[locale].prefix;

  return (
    <div className={styles.page}>
      <article className={styles.wrapper}>
        <aside className={styles.side}>
          <a href={`${prefix}/`} className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            {t("Back to Home")}
          </a>

          <header className={styles.header}>
            <p className="kicker">{t("Legal")}</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.updated}>{t("Last updated")} · {lastUpdated}</p>
          </header>
        </aside>

        <div className={styles.content}>{children}</div>
      </article>
    </div>
  );
}
