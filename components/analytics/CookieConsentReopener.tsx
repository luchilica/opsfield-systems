"use client";

import { ANALYTICS_ENABLED, clearConsentPreference } from "@/lib/consent";
import styles from "./CookieConsentReopener.module.css";

// Footer "Cookie Preferences" control. Clears the stored choice, which notifies
// the consent store and re-opens the banner. Renders nothing while
// ANALYTICS_ENABLED is false.
export default function CookieConsentReopener({
  className,
}: {
  className?: string;
}) {
  if (!ANALYTICS_ENABLED) return null;

  return (
    <button
      type="button"
      onClick={() => clearConsentPreference()}
      className={[styles.button, className].filter(Boolean).join(" ")}
    >
      Cookie Preferences
    </button>
  );
}
