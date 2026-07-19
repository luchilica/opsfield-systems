"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useLocale } from "next-intl";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/i18n/useT";
import styles from "./DiagnosticForm.module.css";

// Copy from docs/texts.md → "Diagnostic Request Form".
// Optional field set + options from docs/optimization.md → "Forms and Conversion".
// (The optional set is the documented one: Company Website, Role, Company Size,
//  Timeline, Request Type — no undocumented fields are collected.)

const REQUEST_TYPE_OPTIONS = [
  "Business & IT Diagnostic",
  "AI & Process Automation Review",
  "Business Process Audit",
  "CRM / RevOps Audit",
  "IT Stack Assessment",
  "AI Readiness Assessment",
  "90-Day Roadmap",
  "O-1 Readiness Support",
  "Not sure yet",
];

const COMPANY_SIZE_OPTIONS = ["1–25", "26–50", "51–100", "101–250", "251–500", "500+"];

const TIMELINE_OPTIONS = ["ASAP", "This month", "1–3 months", "3–6 months", "Researching"];

// Fallback contact shown if the form request fails. Real monitored inbox until
// a domain + hello@ address is set up.
const FALLBACK_EMAIL = "opsfieldsystems@gmail.com";

const CHALLENGE_MAX = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = {
  name: "",
  email: "",
  company: "",
  challenge: "",
  requestType: "",
  companyWebsite: "",
  role: "",
  companySize: "",
  timeline: "",
  website: "", // honeypot
};

type Values = typeof INITIAL;
type FieldErrors = Partial<Record<"name" | "email" | "company" | "challenge", string>>;
type Status = "idle" | "loading" | "success" | "error";

