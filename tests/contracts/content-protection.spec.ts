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

test("O-1 wording is scoped to the service card + FAQ, absent from primary surfaces", async ({
  page,
}) => {
  await page.goto("/");
  const O1_TERMS = ["o-1", "immigration", "visa", "petition"];

  // O-1 must NOT appear in primary surfaces.
  const surfaces: Record<string, string> = {
    hero: (await page.locator("#hero").innerText()).toLowerCase(),
    h1: (await page.locator("h1").innerText()).toLowerCase(),
    header: (await page.getByRole("banner").innerText()).toLowerCase(),
    title: (await page.title()).toLowerCase(),
    description: (
      (await page
        .locator('head meta[name="description"]')
        .getAttribute("content")) ?? ""
    ).toLowerCase(),
  };
  for (const [surface, content] of Object.entries(surfaces)) {
    for (const term of O1_TERMS) {
      expect(content, `${surface}:${term}`).not.toContain(term);
    }
  }

  // The "agent" framing for O-1 must never appear anywhere.
  expect((await page.locator("body").innerText()).toLowerCase()).not.toContain(
    "o-1 agent",
  );

  // O-1 Readiness Support is present only in its allowed places.
  await expect(page.locator("#what-we-diagnose")).toContainText(
    "O-1 Readiness Support",
  );
  await expect(page.locator("#faq")).toContainText(
    "Do you handle O-1 visa petitions?",
  );
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
