// Генератор токенов: tokens/tokens.json → CSS (Storybook), Swift (iOS), Kotlin (Android).
// Запуск: npm run tokens. Сгенерированные файлы не правятся руками.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const t = JSON.parse(readFileSync(new URL('tokens/tokens.json', root), 'utf8'));
const HEADER = 'Сгенерировано scripts/build-tokens.mjs из tokens/tokens.json — не редактировать вручную.';

/* ─── Разбор значений ─────────────────────────────────────────────────── */

const colors = Object.fromEntries(Object.values(t.color).flatMap((g) => Object.entries(g)));

/** Ссылка "{group.name}" → конечное значение для темы. */
function resolve(ref, theme) {
  const m = /^\{(\w+)\.([\w-]+)\}$/.exec(ref);
  if (!m) return ref;
  const [, group, name] = m;
  if (group === 'primitive') return t.primitive[name];
  if (group === 'color') return resolve(colors[name][theme], theme);
  if (group === 'radius') return t.radius[name].value;
  throw new Error(`Unknown reference ${ref}`);
}

/** "#RRGGBB@0.4" → { r, g, b, a } */
function rgba(value) {
  const [hex, alpha] = value.split('@');
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: alpha === undefined ? 1 : Number(alpha), hex: hex.slice(1).toUpperCase() };
}
const cssColor = (v) => { const c = rgba(v); return c.a === 1 ? `#${c.hex.toLowerCase()}` : `rgb(${c.r} ${c.g} ${c.b} / ${c.a})`; };
const camel = (s) => s.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const num = (x) => (Number.isInteger(x) ? String(x) : String(+x.toFixed(4)));

/** Пружина (mass, stiffness, damping) → CSS linear() по 37 точкам за её длительность. */
function springLinear({ mass, stiffness, damping, duration }) {
  const w0 = Math.sqrt(stiffness / mass), z = damping / (2 * Math.sqrt(stiffness * mass)), wd = w0 * Math.sqrt(1 - z * z);
  const pts = Array.from({ length: 37 }, (_, i) => {
    const s = ((i / 36) * duration) / 1000;
    return 1 - Math.exp(-z * w0 * s) * (Math.cos(wd * s) + ((z * w0) / wd) * Math.sin(wd * s));
  });
  pts[0] = 0; pts[36] = 1;
  return `linear(${pts.map((p) => +p.toFixed(3)).join(', ')})`;
}
const dampingRatio = ({ mass, stiffness, damping }) => damping / (2 * Math.sqrt(stiffness * mass));

/* ─── CSS ─────────────────────────────────────────────────────────────── */

