// Быстрая замена и подстройка бренд-палитры под выбранные цвета.
//
//   npm run brand -- new <id> --accent "#C9DE5B" [--ink "#1C1B17"] [--canvas "#FBF8F1"] [--name "Лайм"] [--about "…"] [--fit] [--dry]
//       --fit — при необходимости сдвинуть акцент к ближайшему, где текст на нём ≥ 4.5:1 и индикатор ≥ 3:1 (иначе акцент остаётся как задан, а подсказка печатается)
//       Собирает полный набор семантических цветов бренда (свет и тёмная тема) из одного–трёх цветов
//       и подгоняет остальное под контраст WCAG (текст 4.5:1, индикаторы 3:1). Добавляет/заменяет `brand.<id>` в tokens/tokens.json.
//   npm run brand -- promote <id> [--keep] [--dry]
//       Делает бренд основной темой: значения бренда переносятся в `color.*`, группа `brand.<id>` удаляется (--keep — оставить).
//   npm run brand -- remove <id>      — удалить палитру из tokens.json
//   npm run brand -- list             — палитры и их акценты
//
// После записи скрипт запускает `npm run tokens` и `npm run contrast -- --set=<id> --brands=error`,
// поэтому в конце видно, какие пары не проходят и какой ближайший цвет акцента проходит.
// Файл tokens.json правится точечно (текстом, в формате файла) — остальные токены остаются байт-в-байт.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FILE = join(root, 'tokens', 'tokens.json');

const TEXT = 4.5;
const UI = 3;

/* ─── Цвет ──────────────────────────────────────────────────────────── */
export function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Неверный цвет «${hex}», нужен #RRGGBB`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
export const rgbToHex = (rgb) =>
  `#${rgb
    .map((c) =>
      Math.round(Math.min(255, Math.max(0, c)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')
    .toUpperCase()}`;

export function rgbToHsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    l = (max + min) / 2,
    d = max - min;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}
