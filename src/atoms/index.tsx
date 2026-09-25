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

/* ─── Logo ──────────────────────────────────────────────────────────── */

/**
 * Словесный знак yeet. Цвет наследуется: на акцентном фоне (Splash) — `--color-text-on-accent`,
 * в подвале настроек — `--color-text-secondary`.
 */
export function Logo({ height = 32, className }: { height?: number; className?: string }) {
  return (
    <svg className={cx('y-logo', className)} height={height} viewBox="0 14 136 64" fill="currentColor" role="img" aria-label="yeet">
      <path d="M130.62 52.82C132.21 53 133 53.8 133 55.2C133 55.98 132.71 56.77 132.12 57.59C131.57 58.36 130.74 59.02 129.6 59.57C128.51 60.07 127.2 60.32 125.66 60.32C122.76 60.32 120.47 59.43 118.8 57.66C117.16 55.89 116.35 53.36 116.35 50.09V29.98H112.68C111.77 29.98 111.07 29.75 110.57 29.3C110.12 28.84 109.89 28.27 109.89 27.59C109.89 26.91 110.12 26.34 110.57 25.89C111.25 26.11 112.14 26.23 113.22 26.23H116.35V18.39C116.35 17.66 116.62 17.09 117.16 16.68C117.71 16.23 118.46 16 119.41 16H120.43V26.23H127.29C128.06 26.23 128.63 26.45 128.99 26.91C129.4 27.32 129.6 27.89 129.6 28.61C129.6 29.07 129.49 29.52 129.26 29.98H120.43V50.09C120.43 52.18 120.9 53.8 121.85 54.93C122.85 56.02 124.12 56.57 125.66 56.57C127.06 56.57 128.2 56.2 129.06 55.48C129.92 54.75 130.44 53.86 130.62 52.82Z" />
      <path d="M107.79 42.25C107.79 43.2 107.68 44.11 107.45 44.98L79.86 44.77C80.31 48.45 81.81 51.34 84.34 53.43C86.88 55.52 89.96 56.57 93.59 56.57C96.13 56.57 98.35 56.02 100.25 54.93C102.15 53.84 103.62 52.45 104.67 50.77C105.3 50.77 105.82 50.95 106.23 51.32C106.64 51.64 106.84 52.02 106.84 52.48C106.84 53.57 106.3 54.73 105.21 55.95C104.12 57.18 102.54 58.23 100.45 59.09C98.41 59.91 96.03 60.32 93.32 60.32C89.87 60.32 86.81 59.57 84.14 58.07C81.51 56.57 79.47 54.52 78.02 51.93C76.57 49.29 75.85 46.41 75.85 43.27C75.85 39.77 76.57 36.68 78.02 34C79.47 31.32 81.47 29.25 84 27.79C86.54 26.29 89.37 25.54 92.5 25.54C95.58 25.54 98.28 26.27 100.59 27.73C102.9 29.14 104.67 31.11 105.89 33.66C107.16 36.16 107.79 39.02 107.79 42.25ZM92.16 29.29C90.12 29.29 88.2 29.79 86.38 30.79C84.62 31.75 83.12 33.11 81.9 34.89C80.72 36.66 80.02 38.73 79.79 41.09L103.99 40.95C103.81 37.5 102.67 34.7 100.59 32.57C98.5 30.39 95.69 29.29 92.16 29.29Z" />
      <path d="M71.4 42.25C71.4 43.2 71.28 44.11 71.06 44.98L43.46 44.77C43.92 48.45 45.41 51.34 47.95 53.43C50.49 55.52 53.57 56.57 57.19 56.57C59.73 56.57 61.95 56.02 63.85 54.93C65.75 53.84 67.23 52.45 68.27 50.77C68.9 50.77 69.42 50.95 69.83 51.32C70.24 51.64 70.44 52.02 70.44 52.48C70.44 53.57 69.9 54.73 68.81 55.95C67.73 57.18 66.14 58.23 64.06 59.09C62.02 59.91 59.64 60.32 56.92 60.32C53.48 60.32 50.42 59.57 47.74 58.07C45.12 56.57 43.08 54.52 41.63 51.93C40.18 49.29 39.45 46.41 39.45 43.27C39.45 39.77 40.18 36.68 41.63 34C43.08 31.32 45.07 29.25 47.61 27.79C50.15 26.29 52.98 25.54 56.1 25.54C59.18 25.54 61.88 26.27 64.19 27.73C66.5 29.14 68.27 31.11 69.49 33.66C70.76 36.16 71.4 39.02 71.4 42.25ZM55.76 29.29C53.72 29.29 51.8 29.79 49.99 30.79C48.22 31.75 46.72 33.11 45.5 34.89C44.32 36.66 43.62 38.73 43.39 41.09L67.59 40.95C67.41 37.5 66.28 34.7 64.19 32.57C62.11 30.39 59.3 29.29 55.76 29.29Z" />
      <path d="M36.37 25.89C37.68 25.89 38.34 26.34 38.34 27.25C38.34 27.7 38.23 28.16 38 28.61C36.73 28.89 35.8 29.27 35.22 29.77C34.67 30.23 34.2 30.98 33.79 32.02L20.06 67.82C18.93 70.82 17.73 72.93 16.46 74.16C15.23 75.39 13.49 76 11.22 76C9.68 76 8.37 75.57 7.28 74.7C6.24 73.84 5.72 72.8 5.72 71.57C5.72 70.07 6.4 68.93 7.76 68.16C8.07 69.07 8.55 69.8 9.18 70.34C9.86 70.93 10.66 71.23 11.56 71.23C12.61 71.23 13.47 70.89 14.15 70.2C14.87 69.57 15.62 68.32 16.39 66.45L18.9 60.18L6.47 29.64C5.29 29.41 4.4 29.11 3.82 28.75C3.27 28.39 3 27.89 3 27.25C3 26.7 3.16 26.25 3.48 25.89C5.15 26.11 6.69 26.23 8.1 26.23C9.32 26.23 10.41 26.16 11.36 26.02C12.54 25.93 13.4 25.89 13.94 25.89C15.26 25.89 15.91 26.34 15.91 27.25C15.91 27.7 15.8 28.16 15.57 28.61C12.9 28.98 11.56 29.8 11.56 31.07C11.56 31.34 11.63 31.66 11.77 32.02L20.94 54.86H21.28L30.73 29.64C29.19 29.45 28.03 29.18 27.26 28.82C26.49 28.45 26.11 27.93 26.11 27.25C26.11 26.7 26.27 26.25 26.58 25.89C28.26 26.11 29.8 26.23 31.21 26.23C31.7 26.23 32.84 26.16 34.6 26.02C35.51 25.93 36.1 25.89 36.37 25.89Z" />
    </svg>
  );
}
