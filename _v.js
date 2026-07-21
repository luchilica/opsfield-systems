const { chromium } = require("@playwright/test");
const OUT = "C:/Users/marfa/AppData/Local/Temp/claude/C--projects-opsfield-systems/6918758a-b3f7-464f-a0dd-78f3fdbcadca/scratchpad";
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 1200 } });
  await p.goto("http://localhost:3142/", { waitUntil: "networkidle" });

  // Hero link text + AI scope (no dots)
  await p.locator("#hero").scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await p.locator("#hero .container, #hero").first().screenshot({ path: `${OUT}/v-hero.png` });
  await p.locator("#ai-process-automation").scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await p.locator("#ai-process-automation").screenshot({ path: `${OUT}/v-ai.png` });

  // Form: select Other/Something else in tools & pains to reveal inputs, and see timeline visible
  const form = p.locator("#diagnostic-request-form");
  await form.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await form.getByRole("button", { name: "Other / none" }).click();
  await form.getByRole("button", { name: "Something else" }).click();
  await p.waitForTimeout(300);
  await form.screenshot({ path: `${OUT}/v-form.png` });

  await b.close(); console.log("done");
})().catch((e) => { console.error("ERR", e.message); process.exit(1); });
