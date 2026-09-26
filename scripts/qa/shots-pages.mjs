/** Снимки всех экранов флоу (Pages) для сверки с Figma: node scripts/qa/shots-pages.mjs → qa/out/pages/*.png */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { openStory, root, startStorybook, storyIndex } from './lib.mjs';

const sb = await startStorybook();
const page = await sb.browser.newPage({ viewport: { width: 600, height: 1000 } });
const ids = storyIndex().filter((e) => e.id.startsWith('pages-')).map((e) => e.id);
mkdirSync(join(root, 'qa/out/pages'), { recursive: true });
for (const id of ids) {
  await openStory(page, sb.origin, id);
  const el = (await page.$('.y-screen')) ?? (await page.$('#storybook-root > *'));
  await el.screenshot({ path: join(root, 'qa/out/pages', id.replace('pages-экраны-флоу--', '') + '.png') });
}
await sb.close();
console.log(ids.length);
