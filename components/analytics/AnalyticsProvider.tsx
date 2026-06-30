"use client";

import { useEffect } from "react";
import { isAnalyticsReady, loadGA4, unloadGA4 } from "@/lib/analytics";
import { ANALYTICS_ENABLED, CONSENT_CHANGE_EVENT } from "@/lib/consent";

// Side-effect-only component: loads GA4 when consent is granted and unloads it
// when revoked. Renders nothing. While ANALYTICS_ENABLED is false it does
// nothing at all (no listeners, no script).
export default function AnalyticsProvider() {
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    if (isAnalyticsReady()) loadGA4();

    const onConsentChange = () => {
      if (isAnalyticsReady()) loadGA4();
      else unloadGA4();
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  return null;
}
