import { test, expect } from "@playwright/test";

// Form structural invariants. Source: docs/texts.md + docs/optimization.md
// (4 required fields, button text, request-type options, company-size default).

const REQUEST_TYPES = [
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

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("form has exactly 4 required fields", async ({ page }) => {
  const required = page.locator("#business-it-diagnostic form [required]");
  expect(await required.count()).toBe(4);
});

test("form submit button has the approved label", async ({ page }) => {
  const button = page.locator(
    '#business-it-diagnostic form button[type="submit"]',
  );
  expect((await button.innerText()).trim()).toBe("Submit Diagnostic Request");
});

test("form privacy notice links to /privacy-policy", async ({ page }) => {
  const link = page.locator(
    '#business-it-diagnostic form a[href="/privacy-policy"]',
  );
  expect(await link.count()).toBeGreaterThan(0);
});

test("request type select options match texts.md exactly", async ({ page }) => {
  await page.getByRole("button", { name: /add more context/i }).click();
  const values = await page
    .locator("#df-request-type option")
    .evaluateAll((opts) =>
      opts
        .map((o) => (o as HTMLOptionElement).value)
        .filter((v) => v !== ""),
    );
  expect(values).toEqual(REQUEST_TYPES);
});

test("company size select has no preselected value", async ({ page }) => {
  await page.getByRole("button", { name: /add more context/i }).click();
  expect(await page.locator("#df-company-size").inputValue()).toBe("");
});
