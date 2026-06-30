import { test, expect } from "@playwright/test";

// FAQ accordion. Single-open accordion; item 0 is expanded by default, so the
// expand/collapse cycle is exercised on a collapsed item (item 1).

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("FAQ items expand and collapse", async ({ page }) => {
  const faq = page.locator("#faq");

  // First item is open by default.
  await expect(faq.getByRole("button").first()).toHaveAttribute(
    "aria-expanded",
    "true",
  );

  const second = faq.getByRole("button").nth(1);
  await expect(second).toHaveAttribute("aria-expanded", "false");

  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(
    faq.getByText("complimentary and carries no obligation"),
  ).toBeVisible();

  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "false");
});

test("FAQ answers are present in the initial server HTML", async ({
  request,
}) => {
  // Raw response (no JS) — verifies FAQ answers are crawlable.
  const html = await (await request.get("/")).text();
  expect(html).toContain("structured diagnostic conversation"); // Q1 answer
  expect(html).toContain("ROI requires baseline data"); // Q9 answer
});
