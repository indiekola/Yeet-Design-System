/**
 * Сводный лист скриншотов для просмотра глазами: node scripts/qa/sheet.mjs <папка> <out.png> [имя,имя,…]
 * Например после `node scripts/qa/shots-pages.mjs s320`: node scripts/qa/sheet.mjs qa/out/pages-s320 qa/out/s320.png today,wardrobe
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { startStorybook } from './lib.mjs';

const [dir, out, names] = process.argv.slice(2);
const files = names ? names.split(',').map((n) => `${n}.png`) : readdirSync(dir).filter((f) => f.endsWith('.png'));
const sb = await startStorybook();
const page = await sb.browser.newPage({ viewport: { width: 1800, height: 1000 } });
await page.setContent(`<body style="margin:0;background:#888;display:flex;flex-wrap:wrap;gap:8px;padding:8px;font:12px sans-serif">${files.map((f) => `<figure style="margin:0"><img style="display:block" src="data:image/png;base64,${readFileSync(join(dir, f)).toString('base64')}"><figcaption>${f}</figcaption></figure>`).join('')}</body>`);
await page.screenshot({ path: out, fullPage: true });
await sb.close();
console.log(out);