export function hslToRgb([h, s, l]) {
  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
const hsl = (h, s, l) => rgbToHex(hslToRgb([h, Math.min(1, Math.max(0, s)), Math.min(1, Math.max(0, l))]));
const mix = (a, b, t) => rgbToHex(hexToRgb(a).map((c, i) => c * (1 - t) + hexToRgb(b)[i] * t)); // t=0 → a, t=1 → b

function lum(rgb) {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [x, y] = [lum(hexToRgb(a)), lum(hexToRgb(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
/** Цвет с прозрачностью alpha поверх подложки → непрозрачный. */
const over = (fg, alpha, bg) => mix(bg, fg, alpha);
const worst = (fg, bgs) => Math.min(...bgs.map((bg) => contrast(fg, bg)));

/** Сдвигает светлоту цвета шагом 0.01 в сторону dir (+1 светлее, −1 темнее), пока ok(hex) не станет истиной. */
function nudge(hex, dir, ok) {
  const [h, s, l0] = rgbToHsl(hexToRgb(hex));
  for (let l = l0; l >= 0 && l <= 1; l += dir * 0.01) {
    const c = hsl(h, s, l);
    if (ok(c)) return c;
  }
  return null;
}

/* ─── Палитра ───────────────────────────────────────────────────────── */
/**
 * Из акцента (и, по желанию, чернил и холста) собирает семантические цвета бренда.
 * Возвращает { light, dark, notes }: light/dark — ключ → { hex, alpha? }, notes — что пришлось подогнать и что не проходит.
 */
export function buildPalette({ accent: accentSeed, ink, canvas, danger, fit = false }) {
  const notes = [];
  let accent = accentSeed;
  const [hue, sat] = rgbToHsl(hexToRgb(accent));
  const tint = sat < 0.06 ? 0 : 1; // почти серый акцент → нейтральные поверхности

  /* светлая тема */
  const inkL = ink ?? hsl(hue, 0.12 * tint, 0.1);
  const canvasL = canvas ?? hsl(hue, 0.3 * tint, 0.965);
  const elevatedL = canvas ? mix(canvas, '#FFFFFF', 0.6) : hsl(hue, 0.4 * tint, 0.99);
  const subtleL = canvas ? mix(canvas, inkL, 0.06) : hsl(hue, 0.3 * tint, 0.925);
  const surfacesL = [canvasL, elevatedL, subtleL];
  if (fit) {
    // подгоняем акцент к ближайшему проходящему: текст на нём ≥ 4.5 и индикатор на поверхностях ≥ 3
    const okAcc = (c) => Math.max(contrast(c, inkL), contrast(c, '#FFFFFF')) >= TEXT && worst(c, surfacesL) >= UI;
    if (!okAcc(accent)) {
      const cand = [nudge(accent, -1, okAcc), nudge(accent, +1, okAcc)].filter(Boolean);
      const best = cand.sort(
        (p, q) =>
          Math.abs(rgbToHsl(hexToRgb(p))[2] - rgbToHsl(hexToRgb(accent))[2]) -
          Math.abs(rgbToHsl(hexToRgb(q))[2] - rgbToHsl(hexToRgb(accent))[2]),
      )[0];
      if (best) {
        notes.push(
          `--fit: акцент ${accent} → ${best} (ближайший, где текст на акценте ≥ ${TEXT}:1 и индикатор ≥ ${UI}:1)`,
        );
        accent = best;
      }
    }
  }
  const onAccentL = contrast(accent, inkL) >= contrast(accent, '#FFFFFF') ? inkL : '#FFFFFF';
  let secondaryL = inkL;
  for (let t = 0.84; t >= 0.4; t -= 0.02) {
    const c = mix(inkL, canvasL, t);
    if (worst(c, surfacesL) >= TEXT + 0.1) {
      secondaryL = c;
      break;
    }
  }
  const softL = (s) => over(accent, 0.3, s);
  const textAccentL = nudge(accent, -1, (c) => worst(c, [...surfacesL, ...surfacesL.map(softL)]) >= TEXT) ?? inkL;

  /* тёмная тема */
  const [ch, cs] = canvas ? rgbToHsl(hexToRgb(canvas)) : [hue, 0.3 * tint];
  const canvasD = hsl(ch, Math.min(cs, 0.25) * 0.6, 0.065);
  const elevatedD = hsl(ch, Math.min(cs, 0.25) * 0.6, 0.1);
  const subtleD = hsl(ch, Math.min(cs, 0.25) * 0.6, 0.145);
  const surfacesD = [canvasD, elevatedD, subtleD];
  const primaryD = hsl(ch, Math.min(cs, 0.3) * 0.9, 0.9);
  let secondaryD = primaryD;
  for (let t = 0.6; t >= 0.2; t -= 0.02) {
    const c = mix(primaryD, canvasD, t);
    if (worst(c, surfacesD) >= TEXT + 0.1) {
      secondaryD = c;
      break;
    }
  }
  const accentD =
    worst(accent, surfacesD) >= UI ? accent : (nudge(accent, +1, (c) => worst(c, surfacesD) >= UI) ?? accent);
  const onAccentD = contrast(accentD, canvasD) >= contrast(accentD, '#FFFFFF') ? inkL : '#FFFFFF';
  const softD = (s) => over(accentD, 0.16, s);
  const textAccentD = nudge(accentD, +1, (c) => worst(c, [...surfacesD, ...surfacesD.map(softD)]) >= TEXT) ?? primaryD;

  /* text-danger: на поверхностях бренда красный текст и Destructive-кнопка (text-danger на danger-soft) должны держать 4.5:1 */
  const overrides = { light: {}, dark: {} };
  if (danger) {
    const tune = (theme, surfaces) => {
      const soft = danger[theme].soft;
      const bgs = [...surfaces, ...surfaces.map((s) => over(soft.hex, soft.alpha, s))];
      if (worst(danger[theme].text, bgs) >= TEXT) return;
      const fixed = nudge(danger[theme].text, theme === 'light' ? -1 : +1, (c) => worst(c, bgs) >= TEXT);
      if (fixed) overrides[theme]['text-danger'] = { hex: fixed };
    };
    tune('light', surfacesL);
    tune('dark', surfacesD);
  }

  /* проверки, которые токенами не починить — подсказываем ближайший цвет */
  const onAcc = contrast(accent, onAccentL);
  if (onAcc < TEXT) {
    const fix = nudge(accent, onAccentL === '#FFFFFF' ? -1 : +1, (c) => contrast(c, onAccentL) >= TEXT);
    notes.push(
      `текст на акценте ${onAcc.toFixed(2)}:1 (нужно ${TEXT}:1) — ближайший акцент, который проходит: ${fix ?? 'нет'}`,
    );
  }
  const ui = worst(accent, surfacesL);
  if (ui < UI) {
    const fix = nudge(accent, -1, (c) => worst(c, surfacesL) >= UI);
    notes.push(
      `акцент как индикатор выбранного/иконка на светлой теме ${ui.toFixed(2)}:1 (нужно ${UI}:1, WCAG 1.4.11; фокус-кольцо берёт text-accent, ему это не грозит) — акцент темнее: ${fix ?? 'нет'}; либо --fit`,
    );
  }

  const light = {
    'bg-canvas': { hex: canvasL },
    'bg-elevated': { hex: elevatedL },
    'bg-subtle': { hex: subtleL },
    'bg-inverse': { hex: inkL },
    'text-primary': { hex: inkL },
    'text-secondary': { hex: secondaryL },
    'text-inverse': { hex: canvasL },
    'text-on-accent': { hex: onAccentL },
    'text-accent': { hex: textAccentL },
    accent: { hex: accent },
    'accent-soft': { hex: accent, alpha: 0.3 },
    'border-subtle': { hex: inkL, alpha: 0.1 },
    divider: { hex: inkL, alpha: 0.06 },
    'pattern-dot': { hex: inkL, alpha: 0.2 },
  };
  const dark = {
    'bg-canvas': { hex: canvasD },
    'bg-elevated': { hex: elevatedD },
    'bg-subtle': { hex: subtleD },
    'bg-inverse': { hex: primaryD },
    'text-primary': { hex: primaryD },
    'text-secondary': { hex: secondaryD },
    'text-inverse': { hex: canvasD },
    'text-on-accent': { hex: onAccentD },
    'text-accent': { hex: textAccentD },
    accent: { hex: accentD },
    'accent-soft': { hex: accentD, alpha: 0.16 },
    'border-subtle': { hex: primaryD, alpha: 0.12 },
    divider: { hex: primaryD, alpha: 0.08 },
    'pattern-dot': { hex: primaryD, alpha: 0.2 },
  };
  Object.assign(light, overrides.light);
  Object.assign(dark, overrides.dark);
  if (overrides.light['text-danger'] || overrides.dark['text-danger'])
    notes.push(
      `text-danger подогнан под поверхности бренда: ${overrides.light['text-danger']?.hex ?? '—'} / ${overrides.dark['text-danger']?.hex ?? '—'}`,
    );
  return { light, dark, notes };
}

/* ─── Запись в tokens.json: тот же формат, что в файле ──────────────── */
const num = (n) => Number(n.toFixed(4)); // 0.9843, 1, 0.0706
const colorObj = ({ hex, alpha }) => {
  const c = hexToRgb(hex).map((v) => num(v / 255));
  return { colorSpace: 'srgb', components: c, ...(alpha === undefined ? {} : { alpha }), hex };
};
const isColor = (v) => v && typeof v === 'object' && 'colorSpace' in v;

/** Сериализация как в tokens.json: цвета и `modes` — в одну строку, остальное — развёрнуто. */
export function ser(v, ind = '', col = ind.length) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return JSON.stringify(v);
  if (isColor(v))
    return `{ ${Object.entries(v)
      .map(([k, x]) => `"${k}": ${Array.isArray(x) ? `[${x.join(', ')}]` : JSON.stringify(x)}`)
      .join(', ')} }`;
  const entries = Object.entries(v);
  if (entries.length === 1 && (isColor(entries[0][1]) || ['com.yeet', 'modes'].includes(entries[0][0]))) {
    const inner = ser(entries[0][1], ind, col + 4);
    const inline = `{ ${JSON.stringify(entries[0][0])}: ${inner} }`;
    if (!inline.includes('\n') && col + inline.length <= 120) return inline; // как Prettier: не шире 120 знаков
  }
  const pad = `${ind}  `;
  return `{\n${entries
    .map(([k, x]) => {
      const key = `${pad}${JSON.stringify(k)}: `;
      return key + ser(x, pad, key.length);
    })
    .join(',\n')}\n${ind}}`;
}

const tokenNode = (light, dark) => ({
  $value: colorObj(light),
  ...(dark ? { $extensions: { 'com.yeet': { modes: { dark: colorObj(dark) } } } } : {}),
});

/** Находит блок `"key": {` заданного отступа после строки-якоря; возвращает [начало, конец) в массиве строк. */
export function findBlock(lines, indent, key, from = 0, to = lines.length) {
  const open = new RegExp(`^${indent}"${key}": \\{`);
  const start = lines.findIndex((l, i) => i >= from && i < to && open.test(l));
  if (start < 0) return null;
  if (/\},?$/.test(lines[start]) && balanced(lines[start])) return [start, start + 1]; // блок в одну строку
  const close = new RegExp(`^${indent}\\},?$`);
  for (let i = start + 1; i < to; i++) if (close.test(lines[i])) return [start, i + 1];
  return null;
}
const balanced = (s) => (s.match(/\{/g) ?? []).length === (s.match(/\}/g) ?? []).length;
const blockText = (lines, [a, b]) => lines.slice(a, b).join('\n');
export const parseBlock = (text) => JSON.parse(`{${text.replace(/,\s*$/, '')}}`);

function brandBlock(id, meta, pal) {
  const node = { $extensions: { 'com.yeet': { brand: meta } } };
  for (const k of Object.keys(pal.light)) Object.assign(node, { [k]: tokenNode(pal.light[k], pal.dark[k]) });
  return `    "${id}": ${ser(node, '    ')}`;
}

function writeBrand(text, id, meta, pal) {
  const lines = text.split('\n');
  const group = findBlock(lines, '  ', 'brand');
  if (!group) throw new Error('В tokens.json нет группы brand');
  const block = brandBlock(id, meta, pal).split('\n');
  const existing = findBlock(lines, '    ', id, group[0], group[1]);
  if (existing) {
    const comma = lines[existing[1] - 1].endsWith(',') ? ',' : '';
    block[block.length - 1] += comma;
    lines.splice(existing[0], existing[1] - existing[0], ...block);
  } else {
    const last = group[1] - 2; // закрывающая строка последней палитры
    if (!lines[last].endsWith(',')) lines[last] += ',';
    lines.splice(group[1] - 1, 0, ...block);
  }
  return lines.join('\n');
}

function removeBrand(text, id) {
  const lines = text.split('\n');
  const group = findBlock(lines, '  ', 'brand');
  const b = group && findBlock(lines, '    ', id, group[0], group[1]);
  if (!b) throw new Error(`Палитры «${id}» нет`);
  const wasLast = !lines[b[1] - 1].endsWith(',');
  lines.splice(b[0], b[1] - b[0]);
  if (wasLast) {
    const prev = b[0] - 1;
    if (lines[prev].endsWith(',')) lines[prev] = lines[prev].slice(0, -1);
  }
  return lines.join('\n');
}

/** Переносит цвета бренда в `color.*` (светлая — $value, тёмная — modes.dark). Остальные поля токена сохраняются. */
function promoteBrand(text, id, keep) {
  const tree = JSON.parse(text);
  const b = tree.brand?.[id];
  if (!b) throw new Error(`Палитры «${id}» нет`);
  let lines = text.split('\n');
  const changed = [];
  for (const [key, tok] of Object.entries(b)) {
    if (key.startsWith('$')) continue;
    const colorGroup = findBlock(lines, '  ', 'color'); // после замен блоки растут — границы считаем заново
    const blk = findBlock(lines, '      ', key, colorGroup[0], colorGroup[1]);
    if (!blk) throw new Error(`color.*.${key}: токен не найден`);
    const node = parseBlock(blockText(lines, blk))[key];
    node.$value = tok.$value;
    const dark = tok.$extensions?.['com.yeet']?.modes?.dark ?? tok.$value;
    node.$extensions = {
      ...node.$extensions,
      'com.yeet': { ...node.$extensions?.['com.yeet'], modes: { ...node.$extensions?.['com.yeet']?.modes, dark } },
    };
    const out = `      "${key}": ${ser(node, '      ')}${lines[blk[1] - 1].endsWith(',') ? ',' : ''}`.split('\n');
    lines.splice(blk[0], blk[1] - blk[0], ...out);
    changed.push(key);
  }
  let res = lines.join('\n');
  if (!keep) res = removeBrand(res, id);
  return { text: res, changed };
}

/** Цвет токена ({hex, alpha}) в теме mode: ссылки на примитивы раскрываются. */
function colorOf(tree, node, mode) {
  let v = mode === 'dark' ? (node.$extensions?.['com.yeet']?.modes?.dark ?? node.$value) : node.$value;
  while (typeof v === 'string') v = tree.primitive[v.slice(1, -1).split('.').at(-1)].$value;
  return { hex: v.hex, alpha: v.alpha ?? 1 };
}
export function baseDanger(tree) {
  const text = tree.color.content['text-danger'],
    soft = tree.color.emphasis['danger-soft'];
  return Object.fromEntries(
    ['light', 'dark'].map((m) => [m, { text: colorOf(tree, text, m).hex, soft: colorOf(tree, soft, m) }]),
  );
}

/* ─── CLI ───────────────────────────────────────────────────────────── */
function parseArgs(argv) {
  const flags = {},
    pos = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const [k, v] = argv[i].slice(2).split('=');
      flags[k] = v ?? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true);
    } else pos.push(argv[i]);
  }
  return { flags, pos };
}

