// Cookie-consent preference storage + activation flag.
// Infrastructure for future GA4 activation (development-plan.md → Этап 8 consent
// foundation, Этап 12 analytics activation). NO analytics is loaded from here.

export type ConsentPreference = "accepted" | "declined" | null;

export const CONSENT_STORAGE_KEY = "opsfield_analytics_consent";

// Same-tab change notification. The `storage` event only fires in *other* tabs,
// so we broadcast our own event whenever the stored preference changes, letting
// the banner (an external-store subscriber) re-read it.
export const CONSENT_CHANGE_EVENT = "opsfield:consent-change";

// Master switch. While false, no consent UI renders and no analytics loads.
// Этап 12 flips this to true (or replaces it with an env-var check) at GA4
// activation. Until then the banner and reopener render nothing.
export const ANALYTICS_ENABLED = false;

export function getConsentPreference(): ConsentPreference {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    // localStorage unavailable (SSR, private mode, blocked) — treat as no choice.
    return null;
  }
}

function notifyConsentChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function setConsentPreference(pref: "accepted" | "declined"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, pref);
  } catch {
    // Fail silently — consent simply will not persist this session.
  }
  notifyConsentChange();
}

export function clearConsentPreference(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Fail silently.
  }
  notifyConsentChange();
}

export function hasAnalyticsConsent(): boolean {
  return getConsentPreference() === "accepted";
}

// External-store subscription for useSyncExternalStore: re-read on same-tab
// changes and on cross-tab `storage` events.
export function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
