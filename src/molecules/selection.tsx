import type { ReactNode } from 'react';
import { Button, ColorDot, Icon, IconButton, type ControlSize } from '../atoms';
import type { IconName } from '../icons/icons';
import type { ItemColor } from '../tokens/tokens';
import { cx } from '../utils/cx';

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

/* ─── ListGroup ─────────────────────────────────────────────────────── */

/**
 * Группа строк на карточке с разделителями — экранные списки (в отличие от `List` внутри sheet).
 * **Контексты:** Настройки (аккаунт, страна и валюта, ссылки), Профиль / Редактирование.
 */
export function ListGroup({ children }: { children: ReactNode }) {
  return <div className="y-list-group">{children}</div>;
}
