import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

// Diagnostic request handler. Server-side validation is mandatory
// (docs/optimization.md → Validation). Sends an internal notification + a
// PII-free auto-reply via Resend. In preview, or when RESEND_API_KEY is unset,
// the request is accepted and validated but no email is sent (no real inbox
// exists before the production domain is verified).

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHALLENGE_MAX = 500;

// Working-brand placeholders — override via env once the production domain and
// Resend sending domain are verified. FROM must be on a Resend-verified domain.
const RECIPIENT = process.env.DIAGNOSTIC_RECIPIENT_EMAIL || "general@opsfieldsystems.com";
const FROM = process.env.DIAGNOSTIC_FROM_EMAIL || "Opsfield Systems <onboarding@resend.dev>";

// Auto-reply body — verbatim from docs/optimization.md → "Auto-reply email".
// Never echoes the challenge text or any other submitted field value.
const AUTO_REPLY = `Thank you for your diagnostic request.
A senior advisor will review your submission
and respond within 2 business days.

If you have additional context to share,
you can reply to this email.

— Opsfield Systems`;

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

interface SubmitBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  challenge?: unknown;
  requestType?: unknown;
  companyWebsite?: unknown;
  role?: unknown;
  companySize?: unknown;
  timeline?: unknown;
  website?: unknown; // honeypot
  context?: Record<string, unknown>;
}

function notificationText(b: SubmitBody): string {
  const ctx = (b.context ?? {}) as Record<string, unknown>;
  const line = (label: string, v: unknown) =>
    str(v) ? `${label}: ${str(v)}` : null;
  return [
    "New diagnostic request",
    "",
    line("Name", b.name),
    line("Work email", b.email),
    line("Company", b.company),
    line("Request type", b.requestType),
    line("Company website", b.companyWebsite),
    line("Role", b.role),
    line("Company size", b.companySize),
    line("Timeline", b.timeline),
    "",
    "Main challenge:",
    str(b.challenge),
    "",
    "— context —",
    line("Page", ctx.page_url),
    line("Section", ctx.page_section),
    line("CTA", ctx.cta_text),
    line("Referrer", ctx.referrer),
    line("utm_source", ctx.utm_source),
    line("utm_medium", ctx.utm_medium),
    line("utm_campaign", ctx.utm_campaign),
    line("utm_content", ctx.utm_content),
    line("utm_term", ctx.utm_term),
    line("Timestamp", ctx.timestamp),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export async function POST(request: Request) {
  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot — a filled hidden field means a bot. Accept silently, send nothing.
  if (str(body.website) !== "") {
    return json({ ok: true, delivered: false });
  }

  // Server-side validation (mandatory) — mirrors the client rules.
  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const challenge = str(body.challenge);
  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!email || !EMAIL_RE.test(email)) errors.email = "invalid";
  if (!company) errors.company = "required";
  if (!challenge) errors.challenge = "required";
  else if (challenge.length > CHALLENGE_MAX) errors.challenge = "too_long";
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  // Preview has no real inbox — accept + validate, send nothing.
  if (siteConfig.isPreview) {
    return json({ ok: true, delivered: false });
  }

  // Production must never claim success without actually delivering. A missing
  // key is a misconfiguration — surface it as an error so the client shows the
  // email fallback instead of a false "received" screen (silent lead loss).
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ ok: false, error: "not_configured" }, 500);
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `New diagnostic request — ${company}`,
      text: notificationText(body),
    });

    // Auto-reply is best-effort: a delivery failure here must not fail the
    // submission (the lead is already captured by the notification above).
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "Diagnostic request received — Opsfield Systems",
        text: AUTO_REPLY,
      });
    } catch {
      /* auto-reply failure is non-fatal */
    }

    return json({ ok: true, delivered: true });
  } catch {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}