function css() {
  const L = [`/* ${HEADER} */`, '', ':root {'];
  for (const [k, v] of Object.entries(t.primitive)) L.push(`  --yeet-${k}: ${cssColor(v)};`);
  for (const [k, v] of Object.entries(t.item)) L.push(`  --yeet-item-${k}: ${cssColor(v.value)};`);
  L.push('');
  for (const s of t.space) L.push(`  --space-${s}: ${s}px;`);
  for (const [k, v] of Object.entries(t.radius)) L.push(`  --radius-${k}: ${v.value}px;`);
  L.push('');
  for (const [k, f] of Object.entries(t.font)) L.push(`  --font-${k}: '${f.family}', ${f.fallback};`);
  L.push(`  --screen-width: ${t.layout['screen-width']}px;`, `  --screen-height: ${t.layout['screen-height']}px;`, `  --screen-gutter: var(--space-${t.layout['screen-gutter']});`, `  --status-bar-height: ${t.layout['status-bar-height']}px;`, '');
  const m = t.motion;
  const durVar = { fast: '--motion-fast', base: '--motion-base', 300: '--motion-300' };
  for (const [k, v] of Object.entries(m.duration)) L.push(`  ${durVar[k]}: ${v}ms;`);
  for (const [k, v] of Object.entries(m.easing)) L.push(`  --ease-${k}: cubic-bezier(${v.join(', ')});`);
  for (const [k, s] of Object.entries(m.spring)) L.push(`  --spring-${k}: ${springLinear(s)};`, `  --spring-${k}-duration: ${s.duration}ms;`);
  for (const [k, tr] of Object.entries(m.transition))
    L.push(`  --motion-${k}: ${tr.spring ? `var(--spring-${tr.spring}-duration) var(--spring-${tr.spring})` : `var(${durVar[tr.duration]}) var(--ease-${tr.easing})`}; /* ${tr.use} */`);
  L.push('}', '', '@media (prefers-reduced-motion: reduce) {', '  :root {');
  L.push('    ' + Object.keys(m.transition).map((k) => `--motion-${k}: 1ms linear;`).join(' '));
  L.push('  }', '}', '');
  for (const theme of ['light', 'dark']) {
    L.push(theme === 'light' ? ":root,\n[data-theme='light'] {" : "[data-theme='dark'] {", `  color-scheme: ${theme};`);
    for (const [k, v] of Object.entries(colors)) {
      const prim = /^\{primitive\.([\w-]+)\}$/.exec(v[theme]);
      L.push(`  --color-${k}: ${prim ? `var(--yeet-${prim[1]})` : cssColor(resolve(v[theme], theme))}; /* ${v.figma} */`);
    }
    for (const [k, s] of Object.entries(t.shadow)) { const x = s[theme]; L.push(`  --shadow-${k}: ${x.x}px ${x.y}px ${x.blur}px ${cssColor(x.color)};`); }
    L.push('}', '');
  }
  L.push(':root {');
  for (const [k, v] of Object.entries(t.component)) {
    const m2 = /^\{(\w+)\.([\w-]+)\}$/.exec(v);
    L.push(`  --${k}: ${m2 ? `var(--${m2[1] === 'radius' ? 'radius' : 'color'}-${m2[2]})` : v};`);
  }
  L.push('}', '');
  for (const [k, s] of Object.entries(t.typography))
    L.push(`.y-${k} { font: ${s.weight} ${s.size}px/${s.lineHeight}px var(--font-${s.font}); letter-spacing: ${s.letterSpacing}px; margin: 0; }`);
  return L.join('\n') + '\n';
}

/* ─── Swift (SwiftUI) ─────────────────────────────────────────────────── */

