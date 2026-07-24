import { test, expect } from "@playwright/test";

// Form structural invariants. Source: docs/texts.md + docs/optimization.md
// (4 required fields, button text, request-type options, company-size default).

const SERVICE_OPTIONS = [
  "Process & Operations",
  "RevOps: CRM, Data & Reporting",
  "AI & Process Automation",
  "IT Risk & Security",
  "Extended Diagnostic",
  "Advisory Power Hour",
  "Add-on Tool Build",
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

test("service chip options match the form exactly", async ({ page }) => {
  const chips = page.locator(
    '[aria-labelledby="df-services-label"] button[aria-pressed]',
  );
  const labels = await chips.evaluateAll((els) =>
    els.map((el) => (el as HTMLButtonElement).textContent?.trim() ?? ""),
  );
  expect(labels).toEqual(SERVICE_OPTIONS);
});

test("company size chips have no preselected value", async ({ page }) => {
  const pressed = page.locator(
    '[aria-labelledby="df-size-label"] button[aria-pressed="true"]',
  );
  expect(await pressed.count()).toBe(0);
});
