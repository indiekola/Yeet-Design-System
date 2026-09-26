import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Резиновые коллажи: размеры вещей заданы в единицах макета (ширина `base`, для коллажа 353),
 * на экране они умножаются на ширина контейнера / base. На макетной ширине множитель ровно 1.
 * В нативе то же: size × (ширина холста / 353).
 */
export function useFitScale(ref: RefObject<HTMLElement | null>, base: number) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => { const w = el.getBoundingClientRect().width; if (w) setScale(Math.round((w / base) * 1000) / 1000); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, base]);
  return scale;
}
