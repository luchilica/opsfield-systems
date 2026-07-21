"use client";

import { CONSENT_UI_ENABLED, clearConsentPreference } from "@/lib/consent";
import { useT } from "@/i18n/useT";
import styles from "./CookieConsentReopener.module.css";

// Footer "Cookie Preferences" control. Clears the stored choice, which notifies
// the consent store and re-opens the banner. Gated on CONSENT_UI_ENABLED.
export default function CookieConsentReopener({
  className,
}: {
  className?: string;
}) {
  const t = useT();
  if (!CONSENT_UI_ENABLED) return null;

  return (
    <button
      type="button"
      onClick={() => clearConsentPreference()}
      className={[styles.button, className].filter(Boolean).join(" ")}
    >
      {t("Cookie Preferences")}
    </button>
  );
}