export default function DiagnosticForm() {
  const t = useT();
  const locale = useLocale();
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [showOptional, setShowOptional] = useState(false);
  const [slow, setSlow] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const challengeRef = useRef<HTMLTextAreaElement>(null);
  const startedRef = useRef(false); // fire form_start only once per session
  const lastCtaRef = useRef(""); // text of the last CTA that opened/prefilled the form

  const set = (key: keyof Values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  // CTA routing: any click on a [data-request-type] element prefills the (single)
  // Request Type select and opens the optional block. One field, stays editable.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest("[data-request-type]");
      if (!el) return;
      const value = el.getAttribute("data-request-type") || "";
      if (!REQUEST_TYPE_OPTIONS.includes(value)) return;
      lastCtaRef.current = (el.textContent || "").trim().replace(/\s+/g, " ");
      setValues((v) => ({ ...v, requestType: value }));
      setShowOptional(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const validate = useCallback(
    (v: Values): FieldErrors => {
      const e: FieldErrors = {};
      if (!v.name.trim()) e.name = t("Please enter your name.");
      if (!v.email.trim()) e.email = t("Please enter your work email.");
      else if (!EMAIL_RE.test(v.email.trim()))
        e.email = t("Please enter a valid email address.");
      if (!v.company.trim()) e.company = t("Please enter your company.");
      if (!v.challenge.trim())
        e.challenge = t("Please describe your main operational challenge.");
      return e;
    },
    [t]
  );

  const focusFirstError = (e: FieldErrors) => {
    if (e.name) nameRef.current?.focus();
    else if (e.email) emailRef.current?.focus();
    else if (e.company) companyRef.current?.focus();
    else if (e.challenge) challengeRef.current?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return; // block duplicate submission

    trackEvent("form_submit_attempt");

    // Honeypot: silently accept (show success) without sending anything.
    // No success event — this path is a bot trap.
    if (values.website.trim() !== "") {
      setStatus("success");
      return;
    }

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirstError(found);
      trackEvent("form_validation_error", {
        field_name: Object.keys(found)[0] ?? "unknown",
      });
      return;
    }
    setErrors({});

    setStatus("loading");
    const slowTimer = setTimeout(() => setSlow(true), 3000);
    try {
      const params = new URLSearchParams(window.location.search);
      const context = {
        locale,
        page_url: window.location.href,
        page_section: "business-it-diagnostic",
        cta_text: lastCtaRef.current,
        referrer: document.referrer,
        utm_source: params.get("utm_source") ?? "",
        utm_medium: params.get("utm_medium") ?? "",
        utm_campaign: params.get("utm_campaign") ?? "",
        utm_content: params.get("utm_content") ?? "",
        utm_term: params.get("utm_term") ?? "",
        timestamp: new Date().toISOString(),
      };
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          challenge: values.challenge,
          requestType: values.requestType,
          companyWebsite: values.companyWebsite,
          role: values.role,
          companySize: values.companySize,
          timeline: values.timeline,
          website: values.website, // honeypot — server double-checks
          context,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("submit_failed");
      setStatus("success");
      trackEvent("form_submit_success", {
        request_type: values.requestType || "not_specified",
      });
    } catch {
      setStatus("error");
      trackEvent("form_submit_error", { error_type: "network_error" });
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <CheckCircle2
          className={styles.successIcon}
          size={32}
          aria-hidden="true"
        />
        <h4 className={styles.successTitle}>{t("Request received.")}</h4>
        <p>
          {t(
            "Thank you. A senior advisor will review your submission, confirm fit, and respond with the safest next step."
          )}
        </p>
        <a href="#how-the-diagnostic-works" className={styles.textLink}>
          {t("See How the Diagnostic Works")}
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    );
  }

  const loading = status === "loading";
  const remaining = CHALLENGE_MAX - values.challenge.length;

  return (
    <>
      <form
        className={styles.form}
        onSubmit={onSubmit}
        onFocus={() => {
          if (!startedRef.current) {
            startedRef.current = true;
            trackEvent("form_start", { section: "business-it-diagnostic" });
          }
        }}
        noValidate
      >
        <div className={`${styles.fields} ${loading ? styles.fieldsLoading : ""}`}>
          {/* Honeypot — visually removed, not display:none. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="df-website">Leave this field blank</label>
            <input
              id="df-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </div>

          {/* 1 — Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="df-name">
              {t("Name")} <span className={styles.req}>{t("(required)")}</span>
            </label>
            <input
              ref={nameRef}
              id="df-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "df-name-error" : undefined}
            />
            {errors.name && (
              <p id="df-name-error" className={`small ${styles.error}`}>
                {errors.name}
              </p>
            )}
          </div>

          {/* 2 — Work Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="df-email">
              {t("Work Email")}{" "}
              <span className={styles.req}>{t("(required)")}</span>
            </label>
            <input
              ref={emailRef}
              id="df-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "df-email-error" : undefined}
            />
            {errors.email && (
              <p id="df-email-error" className={`small ${styles.error}`}>
                {errors.email}
              </p>
            )}
          </div>

          {/* 3 — Company */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="df-company">
              {t("Company")}{" "}
              <span className={styles.req}>{t("(required)")}</span>
            </label>
            <input
              ref={companyRef}
              id="df-company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              className={`${styles.input} ${errors.company ? styles.inputError : ""}`}
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={errors.company ? "df-company-error" : undefined}
            />
            {errors.company && (
              <p id="df-company-error" className={`small ${styles.error}`}>
                {errors.company}
              </p>
            )}
          </div>

          {/* 4 — Main challenge */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="df-challenge">
              {t("What's your biggest operational challenge right now?")}{" "}
              <span className={styles.req}>{t("(required)")}</span>
            </label>
            <textarea
              ref={challengeRef}
              id="df-challenge"
              name="challenge"
              required
              maxLength={CHALLENGE_MAX}
              className={`${styles.textarea} ${
                errors.challenge ? styles.inputError : ""
              }`}
              value={values.challenge}
              onChange={(e) => set("challenge", e.target.value)}
              aria-invalid={errors.challenge ? true : undefined}
              aria-describedby={
                errors.challenge ? "df-challenge-error" : "df-challenge-counter"
              }
            />
            <span id="df-challenge-counter" className={`xsmall ${styles.counter}`}>
              {remaining} {t("characters remaining")}
            </span>
            {errors.challenge && (
              <p id="df-challenge-error" className={`small ${styles.error}`}>
                {errors.challenge}
              </p>
            )}
          </div>

          {/* Progressive disclosure */}
          <button
            type="button"
            className={styles.disclosure}
            aria-expanded={showOptional}
            aria-controls="df-optional"
            onClick={() => setShowOptional((s) => !s)}
          >
            {showOptional
              ? t("Hide optional fields")
              : t("Add more context (optional)")}
            {showOptional ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>

          {showOptional && (
            <div id="df-optional" className={styles.optional}>
              {/* Request Type — single select, may be prefilled by CTA routing */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="df-request-type">
                  {t("Request Type")}{" "}
                  <span className={styles.req}>{t("(optional)")}</span>
                </label>
                <select
                  id="df-request-type"
                  name="request_type"
                  className={styles.select}
                  value={values.requestType}
                  onChange={(e) => set("requestType", e.target.value)}
                >
                  <option value="">
                    {t("Select a request type (optional)")}
                  </option>
                  {REQUEST_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(opt)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Website */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="df-website-url">
                  {t("Company Website")}{" "}
                  <span className={styles.req}>{t("(optional)")}</span>
                </label>
                <input
                  id="df-website-url"
                  name="company_website"
                  type="url"
                  autoComplete="url"
                  className={styles.input}
                  value={values.companyWebsite}
                  onChange={(e) => set("companyWebsite", e.target.value)}
                />
              </div>

              {/* Role */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="df-role">
                  {t("Role")}{" "}
                  <span className={styles.req}>{t("(optional)")}</span>
                </label>
                <input
                  id="df-role"
                  name="role"
                  type="text"
                  autoComplete="organization-title"
                  className={styles.input}
                  value={values.role}
                  onChange={(e) => set("role", e.target.value)}
                />
              </div>

              {/* Company Size — no preselected value, no ICP highlighting */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="df-company-size">
                  {t("Company Size")}{" "}
                  <span className={styles.req}>{t("(optional)")}</span>
                </label>
                <select
                  id="df-company-size"
                  name="company_size"
                  className={styles.select}
                  value={values.companySize}
                  onChange={(e) => set("companySize", e.target.value)}
                >
                  <option value="">{t("Select company size (optional)")}</option>
                  {COMPANY_SIZE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="df-timeline">
                  {t("Timeline")}{" "}
                  <span className={styles.req}>{t("(optional)")}</span>
                </label>
                <select
                  id="df-timeline"
                  name="timeline"
                  className={styles.select}
                  value={values.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                >
                  <option value="">{t("Select a timeline (optional)")}</option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(opt)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Privacy notice — directly before submit */}
        <p className={`small ${styles.privacy}`}>
          {t("By submitting this form, you acknowledge our")}{" "}
          <a href="/privacy-policy">Privacy Policy</a>
          {t(
            ". We use your information to evaluate fit and contact you about your diagnostic request."
          )}
        </p>

        {status === "error" && (
          <div className={styles.formError} role="alert">
            <p className={styles.error}>
              {t(
                "Something went wrong and your request was not submitted. Please try again."
              )}
            </p>
            <p className="small">
              {t("You can also email us at")}{" "}
              <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
            </p>
          </div>
        )}

        {/* Reassurance microcopy — kept next to the submit control per
            docs/design.md → Form Panel ("near submit"). */}
        <p className={styles.microcopy}>
          {t(
            "Four required fields. Additional context is optional. No full system access is required for the first fit review."
          )}
        </p>

        <div className={styles.submitRow}>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? t("Submitting...") : t("Submit Diagnostic Request")}
          </Button>
          {loading && slow && (
            <p className={`small ${styles.processing}`} aria-live="polite">
              {t("Still processing...")}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
