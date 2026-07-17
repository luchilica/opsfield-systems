import { defineConfig, devices } from "@playwright/test";

// Contract + E2E tests run against a production build (closest to deployed
// behavior). reuseExistingServer lets a locally-running server be reused.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0, // contract tests must be deterministic — no retry masking
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  // Visual-regression tolerance (tests/visual). Small ratio absorbs sub-pixel
  // font-rendering jitter without hiding real layout/colour regressions.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" },
  },
  webServer: {
    command: "npm run build && npx next start",
    port: 3000,
    reuseExistingServer: true,
    timeout: 180_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
