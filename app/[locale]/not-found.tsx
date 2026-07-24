import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { getT } from "@/i18n/t";

export const metadata: Metadata = {
  title: "Page Not Found | Opsfield Systems",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const t = await getT();
  const locale = (await getLocale()) as Locale;
  const prefix = LOCALE_META[locale].prefix;

  return (
    <div className="container section">
      <h1>{t("Page not found")}</h1>
      <p>{t("The page you're looking for doesn't exist or may have moved.")}</p>
      <p>
        <a href={`${prefix}/`}>{t("Back to Home")}</a>{" "}
        {t("or")}{" "}
        <a href={`${prefix}/#diagnostic-request-form`}>{t("request a diagnostic")}</a>.
      </p>
    </div>
  );
}