const run = (script, args = []) => execFileSync('node', [join(root, script), ...args], { stdio: 'inherit', cwd: root });

function main() {
  const { flags, pos } = parseArgs(process.argv.slice(2));
  const [cmd, id] = pos;
  const text = readFileSync(FILE, 'utf8');
  const commit = (next, then) => {
    if (flags.dry) {
      console.log(
        `--dry: tokens.json не изменён (${next.split('\n').length - text.split('\n').length >= 0 ? '+' : ''}${next.split('\n').length - text.split('\n').length} строк).`,
      );
      return;
    }
    JSON.parse(next); // не записываем битый файл
    writeFileSync(FILE, next);
    try {
      run('scripts/build-tokens.mjs');
    } catch {
      writeFileSync(FILE, text);
      throw new Error('Сборка токенов не прошла — tokens.json возвращён как был');
    }
    if (then)
      try {
        run('scripts/check-contrast.mjs', [`--set=${then}`, '--brands=error']);
      } catch {
        console.log('\n↑ Есть пары ниже нормы — подсказки выше; правьте цвета и запускайте ту же команду снова.');
        process.exitCode = 1;
      }
  };

  if (cmd === 'list') {
    for (const [k, v] of Object.entries(JSON.parse(text).brand))
      if (!k.startsWith('$'))
        console.log(
          `${k.padEnd(10)} ${v.$extensions['com.yeet'].brand.name.padEnd(14)} акцент ${v.accent.$value.hex} / ${v.accent.$extensions['com.yeet'].modes.dark.hex}`,
        );
    return;
  }
  if (!id || !/^[a-z][a-z0-9-]*$/.test(id))
    throw new Error('Нужен id палитры латиницей: npm run brand -- new <id> --accent "#RRGGBB"');
  if (cmd === 'new') {
    if (!flags.accent) throw new Error('Нужен --accent "#RRGGBB"');
    const pal = buildPalette({
      fit: !!flags.fit,
      danger: baseDanger(JSON.parse(text)),
      accent: rgbToHex(hexToRgb(flags.accent)),
      ink: flags.ink && rgbToHex(hexToRgb(flags.ink)),
      canvas: flags.canvas && rgbToHex(hexToRgb(flags.canvas)),
    });
    const meta = {
      name: typeof flags.name === 'string' ? flags.name : id,
      about:
        typeof flags.about === 'string'
          ? flags.about
          : `Палитра из акцента ${flags.accent.toUpperCase()}: поверхности и текст подобраны под контраст WCAG (scripts/tokens/brand.mjs).`,
    };
    console.log(
      `Палитра «${id}»: свет — акцент ${pal.light.accent.hex}, текст на нём ${pal.light['text-on-accent'].hex}, акцентный текст ${pal.light['text-accent'].hex}; тёма — акцент ${pal.dark.accent.hex}, акцентный текст ${pal.dark['text-accent'].hex}.`,
    );
    for (const n of pal.notes) console.log(`⚠ ${n}`);
    commit(writeBrand(text, id, meta, pal), id);
  } else if (cmd === 'remove') {
    commit(removeBrand(text, id));
  } else if (cmd === 'promote') {
    const r = promoteBrand(text, id, !!flags.keep);
    console.log(`Перенесено в color.*: ${r.changed.join(', ')}.`);
    commit(r.text);
    if (!flags.dry)
      console.log(
        '\nДальше вручную: 1) новая ADR вместо 0002 (design/adr); 2) переменные «Yeet DS 2.0» в Figma (нужен замок в #6, роль ds-figma-builder); 3) npm run build-storybook && npm run qa — обновить эталоны в закреплённом образе; 4) npm run contrast — уберите из KNOWN (check-contrast.mjs) записи, которые перестали срабатывать.',
      );
  } else throw new Error(`Неизвестная команда «${cmd}». Есть: new, promote, remove, list`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (e) {
    console.error(`✗ ${e.message}`);
    process.exit(1);
  }
}
