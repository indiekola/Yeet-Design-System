import type { InputHTMLAttributes, ReactNode } from 'react';
import { Button, ColorDot, Icon, IconButton, type ButtonStyle, type ControlSize } from '../atoms';
import type { IconName } from '../icons/icons';
import type { ItemColor } from '../tokens/tokens';
import { cx } from '../utils/cx';
import './molecules.css';

/* ─── Field ─────────────────────────────────────────────────────────── */

export type FieldProps = {
  /** Лейбл слева (grey). В режиме ввода — плейсхолдер. */
  label: string;
  /** Выбранное значение справа (режим «ключ — значение»). */
  value?: string;
  /** Свотч цвета вещи перед значением. */
  colorDot?: ItemColor;
  /** Иконка справа: `chevron-up-down` — выбор, `eye` — пароль, `external-link` — ссылка. */
  trailingIcon?: IconName;
  onTrailingClick?: () => void;
  /** Поле ввода вместо статичного лейбла. */
  input?: InputHTMLAttributes<HTMLInputElement>;
  error?: boolean;
  onClick?: () => void;
};

/**
 * Строка поля (Figma: `input` + `input-value`). Живёт внутри `InputGroup`.
 * Три паттерна: ввод текста, «ключ — значение» с выбором в sheet, пароль с глазом.
 */
export function Field({ label, value, colorDot, trailingIcon, onTrailingClick, input, error, onClick }: FieldProps) {
  return (
    <div className={cx('y-field', error && 'y-field--error')} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className="y-field__main">
        {input ? (
          <input className="y-field__input" placeholder={label} aria-label={label} aria-invalid={error || undefined} {...input} />
        ) : (
          <span className="y-field__label">{label}</span>
        )}
        {value && (
          <span className="y-field__value">
            {colorDot && <ColorDot color={colorDot} />}
            {value}
          </span>
        )}
      </div>
      {trailingIcon && (
        <button type="button" className="y-field__trailing" onClick={onTrailingClick} tabIndex={onTrailingClick ? 0 : -1} aria-hidden={!onTrailingClick}>
          <Icon name={trailingIcon} />
        </button>
      )}
    </div>
  );
}

/* ─── InputGroup ────────────────────────────────────────────────────── */

/** Группа полей на `--input-bg`, радиус 20, строки разделены линией. Вход, детали вещи, настройки. */
export function InputGroup({ size = 'XL', children }: { size?: 'M' | 'L' | 'XL'; children: ReactNode }) {
  return <div className={cx('y-input-group', `y-input-group--${size}`)}>{children}</div>;
}

/* ─── InputBar ──────────────────────────────────────────────────────── */

type BarAction = { icon: IconName; label: string; variant?: ButtonStyle; onClick?: () => void };

export type InputBarProps = {
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  /** Иконка внутри поля. Для поиска — `search`, для чата — нет. */
  fieldIcon?: IconName;
  leading?: BarAction;
  trailing?: BarAction;
};

/**
 * Панель ввода: [кнопка] поле [кнопка].
 * **Контексты:** поиск («Назад» + поле + поиск по фото), чат со стилистом (поле + «Отправить» Primary), поиск по гардеробу.
 */
export function InputBar({ placeholder, value, onChange, fieldIcon, leading, trailing }: InputBarProps) {
  return (
    <div className="y-input-bar">
      {leading && <IconButton icon={leading.icon} label={leading.label} variant={leading.variant ?? 'tertiary'} onClick={leading.onClick} />}
      <label className="y-input-bar__field">
        {fieldIcon && <Icon name={fieldIcon} />}
        <input className="y-field__input" placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} readOnly={!onChange} />
      </label>
      {trailing && <IconButton icon={trailing.icon} label={trailing.label} variant={trailing.variant ?? 'tertiary'} onClick={trailing.onClick} />}
    </div>
  );
}

/* ─── SegmentControl ────────────────────────────────────────────────── */

export type Segment = { value: string; label?: string; icon?: IconName };

/**
 * Переключатель вкладок: активный сегмент — `inverse`, остальные — `ghost`.
 * **Контексты:** «Вещи / Образы / Вишлист» в Гардеробе, «Образы · 1 / Вещи» в поездке, режимы создания образа (иконки).
 */
export function SegmentControl({ segments, value, onChange, size = 'L' }: { segments: Segment[]; value: string; onChange?: (v: string) => void; size?: ControlSize }) {
  return (
    <div className="y-segment" role="tablist">
      {segments.map((s) => {
        const active = s.value === value;
        const common = { key: s.value, role: 'tab', 'aria-selected': active, onClick: () => onChange?.(s.value) } as const;
        const inner = size === 'XL' ? 'L' : size === 'L' ? 'M' : size === 'M' ? 'S' : 'S';
        return s.icon && !s.label ? (
          <IconButton {...common} icon={s.icon} label={s.value} size={inner} variant={active ? 'inverse' : 'ghost'} />
        ) : (
          <Button {...common} size={inner} variant={active ? 'inverse' : 'ghost'} leftIcon={s.icon}>
            {s.label}
          </Button>
        );
      })}
    </div>
  );
}

/* ─── ChipGroup ─────────────────────────────────────────────────────── */

export type Chip = { label: string; selected?: boolean; removable?: boolean; colorDot?: ItemColor; dropdown?: boolean };

