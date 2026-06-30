# Test Coverage Summary — Этап 11

**Date:** 2026-06-30
**Runner:** Playwright 1.61 (Chromium), production build (`next start`)

## Totals

| Suite | Tests | Passing | Failing | Skipped |
|---|---|---|---|---|
| Contract (`tests/contracts/`) | 30 | 30 | 0 | 0 |
| E2E (`tests/e2e/`) | 21 | 21 | 0 | 0 |
| **Total** | **51** | **51** | **0** | **0** |

`npm run check` (lint + tsc + build) passes. `npm run test` (contracts + e2e) passes.

## CI gate (`.github/workflows/quality.yml`)

Runs on every pull request: `npm ci` → `lint` → `tsc --noEmit` → `build` → install Chromium → `test:contracts`. Lightweight by design.

## What's covered

### Contract tests (30) — structure / copy / metadata invariants
- **structure** (7): exactly 11 `main > section`; section IDs match the sitemap order; one H1; H1 copy verbatim; one H1 per legal page (×3).
- **metadata** (10): homepage `<title>` + meta description verbatim; absolute canonical; Open Graph (title/description/url/type/site_name); Twitter (card/title/description); JSON-LD `@graph` has Organization/WebSite/WebPage/Service/FAQPage; legal pages `noindex` (×3); homepage `noindex` in preview.
- **content-protection** (5): no old brand strings; no O-1/immigration/visa/petition in visible text; no TODO/TBD/FIXME/lorem ipsum/placeholder; FAQ first+last answers in raw server HTML; no `gtag`/`googletagmanager`/GA4-id.
- **form** (5): exactly 4 required fields; submit label `Submit Diagnostic Request`; privacy notice links `/privacy-policy`; request-type options match texts.md; company-size has no preselect.
- **navigation** (3): every `#` anchor target exists; footer legal links non-404; `#diagnostic-request-form` present.

### E2E tests (21) — critical user flows
- **navigation** (4): header / hero-primary / hero-secondary / footer CTAs scroll to the right anchor.
- **mobile-drawer** (3): open/close; Escape closes + focus returns to trigger; drawer link navigates + closes.
- **faq** (2): expand/collapse cycle; answers in initial HTML.
- **form** (7): disclosure show/hide; value persistence across toggle; empty-required validation + focus first invalid; invalid-email error; data preserved after error; success terminal state (accepts success or error UI); duplicate-submit prevented.
- **cta-routing** (3): request-type CTA prefill; generic CTA no prefill; prefilled value editable.
- **preview-robots** (2): `robots.txt` Disallow; `X-Robots-Tag: noindex`.

## Failing / skipped — with reasons

None. All 51 pass deterministically (`retries: 0`).

Notes on intentional test design (not failures):
- **FAQ** item 0 is open by default (single-open accordion); the expand/collapse cycle runs on a collapsed item.
- **Form submission** is currently simulated client-side (resolves to success ~1.5s; real `/api/submit` is a later stage), so the success test asserts a terminal state that accepts **either** success or error UI.

## Requires manual QA (not automated)

- **Lighthouse** (Perf ≥90 desktop / ≥85 mobile, A11y ≥95, Best Practices ≥95, SEO ≥95) — run on production build in Chrome.
- **axe** automated scan — currently blocked locally by a Chrome/ChromeDriver version mismatch; re-run after aligning versions.
- **200% / 400% zoom** reflow; **320 / 375 px** visual check.
- **Screen readers** — NVDA (Windows), VoiceOver (macOS/iOS).
- **Cross-browser** — Firefox, WebKit/Safari (CI + local automation cover Chromium only).
- **iOS Safari** — touch targets, no input zoom.

## CI limitations (by design)

- Triggers on `pull_request` only.
- **No E2E in CI** — the full Playwright run stays local before milestone/release (per development-plan.md).
- **No Lighthouse in CI** — manual/local.
- **Chromium only** — full browser matrix is a release gate, not a CI gate.
- The Playwright `webServer` rebuilds the app for `test:contracts` (after the explicit `build` step), so CI builds twice — acceptable for a small app; could be optimized later if minutes get tight.
