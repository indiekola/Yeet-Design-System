/**
 * Координаты блоков экрана для ручной сверки с Figma: node scripts/qa/boxes.mjs <slug> [selector] [depth]
 * Печатает дерево элементов внутри `.y-screen` (x,y от левого верхнего угла экрана, размеры, класс).
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright-core';

const [slug, selector = '.y-screen', depth = '5'] = process.argv.slice(2);
const dir = join(resolve(import.meta.dirname, '../..'), 'storybook-static');
const server = createServer((req, res) => {
  const p = join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!existsSync(p)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' }[extname(p)] ?? 'application/octet-stream' }).end(readFileSync(p));
});
await new Promise((r) => server.listen(0, r));
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => p && existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
await page.goto(`http://localhost:${server.address().port}/iframe.html?id=${encodeURIComponent(`pages-экраны-флоу--${slug}`)}&viewMode=story`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
console.log(await page.evaluate(([sel, max]) => {
  const o = document.querySelector('.y-screen').getBoundingClientRect();
  const rows = [];
  const walk = (el, d) => {
    const r = el.getBoundingClientRect();
    const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    rows.push(`${' '.repeat(d)}${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className).split(' ')[0]} ${Math.round(r.x - o.x)},${Math.round(r.y - o.y)} ${Math.round(r.width)}x${Math.round(r.height)}${own ? ` "${own.slice(0, 24)}"` : ''}`);
    if (d < max && el.tagName !== 'svg') for (const c of el.children) walk(c, d + 1);
  };
  walk(document.querySelector(sel), 0);
  return rows.join('\n');
}, [selector, +depth]));
await browser.close();
server.close();
