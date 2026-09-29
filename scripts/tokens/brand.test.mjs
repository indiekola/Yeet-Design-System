// node --test scripts/tokens/brand.test.mjs — генератор бренд-палитры и сериализация tokens.json
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildPalette, baseDanger, contrast, ser, findBlock, parseBlock } from './brand.mjs';

const text = readFileSync(new URL('../../tokens/tokens.json', import.meta.url), 'utf8');
const danger = baseDanger(JSON.parse(text));

test('любой акцент даёт палитру, где текст ≥ 4.5:1 на всех поверхностях (свет и тёмная)', () => {
  for (const accent of ['#FF5A4A', '#7A1F3D', '#B8F2C9', '#4B4BFF', '#C9DE5B', '#777777']) {
    const p = buildPalette({ accent, danger, fit: true });
    for (const theme of ['light', 'dark']) {
      const t = p[theme];
      for (const fg of ['text-primary', 'text-secondary', 'text-accent']) {
        for (const bg of ['bg-canvas', 'bg-elevated', 'bg-subtle']) {
          assert.ok(
            contrast(t[fg].hex, t[bg].hex) >= 4.5,
            `${accent} ${theme}: ${fg} на ${bg} = ${contrast(t[fg].hex, t[bg].hex).toFixed(2)}`,
          );
        }
      }
      assert.ok(contrast(t['text-on-accent'].hex, t.accent.hex) >= 4.5, `${accent} ${theme}: текст на акценте`);
      assert.ok(
        contrast(t['text-inverse'].hex, t['bg-inverse'].hex) >= 4.5,
        `${accent} ${theme}: text-inverse на bg-inverse`,
      );
    }
  }
});

test('без --fit акцент остаётся как задан, а проблема попадает в notes', () => {
  const p = buildPalette({ accent: '#B8F2C9', danger });
  assert.equal(p.light.accent.hex, '#B8F2C9');
  assert.ok(p.notes.some((n) => n.includes('индикатор')));
});

test('ключи палитры — подмножество семантических цветов tokens.json', () => {
  const tree = JSON.parse(text);
  const semantic = new Set(Object.values(tree.color).flatMap((g) => Object.keys(g).filter((k) => !k.startsWith('$'))));
  for (const k of Object.keys(buildPalette({ accent: '#FF5A4A', danger }).light)) assert.ok(semantic.has(k), k);
});

test('сериализатор воспроизводит формат существующих бренд-токенов байт-в-байт', () => {
  const lines = text.split('\n');
  const g = findBlock(lines, '  ', 'brand');
  let n = 0;
  for (const id of ['lime', 'butter', 'cherry', 'sage', 'lilac']) {
    const b = findBlock(lines, '    ', id, g[0], g[1]);
    for (let i = b[0] + 1; i < b[1] - 1;) {
      const m = /^ {6}"([\w-]+)": /.exec(lines[i]);
      if (!m) {
        i++;
        continue;
      }
      const t = findBlock(lines, '      ', m[1], i, b[1]);
      const src = lines.slice(t[0], t[1]).join('\n').replace(/,$/, '');
      const col = `      "${m[1]}": `.length;
      assert.equal(`      "${m[1]}": ${ser(parseBlock(src)[m[1]], '      ', col)}`, src, `${id}.${m[1]}`);
      n++;
      i = t[1];
    }
  }
  assert.ok(n > 50);
});
