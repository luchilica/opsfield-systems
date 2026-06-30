"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  ANALYTICS_ENABLED,
  getConsentPreference,
  setConsentPreference,
  subscribeConsent,
} from "@/lib/consent";
import styles from "./CookieConsent.module.css";

// Cookie consent banner. Infrastructure only: while ANALYTICS_ENABLED is false
// it renders nothing, reads no storage, and loads no analytics. When enabled in
// Этап 12 it shows once until a choice is stored. GA4 loading is NOT done here.
export default function CookieConsent() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Visibility is derived from an external store (localStorage + change events),
  // not local state — so there is no setState-in-effect and no hydration
  // mismatch. The server snapshot keeps the banner hidden during SSR/hydration;
  // React re-reads the client snapshot immediately after.
  const preference = useSyncExternalStore(
    subscribeConsent,
    () => (ANALYTICS_ENABLED ? getConsentPreference() : "declined"),
    () => "declined" as const,
  );

  const show = ANALYTICS_ENABLED && preference === null;

  // Move focus to the first control when the banner becomes visible.
  useEffect(() => {
    if (show) bannerRef.current?.querySelector("button")?.focus();
  }, [show]);

  if (!show) return null;

  const choose = (pref: "accepted" | "declined") => {
    // Writes the choice and notifies the store, which hides the banner.
    // GA4 loading is handled in Этап 12 — nothing analytics-related happens here.
    setConsentPreference(pref);
  };

  return (
    <div
      ref={bannerRef}
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      aria-describedby="cookie-consent-desc"
    >
      <div className={`container ${styles.inner}`}>
        <p id="cookie-consent-desc" className={`small ${styles.text}`}>
          We use optional analytics cookies to understand how the site is used.{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>
        </p>
        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => choose("declined")}
          >
            Decline
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => choose("accepted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
