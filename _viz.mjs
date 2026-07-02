import { chromium } from "@playwright/test";
const dir = "C:/Users/marfa/AppData/Local/Temp/claude/C--projects-opsfield-systems/20a44ee4-899b-48e3-a472-10e2eb77ca80/scratchpad";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.locator("#delivery-model").screenshot({ path: `${dir}/v3-delivery.png` });
const hasName = (await p.locator("#delivery-model").innerText()).match(/Kovacs|Torres/);
await b.close();
console.log(JSON.stringify({ namesRemoved: !hasName }, null, 2));
