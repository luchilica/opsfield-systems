import { test, expect } from "@playwright/test";

// Content invariants. Source: docs/sitemap.md + docs/optimization.md
// (O-1 exclusion, FAQ crawlability, no analytics before consent).

test("no old brand references in page source", async ({ page }) => {
  await page.goto("/");
  const html = await page.content();
  for (const brand of ["Clearpath", "Field Operations"]) {
    expect(html, brand).not.toContain(brand);
  }
});

test("no O-1 / immigration references in visible content", async ({ page }) => {
  await page.goto("/");
  const text = (await page.locator("body").innerText()).toLowerCase();
  for (const term of ["o-1", "o1 agent", "immigration", "visa", "petition"]) {
    expect(text, term).not.toContain(term);
  }
});

test("no TODO/TBD/lorem ipsum/placeholder in rendered content", async ({
  page,
}) => {
  await page.goto("/");
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/\b(TODO|TBD|FIXME|lorem ipsum|placeholder)\b/i);
});

test("FAQ content is server-rendered in the initial HTML", async ({
  request,
}) => {
  // Raw response (no JS execution) — proves FAQ is not client-loaded.
  const res = await request.get("/");
  const html = await res.text();
  expect(html).toContain("Is this a sales call?");
  expect(html).toContain("Do you guarantee ROI?");
});

test("no analytics scripts present (no consent yet)", async ({ page }) => {
  await page.goto("/");
  const html = await page.content();
  expect(html).not.toContain("gtag");
  expect(html).not.toContain("googletagmanager");
  // GA4 measurement-ID pattern (avoids false positives on a bare "G-").
  expect(html).not.toMatch(/G-[A-Z0-9]{6,}/);
});
