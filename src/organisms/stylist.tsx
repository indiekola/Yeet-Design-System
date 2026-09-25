import { IconButton } from '../atoms';
import { plural } from '../utils/plural';
import { CollageLayer, type CollageItem } from './cards';

/* ─── Stylist & trips ───────────────────────────────────────────────── */

/**
 * Превью образа 138×138 (радиус 20) — несколько вещей на `--card-bg`.
 * **Контексты:** «предыдущий / следующий образ» на экране Образов, списки образов в поездке.
 */
export function OutfitThumbnail({ items, size = 138, onClick }: { items: CollageItem[]; size?: number; onClick?: () => void }) {
  return (
    <button type="button" className="y-outfit-thumb" style={{ width: size, height: size }} onClick={onClick} aria-label="Открыть образ">
      <CollageLayer items={items} defaultSize={size * 0.4} />
    </button>
  );
}

/**
 * Карточка-вход в сценарий стилиста 173×173, радиус 32: подпись снизу, иллюстрация сверху.
 * **Контексты:** Стилист — «Образ дня», «Конструктор», «Для поездки», «Чат со стилистом».
 */
export function StylistPromptCard({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button type="button" className="y-prompt-card" onClick={onClick}>
      <span className="y-body">{label}</span>
    </button>
  );
}

export type TripCardProps =
  | { add: true; label?: string; onClick?: () => void }
  | { add?: false; city: string; items: number; outfits: number; art?: CollageItem[]; onClick?: () => void };

/**
 * Карточка поездки в сетке 2 колонки: город H3, счётчики вещей и образов, вещи снизу.
 * `add` — первая карточка «Собрать новый чемодан» с Primary-кнопкой «+».
 * **Контексты:** Стилист / Поездки.
 */
export function TripCard(props: TripCardProps) {
  if (props.add)
    return (
      <button type="button" className="y-trip-card y-trip-card--add" onClick={props.onClick}>
        <IconButton icon="plus" label="Новая поездка" variant="primary" size="L" tabIndex={-1} />
        <span className="y-body">{props.label ?? 'Собрать новый чемодан'}</span>
      </button>
    );
  return (
    <button type="button" className="y-trip-card" onClick={props.onClick}>
      <span className="y-h3">{props.city}</span>
      <span className="y-caption y-text--secondary">
        {plural(props.items, ['вещь', 'вещи', 'вещей'])}
        <br />
        {plural(props.outfits, ['образ', 'образа', 'образов'])}
      </span>
      {props.art && (
        <span className="y-trip-card__art">
          <CollageLayer items={props.art} defaultSize={64} />
        </span>
      )}
    </button>
  );
}
