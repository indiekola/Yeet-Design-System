import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { StatusBar } from '../organisms';
import { cx } from '../utils/cx';
import './templates.css';

export type ScreenProps = {
  /** Закреплённая шапка (`Header`). Если нет — рисуется статус-бар. */
  header?: ReactNode;
  /** Закреплённый низ: `BottomNav` или `BottomBar`. */
  bottom?: ReactNode;
  /** Модальный слой (`Overlay` со `Sheet` / `Dialog`). */
  overlay?: ReactNode;
  /** Плавающий элемент над низом экрана: `Snackbar`, `Hint`, «Показать ещё». */
  floating?: ReactNode;
  floatingOffset?: number;
  /** Центрировать контент по вертикали (пустые состояния, загрузка). */
  center?: boolean;
  /** Контент без боковых полей (фото на всю ширину, панели). */
  flush?: boolean;
  children?: ReactNode;
};

/**
 * Шаблон экрана iPhone 393×852.
 *
 * Правило скролла: шапка и низ **закреплены**, контент скроллится между ними и **уходит под них**.
 * Полосы затухания появляются, только когда под краем действительно есть контент:
 * верхняя — после начала скролла, нижняя — пока список не докручен до конца.
 */
export function Screen({ header, bottom, overlay, floating, floatingOffset = 132, center, flush, children }: ScreenProps) {
  const ref = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ top: el.scrollTop > 1, bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1 });
  }, []);
  useEffect(() => {
    update();
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  return (
    <div className="y-screen" data-edge-top={edges.top || undefined} data-edge-bottom={edges.bottom || undefined}>
      {header ?? <StatusBar />}
      <main ref={ref} onScroll={update} className={cx('y-screen__content', center && 'y-screen__content--center', flush && 'y-screen__content--flush')}>
        {children}
      </main>
      {bottom}
      {floating && (
        <div className="y-screen__floating" style={{ bottom: floatingOffset }}>
          {floating}
        </div>
      )}
      {overlay}
    </div>
  );
}
