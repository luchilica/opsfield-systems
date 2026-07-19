"use client";

import { useLocale } from "next-intl";
import { dictionary } from "./dictionary";
import type { Locale } from "./locales";

// Client-side translator. Usage in a Client Component ("use client"):
//   const t = useT();
//   <span>{t("English source string")}</span>
export function useT() {
  const locale = useLocale() as Locale;
  const map = dictionary[locale];
  return (en: string) => map?.[en] ?? en;
}
