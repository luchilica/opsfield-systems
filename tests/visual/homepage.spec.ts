import { test, expect, type Page } from "@playwright/test";

// Visual-regression baseline for the homepage.
//
// First run with `--update-snapshots` writes the golden PNGs; every later run
// diffs against them via Playwright's built-in pixelmatch (aligned, same
// viewport/DPR — the only setup where a pixel diff is meaningful). This is a
// REGRESSION guard, not a design-system audit: it catches unintended visual
// change between two identical-intent renders.
//
// NOTE: snapshots are rendering-environment specific (font hinting differs
// across OSes). Baselines are committed per platform (…-win32.png here); CI on
// another OS must regenerate its own with `npm run test:visual:update`.

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 900 },
} as const;

// Bring the page to a deterministic paint: fonts loaded, lazy content settled.
async function settle(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`homepage @ ${name}`, () => {
    test.use({ viewport });

    test(`full page — ${name}`, async ({ page }) => {
      await settle(page);
      await expect(page).toHaveScreenshot(`home-${name}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  });
}

// Finer-grained guards for the signature DS surfaces (desktop only): a regression
// localized to one block shows up here as a small, legible diff instead of being
// diluted across a 10k-px full-page shot.
test.describe("homepage sections @ desktop", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  for (const id of [
    "hero",
    "proof-examples",
    "business-it-diagnostic",
    "delivery-model",
  ]) {
    test(`section — ${id}`, async ({ page }) => {
      await settle(page);
      await expect(page.locator(`#${id}`)).toHaveScreenshot(`section-${id}.png`, {
        animations: "disabled",
      });
    });
  }

  test("footer", async ({ page }) => {
    await settle(page);
    await expect(page.locator("footer")).toHaveScreenshot("footer.png", {
      animations: "disabled",
    });
  });
});
