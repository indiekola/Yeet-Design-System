/** Снимки всех экранов флоу (Pages): node scripts/qa/shots-pages.mjs [device] → qa/out/pages[-device]/*.png. device: s320, a360, s375, i393 (по умолчанию), m430 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { openStory, root, startStorybook, storyIndex } from './lib.mjs';

const device = process.argv[2] ?? 'i393';
const outDir = join(root, device === 'i393' ? 'qa/out/pages' : `qa/out/pages-${device}`);
const sb = await startStorybook();
const page = await sb.browser.newPage({ viewport: { width: 600, height: 1000 } });
const ids = storyIndex().filter((e) => e.id.startsWith('pages-')).map((e) => e.id);
mkdirSync(outDir, { recursive: true });
for (const id of ids) {
  await openStory(page, sb.origin, id, 'light', device);
  const el = (await page.$('.y-screen')) ?? (await page.$('#storybook-root > *'));
  await el.screenshot({ path: join(outDir, id.replace('pages-экраны-флоу--', '') + '.png') });
}
await sb.close();
console.log(ids.length);
