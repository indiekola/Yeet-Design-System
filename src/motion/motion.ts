/** Метаданные анимаций: пресеты Figma Smart Animate → токены кода. */
export type Curve = { token: string; figma: string; duration: number; kind: 'bezier' | 'spring'; spring?: { k: number; c: number }; bezier?: [number, number, number, number] };

export const curves: Curve[] = [
  { token: '--ease-out', figma: 'Ease out', duration: 300, kind: 'bezier', bezier: [0, 0, 0.58, 1] },
  { token: '--spring-quick', figma: 'Quick', duration: 744, kind: 'spring', spring: { k: 300, c: 20 } },
  { token: '--spring-bouncy', figma: 'Bouncy', duration: 958, kind: 'spring', spring: { k: 600, c: 15 } },
  { token: '--spring-gentle', figma: 'Gentle', duration: 1022, kind: 'spring', spring: { k: 100, c: 15 } },
];

/** Значение кривой в момент t ∈ [0, 1] (доля длительности). */
export function sample(c: Curve, t: number): number {
  if (c.kind === 'spring' && c.spring) {
    const { k, c: d } = c.spring;
    const w0 = Math.sqrt(k), z = d / (2 * w0), wd = w0 * Math.sqrt(1 - z * z), s = (t * c.duration) / 1000;
    return 1 - Math.exp(-z * w0 * s) * (Math.cos(wd * s) + ((z * w0) / wd) * Math.sin(wd * s));
  }
  const [x1, y1, x2, y2] = c.bezier!;
  // решаем x(u) = t бинарным поиском, возвращаем y(u)
  const bz = (u: number, a: number, b: number) => 3 * (1 - u) ** 2 * u * a + 3 * (1 - u) * u ** 2 * b + u ** 3;
  let lo = 0, hi = 1;
  for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (bz(m, x1, x2) < t) lo = m; else hi = m; }
  return bz((lo + hi) / 2, y1, y2);
}

export type MotionSpec = { name: string; token: string; curve: string; trigger: string; what: string; where: string; figma: string };

export const motions: MotionSpec[] = [
  { name: 'Нажатие', token: '--motion-press', curve: '150 мс · standard', trigger: 'tap', what: 'scale 0.97', where: 'Все кнопки', figma: '—' },
  { name: 'Сворачивание фото', token: '--motion-collapse', curve: '300 мс · ease-out', trigger: 'скролл / drag', what: 'Фото 353 → превью 52 в шапке, панель деталей поднимается', where: 'Детали вещи', figma: 'new things' },
  { name: 'Листание', token: '--motion-page', curve: '300 мс · ease-out', trigger: 'свайп', what: 'Образ уезжает на ширину экрана, чипсы поводов сдвигаются к активному', where: 'Стилист / С чем носить, Поездки', figma: 'Stylist / Trips / List' },
  { name: 'Таб-бар и FAB', token: '--motion-nav', curve: '744 мс · spring quick', trigger: 'смена вкладки', what: 'Таб-бар 353 → 290, кнопка «+» появляется справа', where: 'Гардероб, Вишлист', figma: 'default → things' },
  { name: 'Штамп', token: '--motion-stamp', curve: '958 мс · spring bouncy', trigger: 'tap', what: 'Звезда 148 → 78, поворот −60°, «Надеть» → «×»', where: 'Образы на сегодня, С чем носить', figma: 'dropdown → active button' },
  { name: 'Смена образа', token: '--motion-swap', curve: '1022 мс · spring gentle', trigger: 'свайп вверх', what: 'Текущий коллаж сжимается в превью сверху, следующий вырастает из превью снизу; штамп поворачивается на 180°', where: 'Образы на сегодня', figma: 'scale' },
];
