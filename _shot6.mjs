import { chromium } from '@playwright/test';
const dir = 'C:/Users/marfa/AppData/Local/Temp/claude/C--projects-opsfield-systems/1a7becac-0d38-4e03-97df-fe40f5e6e601/scratchpad/';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
const el = await p.$('#areas-of-work');
await el.scrollIntoViewIfNeeded();
await p.waitForFunction(() => {
  const imgs = Array.from(document.querySelectorAll('#areas-of-work img'));
  return imgs.length >= 9 && imgs.every(i => i.complete && i.naturalWidth > 0);
}, { timeout: 15000 }).catch(() => {});
await p.waitForTimeout(1200);
await el.screenshot({ path: dir + 'sec-areas-nocache.png' });
// also a top viewport (banner + nav)
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(300);
await p.screenshot({ path: dir + 'top-nocache.png' });
await b.close();
console.log('done');