function swift() {
  const hexA = (v) => { const c = rgba(v); return `0x${c.hex}, alpha: ${num(c.a)}`; };
  const L = [`// ${HEADER}`, '// SwiftUI. Цвета меняются со светлой / тёмной темой системы автоматически.', '', 'import SwiftUI', 'import UIKit', ''];
  L.push('private extension UIColor {', '    convenience init(hex: UInt32, alpha: CGFloat = 1) {', '        self.init(red: CGFloat((hex >> 16) & 0xFF) / 255, green: CGFloat((hex >> 8) & 0xFF) / 255, blue: CGFloat(hex & 0xFF) / 255, alpha: alpha)', '    }', '}', '');
  L.push('private func dynamic(_ light: UIColor, _ dark: UIColor) -> Color {', '    Color(UIColor { $0.userInterfaceStyle == .dark ? dark : light })', '}', '');
  L.push('public enum YeetColor {');
  for (const [group, entries] of Object.entries(t.color)) {
    L.push(`    // ${group}`);
    for (const [k, v] of Object.entries(entries))
      L.push(`    /// ${v.role} · Figma ${v.figma}`, `    public static let ${camel(k)} = dynamic(UIColor(hex: ${hexA(resolve(v.light, 'light'))}), UIColor(hex: ${hexA(resolve(v.dark, 'dark'))}))`);
  }
  L.push('}', '', '/// Цвет вещи — атрибут одежды, не интерфейс.', 'public enum YeetItemColor: String, CaseIterable {');
  for (const k of Object.keys(t.item)) L.push(`    case ${k}`);
  L.push('    public var color: Color {', '        switch self {');
  for (const [k, v] of Object.entries(t.item)) L.push(`        case .${k}: return Color(UIColor(hex: ${hexA(v.value)}))`);
  L.push('        }', '    }', '    public var title: String {', '        switch self {');
  for (const [k, v] of Object.entries(t.item)) L.push(`        case .${k}: return "${v.name}"`);
  L.push('        }', '    }', '}', '');
  L.push('public enum YeetSpace {');
  for (const s of t.space) L.push(`    public static let s${s}: CGFloat = ${s}`);
  L.push(`    public static let screenGutter: CGFloat = ${t.layout['screen-gutter']}`, '}', '', 'public enum YeetRadius {');
  for (const [k, v] of Object.entries(t.radius)) L.push(`    /// ${v.use}`, `    public static let ${k}: CGFloat = ${v.value}`);
  L.push('}', '');
  L.push('public struct YeetTextStyle {', '    public let font: Font', '    public let lineHeight: CGFloat', '    public let tracking: CGFloat', '    public let size: CGFloat', '}', '', 'public enum YeetType {');
  for (const [k, s] of Object.entries(t.typography)) {
    const f = t.font[s.font];
    L.push(`    /// ${s.use}`, `    public static let ${k} = YeetTextStyle(font: .custom("${f.ios}", size: ${s.size}).weight(Font.Weight(${s.weight})), lineHeight: ${s.lineHeight}, tracking: ${s.letterSpacing}, size: ${s.size})`);
  }
  L.push('}', '', 'private extension Font.Weight {', '    init(_ css: Int) {', '        switch css {', '        case ..<350: self = .light', '        case ..<450: self = .regular', '        case ..<550: self = .medium', '        default: self = .semibold', '        }', '    }', '}', '');
  L.push('public extension View {', '    /// Применяет текстовый стиль: шрифт, межстрочный интервал и трекинг.', '    func yeetText(_ style: YeetTextStyle) -> some View {', '        font(style.font).lineSpacing(style.lineHeight - style.size).tracking(style.tracking)', '    }', '}', '');
  L.push('public enum YeetMotion {');
  for (const [k, tr] of Object.entries(t.motion.transition)) {
    if (tr.spring) { const s = t.motion.spring[tr.spring]; L.push(`    /// ${tr.use} · Figma Smart Animate ${s.figma}`, `    public static let ${k} = Animation.interpolatingSpring(mass: ${s.mass}, stiffness: ${s.stiffness}, damping: ${s.damping})`); }
    else { const e = t.motion.easing[tr.easing], d = t.motion.duration[tr.duration]; L.push(`    /// ${tr.use}`, `    public static let ${k} = Animation.timingCurve(${e.join(', ')}, duration: ${d / 1000})`); }
  }
  L.push('}', '');
  const sh = t.shadow.floating;
  L.push('public extension View {', `    /// ${sh.use}`, '    func yeetFloatingShadow() -> some View {', `        shadow(color: dynamic(UIColor(hex: ${hexA(sh.light.color)}), UIColor(hex: ${hexA(sh.dark.color)})), radius: ${sh.light.blur / 2}, x: ${sh.light.x}, y: ${sh.light.y})`, '    }', '}');
  return L.join('\n') + '\n';
}

/* ─── Kotlin (Jetpack Compose) ────────────────────────────────────────── */

