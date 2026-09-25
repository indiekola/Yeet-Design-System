import type { ReactNode } from 'react';
import { Button, type ButtonStyle } from '../atoms';
import { cx } from '../utils/cx';

/* ─── Sheet & Dialog ────────────────────────────────────────────────── */

type FooterAction = { label: string; variant?: ButtonStyle; onClick?: () => void };

export type SheetProps = {
  title?: string;
  /** `modal` — поверх overlay; `panel` — постоянная панель деталей поверх фото, с тенью. */
  type?: 'modal' | 'panel';
  footer?: [FooterAction, FooterAction];
  children?: ReactNode;
};

/**
 * Bottom sheet — основа всех выборов, действий и фильтров. Всё временное открывается sheet'ом, а не новым экраном.
 * Контент: `ListItem` (действия, радио, категории), `ChipGroup` (фильтры), `PhotoTile` (фото), `InputBar` (поиск).
 */
export function Sheet({ title, type = 'modal', footer, children }: SheetProps) {
  return (
    <section className={cx('y-sheet', type === 'panel' && 'y-sheet--panel')} role={type === 'modal' ? 'dialog' : undefined} aria-label={title}>
      <span className="y-sheet__handle" aria-hidden />
      {title && <h3 className="y-h3">{title}</h3>}
      {children}
      {footer && (
        <div className="y-sheet__footer">
          {footer.map((a, i) => (
            <Button key={a.label} variant={a.variant ?? (i === 0 ? 'tertiary' : 'primary')} size="L" onClick={a.onClick}>
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}

export type DialogProps = {
  tone?: 'default' | 'destructive';
  title: string;
  description?: ReactNode;
  cancel: string;
  confirm: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
};

/**
 * Подтверждение снизу экрана. **Безопасное действие всегда синее, опасное — всегда красное.**
 * `default`: Tertiary + Primary («Выйти / Сохранить и выйти»). `destructive`: Destructive + Primary («Удалить / Отмена»).
 */
export function Dialog({ tone = 'default', title, description, cancel, confirm, onCancel, onConfirm, children }: DialogProps) {
  return (
    <section className="y-sheet" role="alertdialog" aria-label={title}>
      <span className="y-sheet__handle" aria-hidden />
      <div className="y-dialog__text">
        <h3 className="y-h3">{title}</h3>
        {description && <p className="y-body y-text--secondary">{description}</p>}
      </div>
      {children}
      <div className="y-sheet__footer">
        <Button variant={tone === 'destructive' ? 'destructive' : 'tertiary'} size="L" onClick={tone === 'destructive' ? onConfirm : onCancel}>
          {tone === 'destructive' ? confirm : cancel}
        </Button>
        <Button variant="primary" size="L" onClick={tone === 'destructive' ? onCancel : onConfirm}>
          {tone === 'destructive' ? cancel : confirm}
        </Button>
      </div>
    </section>
  );
}

/** Модальный слой: затемнение `--color-bg-overlay` и прижатый к низу sheet / dialog. */
export function Overlay({ children }: { children: ReactNode }) {
  return <div className="y-overlay">{children}</div>;
}
