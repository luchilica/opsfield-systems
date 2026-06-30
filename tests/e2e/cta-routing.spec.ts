import { test, expect } from "@playwright/test";

// CTA → Request Type prefill. Routing table from docs/sitemap.md.
// A CTA carrying data-request-type also auto-opens the optional block.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("a request-type CTA prefills the form's request type", async ({ page }) => {
  await page
    .getByRole("link", { name: "Assess Automation Opportunities" })
    .click();
  // The CTA listener opens the optional block automatically.
  await expect(page.locator("#df-request-type")).toBeVisible();
  await expect(page.locator("#df-request-type")).toHaveValue(
    "AI & Process Automation Review",
  );
});

test("a generic CTA does not prefill the request type", async ({ page }) => {
  await page.getByRole("link", { name: "Start With a Diagnostic" }).click();
  await page.getByRole("button", { name: /add more context/i }).click();
  await expect(page.locator("#df-request-type")).toHaveValue("");
});

test("a prefilled request type remains editable", async ({ page }) => {
  await page
    .getByRole("link", { name: "Assess Automation Opportunities" })
    .click();
  await expect(page.locator("#df-request-type")).toBeVisible();
  await page.locator("#df-request-type").selectOption("Not sure yet");
  await expect(page.locator("#df-request-type")).toHaveValue("Not sure yet");
});
