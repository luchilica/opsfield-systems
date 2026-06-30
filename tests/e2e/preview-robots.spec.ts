import { test, expect } from "@playwright/test";

// Preview isolation. Default SITE_MODE is "preview" → crawling blocked.

test("robots.txt blocks crawling in preview", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("Disallow: /");
});

test("X-Robots-Tag header is present in preview", async ({ request }) => {
  const res = await request.head("/");
  expect(res.headers()["x-robots-tag"] ?? "").toContain("noindex");
});
