import type { ButtonHTMLAttributes, CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { icons, type IconName } from '../icons/icons';
import type { ItemColor } from '../tokens/tokens';
import { cx } from '../utils/cx';
import './atoms.css';

/* ─── Icon ──────────────────────────────────────────────────────────── */

export type IconProps = { name: IconName; size?: number; className?: string; title?: string; strokeWidth?: number };

/** Линейная иконка 24×24 из набора ui-icons. Цвет наследуется (`currentColor`). */
export function Icon({ name, size = 24, className, title, strokeWidth = 1.3 }: IconProps) {
  return (
    <svg
      className={cx('y-icon', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}

/* ─── Button ────────────────────────────────────────────────────────── */

export type ButtonStyle = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'ghost' | 'soft' | 'destructive';
export type ControlSize = 'S' | 'M' | 'L' | 'XL';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Семантический стиль. Один `primary` на экран; удаление — всегда `destructive`. */
  variant?: ButtonStyle;
  size?: ControlSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
  /** Растянуть на ширину контейнера (CTA, пара кнопок в sheet). */
  fullWidth?: boolean;
  /** Плавающая кнопка поверх контента — тень `--shadow-floating`. */
  floating?: boolean;
};

/**
 * Кнопка-капсула с текстом.
 *
 * **Контексты во флоу:** главный CTA онбординга и входа (Primary XL), пара действий в sheet (Tertiary + Primary L),
 * фильтры-дропдауны (Tertiary / Soft S + `chevron-up-down`), теги (Tertiary S + `cross`), «Пропустить» (Ghost M).
 */
export function Button({ variant = 'primary', size = 'L', leftIcon, rightIcon, fullWidth, floating, className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx('y-button', `y-button--${size}`, `y-style--${variant}`, fullWidth && 'y-button--full', floating && 'y-button--floating', className)}
      {...rest}
    >
      {leftIcon && <Icon name={leftIcon} />}
      {children}
      {rightIcon && <Icon name={rightIcon} />}
    </button>
  );
}

/* ─── IconButton ────────────────────────────────────────────────────── */

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: IconName;
  /** Обязательное описание действия для скринридеров: «Назад», «Ещё», «Добавить». */
  label: string;
  variant?: ButtonStyle;
  size?: ControlSize;
  floating?: boolean;
};

/**
 * Круглая кнопка с иконкой. Те же стили и размеры, что у `Button`.
 *
 * **Контексты во флоу:** «Назад» и «Ещё» в шапке (Tertiary M), FAB «+» (Primary XL, floating),
 * «Отправить» в чате (Primary M), поделиться (Secondary XL), фильтры гардероба (Tertiary S).
 */
export function IconButton({ icon, label, variant = 'tertiary', size = 'M', floating, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx('y-icon-button', `y-icon-button--${size}`, `y-style--${variant}`, floating && 'y-icon-button--floating', className)}
      {...rest}
    >
      <Icon name={icon} size={size === 'S' ? 20 : 24} />
    </button>
  );
}

/* ─── Badge ─────────────────────────────────────────────────────────── */

export type BadgeProps = { variant?: 'primary' | 'danger' | 'secondary' | 'muted' | 'tertiary' | 'ghost'; children: ReactNode; className?: string };

/** Бейдж высотой 24. Скидка на товаре — `danger`, счётчик — `secondary`. */
export function Badge({ variant = 'primary', children, className }: BadgeProps) {
  return <span className={cx('y-badge', `y-badge--${variant}`, className)}>{children}</span>;
}

/* ─── Avatar ────────────────────────────────────────────────────────── */

export type AvatarProps = { size?: 'S' | 'M' | 'L'; initial?: string; src?: string; alt?: string };

/** Аватар: L 96 (профиль), M 40 (настройки, чат), S 24 (таб-бар). Без фото — буква или иконка камеры. */
export function Avatar({ size = 'M', initial, src, alt = '' }: AvatarProps) {
  return (
    <span className={cx('y-avatar', `y-avatar--${size}`, !src && initial && 'y-avatar--initial')}>
      {src ? <img src={src} alt={alt} /> : initial ? initial : <Icon name="camera" size={size === 'S' ? 14 : 24} />}
    </span>
  );
}

/* ─── Divider ───────────────────────────────────────────────────────── */

/** Разделитель 1px `--color-border-subtle`. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cx('y-divider', className)} />;
}

/* ─── ColorDot ──────────────────────────────────────────────────────── */

/** Свотч цвета вещи. Только для атрибута «цвет вещи», не для интерфейса. */
export function ColorDot({ color, size = 12 }: { color: ItemColor; size?: number }) {
  return <span className="y-color-dot" style={{ width: size, height: size, background: `var(--yeet-item-${color})` }} />;
}

/* ─── ScrollEdge ────────────────────────────────────────────────────── */

/**
 * Полоса затухания: контент уходит под закреплённую шапку / нижнюю навигацию и плавно гаснет.
 * Уже встроена в `Header`, `BottomNav`, `BottomBar` — отдельно нужна редко.
 */
export function ScrollEdge({ position, size = 24, offset = 0 }: { position: 'top' | 'bottom'; size?: number; offset?: number }) {
  const style: CSSProperties = { height: size, [position === 'top' ? 'bottom' : 'top']: -size + offset };
  return <span aria-hidden className={cx('y-scroll-edge', `y-scroll-edge--${position}`)} style={style} />;
}

/* ─── Text ──────────────────────────────────────────────────────────── */

export type TextProps = HTMLAttributes<HTMLElement> & {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  tone?: 'primary' | 'secondary' | 'accent' | 'danger';
  as?: ElementType;
};

const defaultTag = { h1: 'h1', h2: 'h2', h3: 'h3', body: 'p', caption: 'span' } as const;

/** Текст в одном из 5 стилей. Заголовки — Roboto Slab, остальное — Inter. */
export function Text({ variant = 'body', tone = 'primary', as, className, ...rest }: TextProps) {
  const Tag = (as ?? defaultTag[variant]) as ElementType;
  return <Tag className={cx(`y-${variant}`, `y-text--${tone}`, className)} {...rest} />;
}
