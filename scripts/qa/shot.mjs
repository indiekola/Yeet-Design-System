/**
 * Скриншот истории для сверки с Figma: node scripts/qa/shot.mjs <story-id> [out.png] [theme] [selector]
 * Требует собранный storybook-static.
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { chromium } from 'playwright-core';

const [id, out = `qa/out/shot-${id}.png`, theme = 'light', selector = '#storybook-root > *'] = process.argv.slice(2);
const root = resolve(import.meta.dirname, '../..');
const dir = join(root, 'storybook-static');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const p = join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!existsSync(p)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' }).end(readFileSync(p));
});
await new Promise((r) => server.listen(0, r));
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => p && existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1700, height: 1200 }, deviceScaleFactor: 1 });
await page.goto(`http://localhost:${server.address().port}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=theme:${theme}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
mkdirSync(dirname(join(root, out)), { recursive: true });
await (await page.$(selector)).screenshot({ path: join(root, out) });
await browser.close();
server.close();
console.log(out);
