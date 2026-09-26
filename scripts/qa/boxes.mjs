/**
 * Координаты блоков экрана для ручной сверки с Figma: node scripts/qa/boxes.mjs <slug> [selector] [depth]
 * Печатает дерево элементов внутри `.y-screen` (x,y от левого верхнего угла экрана, размеры, класс).
 */
import { openStory, startStorybook } from './lib.mjs';

const [slug, selector = '.y-screen', depth = '5'] = process.argv.slice(2);
const sb = await startStorybook();
const page = await sb.browser.newPage({ viewport: { width: 1000, height: 1000 } });
await openStory(page, sb.origin, `pages-экраны-флоу--${slug}`);
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
await sb.close();