function kotlin() {
  const argb = (v) => { const c = rgba(v); return `Color(0x${Math.round(c.a * 255).toString(16).padStart(2, '0').toUpperCase()}${c.hex})`; };
  const names = Object.keys(colors).map(camel);
  const L = [`// ${HEADER}`, '// Jetpack Compose. Схемы light / dark — выбирать по isSystemInDarkTheme().', '', 'package design.yeet.tokens', '',
    'import androidx.compose.animation.core.CubicBezierEasing', 'import androidx.compose.animation.core.FiniteAnimationSpec', 'import androidx.compose.animation.core.spring', 'import androidx.compose.animation.core.tween',
    'import androidx.compose.ui.graphics.Color', 'import androidx.compose.ui.text.TextStyle', 'import androidx.compose.ui.text.font.FontFamily', 'import androidx.compose.ui.text.font.FontWeight', 'import androidx.compose.ui.unit.dp', 'import androidx.compose.ui.unit.sp', ''];
  L.push('data class YeetColorScheme(');
  for (const [group, entries] of Object.entries(t.color)) { L.push(`    // ${group}`); for (const [k, v] of Object.entries(entries)) L.push(`    /** ${v.role} · Figma ${v.figma} */`, `    val ${camel(k)}: Color,`); }
  L.push(')', '');
  for (const theme of ['light', 'dark']) {
    L.push(`val Yeet${theme === 'light' ? 'Light' : 'Dark'}Colors = YeetColorScheme(`);
    Object.entries(colors).forEach(([k, v], i) => L.push(`    ${names[i]} = ${argb(resolve(v[theme], theme))},`));
    L.push(')', '');
  }
  L.push('/** Цвет вещи — атрибут одежды, не интерфейс. */', 'enum class YeetItemColor(val color: Color, val title: String) {');
  Object.entries(t.item).forEach(([k, v]) => L.push(`    ${k.toUpperCase()}(${argb(v.value)}, "${v.name}"),`));
  L.push('}', '', 'object YeetSpace {');
  for (const s of t.space) L.push(`    val s${s} = ${s}.dp`);
  L.push(`    val screenGutter = ${t.layout['screen-gutter']}.dp`, '}', '', 'object YeetRadius {');
  for (const [k, v] of Object.entries(t.radius)) L.push(`    /** ${v.use} */`, `    val ${k} = ${v.value}.dp`);
  L.push('}', '');
  L.push('/** Передайте семейства из res/font: display — Roboto Slab, text — Inter. */', 'class YeetTypography(display: FontFamily, text: FontFamily) {');
  for (const [k, s] of Object.entries(t.typography))
    L.push(`    /** ${s.use} */`, `    val ${k} = TextStyle(fontFamily = ${s.font}, fontWeight = FontWeight(${s.weight}), fontSize = ${s.size}.sp, lineHeight = ${s.lineHeight}.sp, letterSpacing = (${s.letterSpacing}).sp)`);
  L.push('}', '', 'object YeetMotion {');
  for (const [k, tr] of Object.entries(t.motion.transition)) {
    if (tr.spring) { const s = t.motion.spring[tr.spring]; L.push(`    /** ${tr.use} · Figma Smart Animate ${s.figma} */`, `    fun <T> ${k}(): FiniteAnimationSpec<T> = spring(dampingRatio = ${num(dampingRatio(s))}f, stiffness = ${s.stiffness}f)`); }
    else { const e = t.motion.easing[tr.easing], d = t.motion.duration[tr.duration]; L.push(`    /** ${tr.use} */`, `    fun <T> ${k}(): FiniteAnimationSpec<T> = tween(durationMillis = ${d}, easing = CubicBezierEasing(${e.map((x) => num(x) + 'f').join(', ')}))`); }
  }
  L.push('}', '');
  const sh = t.shadow.floating;
  L.push(`/** ${sh.use}: y ${sh.light.y}, blur ${sh.light.blur}. В Compose — Modifier.shadow(elevation = ${sh.light.blur / 4}.dp, shape, ambientColor / spotColor = цвет ниже). */`, 'object YeetShadow {', `    val floatingLight = ${argb(sh.light.color)}`, `    val floatingDark = ${argb(sh.dark.color)}`, `    val floatingElevation = ${sh.light.blur / 4}.dp`, '}');
  return L.join('\n') + '\n';
}

/* ─── Запись ──────────────────────────────────────────────────────────── */

const out = {
  'src/tokens/tokens.generated.css': css(),
  'tokens/ios/YeetTokens.swift': swift(),
  'tokens/android/YeetTokens.kt': kotlin(),
};
for (const [path, body] of Object.entries(out)) {
  const url = new URL(path, root);
  mkdirSync(new URL('.', url), { recursive: true });
  writeFileSync(url, body);
  console.log(`✓ ${path}`);
}
