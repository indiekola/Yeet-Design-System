/**
 * Скриншот истории для сверки с Figma: node scripts/qa/shot.mjs <story-id> [out.png] [theme] [selector]
 * Требует собранный storybook-static.
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { openStory, root, startStorybook } from './lib.mjs';

const [id, out = `qa/out/shot-${id}.png`, theme = 'light', selector = '#storybook-root > *'] = process.argv.slice(2);
const sb = await startStorybook();
const page = await sb.browser.newPage({ viewport: { width: 1700, height: 1200 }, deviceScaleFactor: 1 });
await openStory(page, sb.origin, id, theme);
mkdirSync(dirname(join(root, out)), { recursive: true });
await (await page.$(selector)).screenshot({ path: join(root, out) });
await sb.close();
console.log(out);
