import type { ReactNode } from 'react';
import { ColorDot, Icon } from '../atoms';
import type { IconName } from '../icons/icons';
import type { ItemColor } from '../tokens/tokens';
import { cx } from '../utils/cx';

/* ─── StatTile ──────────────────────────────────────────────────────── */

/** Плитка статистики: Caption grey + число H2. Ставится в `StatRow` по 3. */
export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="y-stat">
      <span className="y-caption y-text--secondary">{label}</span>
      <span className="y-h2 y-text--primary">{value}</span>
    </div>
  );
}
export function StatRow({ children }: { children: ReactNode }) {
  return <div className="y-stat__row">{children}</div>;
}

/* ─── Carousel ──────────────────────────────────────────────────────── */

/**
 * Горизонтальная лента карточек со snap-скроллом. Выходит за поля экрана (bleed), чтобы было видно,
 * что ленту можно листать. **Контексты:** Профиль («Чаще всего надевалось», «Давно не надевалось»),
 * Поездки, выбор вещей по категории при создании образа.
 */
export function Carousel({ title, itemWidth = 173, children }: { title?: string; itemWidth?: number; children: ReactNode }) {
  return (
    <section className="y-carousel" style={{ ['--carousel-item' as string]: `${itemWidth}px` }}>
      {title && <h3 className="y-h3">{title}</h3>}
      <div className="y-carousel__track">{children}</div>
    </section>
  );
}

/* ─── BarChart ──────────────────────────────────────────────────────── */

export type Bar = { value: number; icon?: IconName; color?: ItemColor; label: string };

/**
 * Столбцы-капсулы аналитики профиля: высота пропорциональна значению, сверху — иконка категории
 * или цвет вещи, снизу — число. Максимальный столбец — акцентный уровень `--color-bg-elevated`.
 * **Контексты:** Профиль / Аналитика — категории, цвета, сезоны.
 */
export function BarChart({ bars, height = 200 }: { bars: Bar[]; height?: number }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="y-bar-chart" style={{ height }} role="list">
      {bars.map((b) => (
        <div key={b.label} className="y-bar-chart__bar" role="listitem" aria-label={`${b.label}: ${b.value}`} style={{ height: `${Math.max(34, (b.value / max) * 100)}%` }}>
          <span className="y-bar-chart__cap">{b.icon ? <Icon name={b.icon} size={20} /> : b.color ? <ColorDot color={b.color} size={10} /> : null}</span>
          <span className="y-bar-chart__value">{b.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── UsageMeter ────────────────────────────────────────────────────── */

/** Доля используемого гардероба: число H1 + точечная сетка, закрашенная акцентом. Профиль / Аналитика. */
export function UsageMeter({ percent, label = 'гардероба используется' }: { percent: number; label?: string }) {
  const total = 120;
  const on = Math.round((percent / 100) * total);
  return (
    <div className="y-usage-meter">
      <span className="y-h1">{percent}%</span>
      <span className="y-caption y-text--secondary">{label}</span>
      <div className="y-usage-meter__dots" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cx(i % 30 < Math.ceil(on / 4) && 'is-on')} />
        ))}
      </div>
    </div>
  );
}
