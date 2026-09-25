import { logoPaths } from '../icons/brand';
import { icons, type IconName } from '../icons/icons';
import { cx } from '../utils/cx';

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

/* ─── Logo ──────────────────────────────────────────────────────────── */

/**
 * Словесный знак yeet. Цвет наследуется: на акцентном фоне (Splash) — `--color-text-on-accent`,
 * в подвале настроек — `--color-text-secondary`.
 */
export function Logo({ height = 32, className }: { height?: number; className?: string }) {
  return (
    <svg className={cx('y-logo', className)} height={height} viewBox="0 14 136 64" fill="currentColor" role="img" aria-label="yeet">
      {logoPaths.map((d) => <path key={d.slice(0, 12)} d={d} />)}
    </svg>
  );
}
