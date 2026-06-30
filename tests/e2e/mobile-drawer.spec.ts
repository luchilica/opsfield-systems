import { test, expect } from "@playwright/test";

// Mobile drawer behavior at iPhone width. Drawer spec: docs/design.md (768px
// breakpoint), focus management per optimization.md (Keyboard / Focus).

test.use({ viewport: { width: 375, height: 812 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("drawer opens and closes via the menu buttons", async ({ page }) => {
  const drawer = page.locator("#mobile-nav-drawer");
  await expect(drawer).not.toBeVisible();

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(drawer).toBeVisible();

  await drawer.getByRole("button", { name: "Close menu" }).click();
  await expect(drawer).not.toBeVisible();
});

test("drawer closes on Escape and returns focus to the trigger", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Open menu" }).click();
  const drawer = page.locator("#mobile-nav-drawer");
  await expect(drawer).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("drawer link navigates and closes the drawer", async ({ page }) => {
  await page.getByRole("button", { name: "Open menu" }).click();
  const drawer = page.locator("#mobile-nav-drawer");
  await drawer.getByRole("link", { name: "FAQ" }).click();
  await expect(drawer).not.toBeVisible();
  await expect(page.locator("#faq")).toBeInViewport();
});
