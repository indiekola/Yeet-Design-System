/** Снимки всех экранов флоу (Pages) для сверки с Figma: node scripts/qa/shots-pages.mjs → qa/out/pages/*.png */
import { createServer } from 'node:http';
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright-core';
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
const page = await browser.newPage({ viewport: { width: 600, height: 1000 } });
const ids = Object.values(JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8')).entries).filter((e) => e.type === 'story' && e.id.startsWith('pages-')).map((e) => e.id);
mkdirSync(join(root, 'qa/out/pages'), { recursive: true });
for (const id of ids) {
  await page.goto(`http://localhost:${server.address().port}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
  const el = (await page.$('.y-screen')) ?? (await page.$('#storybook-root > *'));
  await el.screenshot({ path: join(root, 'qa/out/pages', id.replace('pages-экраны-флоу--', '') + '.png') });
}
await browser.close(); server.close();
console.log(ids.length);
