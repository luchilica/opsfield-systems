import { getLocale } from "next-intl/server";
import { dictionary } from "./dictionary";
import type { Locale } from "./locales";

// Server-side translator. Usage in a Server Component:
//   const t = await getT();
//   <h2>{t("English source string")}</h2>
export async function getT() {
  const locale = (await getLocale()) as Locale;
  const map = dictionary[locale];
  return (en: string) => map?.[en] ?? en;
}