/**
 * Группа чипсов на базе `Button S`: не выбран — `tertiary`, выбран — `soft`.
 * `wrap` — перенос строк (теги, цвета), иначе горизонтальный скролл (фильтры, поводы).
 */
export function ChipGroup({ chips, onToggle, onAdd, wrap = false }: { chips: Chip[]; onToggle?: (label: string) => void; onAdd?: () => void; wrap?: boolean }) {
  return (
    <div className={cx('y-chip-group', wrap ? 'y-chip-group--wrap' : 'y-chip-group--scroll')}>
      {onAdd && <IconButton icon="plus" label="Добавить" variant="primary" size="S" onClick={onAdd} />}
      {chips.map((c) => (
        <Button
          key={c.label}
          size="S"
          variant={c.selected ? 'soft' : 'tertiary'}
          rightIcon={c.removable ? 'cross' : c.dropdown ? 'chevron-up-down' : undefined}
          aria-pressed={c.selected}
          onClick={() => onToggle?.(c.label)}
        >
          {c.colorDot && <ColorDot color={c.colorDot} />}
          {c.label}
        </Button>
      ))}
    </div>
  );
}

/* ─── ListItem ──────────────────────────────────────────────────────── */

export type ListItemProps = {
  type?: 'action' | 'expandable' | 'radio';
  label: string;
  icon?: IconName;
  /** expandable: раскрыта ли строка */
  expanded?: boolean;
  /** radio: выбрана ли строка */
  checked?: boolean;
  /** Элемент справа: флаг страны, счётчик. */
  trailing?: ReactNode;
  onClick?: () => void;
};

/**
 * Строка списка в sheet, высота 24, gap 12.
 * **action** — действие с вещью (создать образ, редактировать, удалить), **expandable** — категории одежды,
 * **radio** — одиночный выбор (год рождения, страна, пол).
 */
export function ListItem({ type = 'action', label, icon, expanded, checked, trailing, onClick }: ListItemProps) {
  return (
    <button
      type="button"
      className="y-list-item"
      onClick={onClick}
      role={type === 'radio' ? 'radio' : undefined}
      aria-checked={type === 'radio' ? !!checked : undefined}
      aria-expanded={type === 'expandable' ? !!expanded : undefined}
    >
      {type === 'radio' ? <span className={cx('y-radio', checked && 'y-radio--on')} /> : icon && <Icon name={icon} />}
      <span className="y-list-item__label">{label}</span>
      {type === 'expandable' ? <Icon name={expanded ? 'chevron-up' : 'chevron-down'} /> : trailing}
    </button>
  );
}

/** Вертикальный список строк с gap 20. */
export function List({ children }: { children: ReactNode }) {
  return <div className="y-list">{children}</div>;
}

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

/* ─── Hint ──────────────────────────────────────────────────────────── */

/** Подсказка поверх холста или фото: пилюля `elevated` с тенью. */
export function Hint({ icon = 'fingers-pinch', children }: { icon?: IconName; children: ReactNode }) {
  return (
    <span className="y-hint" role="note">
      <Icon name={icon} size={16} />
      {children}
    </span>
  );
}

/* ─── Snackbar ──────────────────────────────────────────────────────── */

/** Тост-подтверждение над нижней навигацией. Инвертированный фон, исчезает сам. */
export function Snackbar({ children, onClose }: { children: ReactNode; onClose?: () => void }) {
  return (
    <div className="y-snackbar" role="status">
      <span>{children}</span>
      {onClose && (
        <button type="button" aria-label="Закрыть" onClick={onClose}>
          <Icon name="cross" />
        </button>
      )}
    </div>
  );
}

/* ─── EmptyState ────────────────────────────────────────────────────── */

/** Пустое состояние и «ничего не найдено». Ставится по центру свободной области экрана. */
export function EmptyState({ title, description, action }: { title: string; description: string; action?: { label: string; onClick?: () => void } }) {
  return (
    <div className="y-empty">
      <h2 className="y-h2 y-text--primary">{title}</h2>
      <p className="y-body y-text--secondary">{description}</p>
      {action && (
        <Button variant="tertiary" size="M" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/* ─── LoadingState ──────────────────────────────────────────────────── */

/** Загрузка внутри области: крутящаяся `spin` + подпись. */
export function LoadingState({ label }: { label: string }) {
  return (
    <span className="y-loading" role="status" aria-live="polite">
      <Icon name="spin" />
      {label}
    </span>
  );
}

/* ─── PhotoTile ─────────────────────────────────────────────────────── */

/** Плитка выбора источника фото в Photo sheet. */
export function PhotoTile({ source, label, onClick }: { source: 'gallery' | 'camera'; label?: string; onClick?: () => void }) {
  return (
    <button type="button" className="y-photo-tile" onClick={onClick}>
      <span className="y-photo-tile__art">
        <Icon name={source === 'camera' ? 'camera' : 'collage'} />
      </span>
      {label ?? (source === 'camera' ? 'Сделать фото' : 'Выбрать из галереи')}
    </button>
  );
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

/* ─── ListGroup ─────────────────────────────────────────────────────── */

/**
 * Группа строк на карточке с разделителями — экранные списки (в отличие от `List` внутри sheet).
 * **Контексты:** Настройки (аккаунт, страна и валюта, ссылки), Профиль / Редактирование.
 */
export function ListGroup({ children }: { children: ReactNode }) {
  return <div className="y-list-group">{children}</div>;
}
