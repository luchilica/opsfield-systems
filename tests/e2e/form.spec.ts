import { test, expect } from "@playwright/test";

// Diagnostic form interactions. Validation/disclosure/submit rules from
// docs/optimization.md (Forms) and docs/texts.md (labels/copy).
// NOTE: submission is currently simulated client-side (resolves to success after
// ~1.5s; the real /api/submit wiring is a later stage). The success test accepts
// either the success or the error terminal state, per spec.

const FORM = "#business-it-diagnostic form";
const SUBMIT = `${FORM} button[type="submit"]`;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

async function fillRequired(
  page: import("@playwright/test").Page,
  email = "test@example.com",
) {
  await page.locator("#df-name").fill("Test User");
  await page.locator("#df-email").fill(email);
  await page.locator("#df-company").fill("Test Co");
  await page.locator("#df-challenge").fill("Testing form submission");
}

test("progressive disclosure shows and hides optional fields", async ({
  page,
}) => {
  const optionalIds = [
    "#df-request-type",
    "#df-website-url",
    "#df-role",
    "#df-company-size",
    "#df-timeline",
  ];
  await expect(page.locator("#df-request-type")).toBeHidden();

  await page.getByRole("button", { name: /add more context/i }).click();
  for (const id of optionalIds) {
    await expect(page.locator(id)).toBeVisible();
  }

  await page.getByRole("button", { name: /hide optional fields/i }).click();
  await expect(page.locator("#df-request-type")).toBeHidden();
});

test("entered optional values persist across the disclosure toggle", async ({
  page,
}) => {
  await page.getByRole("button", { name: /add more context/i }).click();
  await page.locator("#df-website-url").fill("https://example.com");
  await page.getByRole("button", { name: /hide optional fields/i }).click();
  await expect(page.locator("#df-website-url")).toBeHidden();
  await page.getByRole("button", { name: /add more context/i }).click();
  await expect(page.locator("#df-website-url")).toHaveValue(
    "https://example.com",
  );
});

test("validation shows errors for empty required fields and focuses the first", async ({
  page,
}) => {
  await page.locator(SUBMIT).click();
  for (const id of [
    "#df-name-error",
    "#df-email-error",
    "#df-company-error",
    "#df-challenge-error",
  ]) {
    await expect(page.locator(id)).toBeVisible();
  }
  await expect(page.locator("#df-name")).toBeFocused();
});

test("validation shows an error for an invalid email", async ({ page }) => {
  await fillRequired(page, "not-an-email");
  await page.locator(SUBMIT).click();
  await expect(page.locator("#df-email-error")).toBeVisible();
});

test("entered data is preserved after a validation error", async ({ page }) => {
  await fillRequired(page, "not-an-email");
  await page.locator(SUBMIT).click();
  await expect(page.locator("#df-email-error")).toBeVisible();
  await expect(page.locator("#df-name")).toHaveValue("Test User");
  await expect(page.locator("#df-company")).toHaveValue("Test Co");
  await expect(page.locator("#df-challenge")).toHaveValue(
    "Testing form submission",
  );
});

test("successful submission shows a terminal state", async ({ page }) => {
  await fillRequired(page);
  const submit = page.locator(SUBMIT);
  await submit.click();

  // Loading state keeps a label (does not blank the button).
  await expect(submit).toHaveText(/submitting/i);

  // Terminal state — success (role=status) OR error (role=alert); both valid.
  const success = page.getByRole("status");
  const error = page.locator(`${FORM} [role="alert"]`);
  await expect(success.or(error)).toBeVisible({ timeout: 15000 });
});

test("duplicate submit is prevented while submitting", async ({ page }) => {
  await fillRequired(page);
  const submit = page.locator(SUBMIT);
  await submit.click();
  await expect(submit).toBeDisabled(); // second click is blocked during loading
});
