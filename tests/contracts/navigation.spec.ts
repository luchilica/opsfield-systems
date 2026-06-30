import { test, expect } from "@playwright/test";

// CTA + link-target invariants. Source: docs/sitemap.md (CTA→anchor map,
// footer legal links).

const LEGAL_PAGES = ["/privacy-policy", "/terms-of-use", "/cookie-policy"];

test("all in-page anchor targets resolve to an existing element", async ({
  page,
}) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href^="#"]').evaluateAll((anchors) =>
    Array.from(
      new Set(
        anchors
          .map((a) => a.getAttribute("href"))
          .filter((h): h is string => !!h && h.length > 1),
      ),
    ),
  );
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    const id = href.slice(1);
    expect(await page.locator(`[id="${id}"]`).count(), href).toBeGreaterThan(0);
  }
});

test("footer legal links exist and resolve (no 404)", async ({
  page,
  request,
}) => {
  await page.goto("/");
  for (const path of LEGAL_PAGES) {
    const link = page.locator(`footer a[href="${path}"]`);
    expect(await link.count(), path).toBeGreaterThan(0);
    const res = await request.get(path);
    expect(res.status(), path).not.toBe(404);
  }
});

test("#diagnostic-request-form anchor exists", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("#diagnostic-request-form").count()).toBe(1);
});
