"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/locales";
import styles from "./LanguageSwitcher.module.css";

// Renders only published equivalents (LOCALE_META.enabled). Hidden until a
// second locale is published, so the English-only header is unchanged for now.
// Plain <a> links via next-intl's Link — works without JS, keyboard + SR
// friendly; no flags, no auto-redirect (docs/multilingual.md).
export default function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const shown = LOCALES.filter((l) => LOCALE_META[l].enabled);

  if (shown.length < 2) return null;

  return (
    <div className={styles.wrap} role="group" aria-label="Language">
      {shown.map((l) => {
        const isActive = l === (active as Locale);
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={LOCALE_META[l].htmlLang}
            aria-current={isActive ? "page" : undefined}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            {LOCALE_META[l].label}
          </Link>
        );
      })}
    </div>
  );
}
