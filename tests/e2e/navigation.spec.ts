import { test, expect } from "@playwright/test";

// Anchor-navigation smoke. CTA→anchor map from docs/sitemap.md.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("header CTA scrolls to the diagnostic form", async ({ page }) => {
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Request Diagnostic", exact: true })
    .click();
  await expect(page.locator("#diagnostic-request-form")).toBeInViewport();
});

test("hero primary CTA scrolls to the diagnostic form", async ({ page }) => {
  await page
    .locator("#hero")
    .getByRole("link", { name: "Request a Business & IT Diagnostic" })
    .click();
  await expect(page.locator("#diagnostic-request-form")).toBeInViewport();
});

test("hero secondary CTA scrolls to how-the-diagnostic-works", async ({
  page,
}) => {
  await page
    .locator("#hero")
    .getByRole("link", { name: "See How the Diagnostic Works" })
    .click();
  await expect(page.locator("#how-the-diagnostic-works")).toBeInViewport();
});

test("footer CTA scrolls to the diagnostic form", async ({ page }) => {
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Request a Diagnostic", exact: true })
    .click();
  await expect(page.locator("#diagnostic-request-form")).toBeInViewport();
});
