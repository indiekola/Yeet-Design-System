import type { ReactNode } from 'react';
import { Badge, ColorDot, Icon, IconButton } from '../atoms';
import type { ItemColor } from '../tokens/tokens';
import { cx } from '../utils/cx';

/* ─── Cards ─────────────────────────────────────────────────────────── */

export type Garment = 'top' | 'bottom' | 'outerwear' | 'shoe' | 'accessories' | 'container';

/** Иллюстрация вещи для Storybook. В приложении здесь фото вещи без фона. */
export function ItemArt({ kind, color, size = 88 }: { kind: Garment; color?: ItemColor; size?: number }) {
  return (
    <span className="y-item-art" style={{ width: size, height: size }}>
      <Icon name={kind} size={size} strokeWidth={Math.max(0.35, (1.3 * 24) / size)} />
      {color && (
        <span className="y-item-art__dot">
          <ColorDot color={color} size={Math.max(10, size / 7)} />
        </span>
      )}
    </span>
  );
}

/**
 * Карточка вещи 173×172 в сетке 2 колонки. Фото без фона на `--card-bg`.
 * **Контексты:** Гардероб (сетка), результаты поиска (`discount`), создание образа (`selected`).
 */
export function ItemCard({ kind, color, discount, label, selected, onClick }: { kind: Garment; color?: ItemColor; discount?: string; /** Метка-счётчик: «30 раз», «20 дней» (Профиль). */ label?: string; selected?: boolean; onClick?: () => void }) {
  return (
    <button type="button" className={cx('y-item-card', selected && 'y-item-card--selected')} onClick={onClick} aria-pressed={selected}>
      <ItemArt kind={kind} color={color} />
      {discount && <Badge variant="danger" className="y-item-card__badge">{discount}</Badge>}
      {label && !discount && <Badge variant="secondary" className="y-item-card__badge">{label}</Badge>}
      {selected !== undefined && <span className="y-item-card__check">{selected ? <Icon name="check" /> : null}</span>}
    </button>
  );
}

/** Карточка товара в поиске: фото + название, цена, магазин. */
export function ProductCard({ kind, name, price, discount, liked }: { kind: Garment; name: string; price: string; discount?: string; liked?: boolean }) {
  return (
    <article className="y-product-card">
      <div style={{ position: 'relative' }}>
        <ItemCard kind={kind} discount={discount} />
        <span style={{ position: 'absolute', top: 8, right: 8, color: liked ? 'var(--color-accent)' : undefined }}>
          <Icon name="heart" />
        </span>
      </div>
      <div className="y-product-card__meta">
        <span className="y-caption y-text--secondary">{name}</span>
        <span className="y-body">{price}</span>
      </div>
    </article>
  );
}

/** Коллаж образа 353×353: точечный фон, вещи раскладываются свободно (x, y в %). */
export type CollageItem = { kind: Garment; x: number; y: number; size?: number; color?: ItemColor };

/** Вещи, свободно разложенные по площадке (x, y — центр в %). Общий слой коллажа, превью образа и карточки поездки. */
export function CollageLayer({ items, defaultSize = 96 }: { items: CollageItem[]; defaultSize?: number }) {
  return (
    <>
      {items.map((it, i) => (
        <span key={i} className="y-collage__item" style={{ left: `${it.x}%`, top: `${it.y}%` }}>
          <ItemArt kind={it.kind} color={it.color} size={it.size ?? defaultSize} />
        </span>
      ))}
    </>
  );
}

export function OutfitCollage({ items, label, footer }: { items: CollageItem[]; /** Повод: «Прогулка», «Ужин». */ label?: string; /** Панель снизу: цена образа, переход. */ footer?: ReactNode }) {
  return (
    <div className="y-collage">
      {label && <Badge variant="secondary" className="y-collage__label">{label}</Badge>}
      {footer && <div className="y-collage__footer">{footer}</div>}
      <CollageLayer items={items} />
    </div>
  );
}

/** Область фото 353×353. Пусто — «Добавить фотографию»; с фото — вещь и кнопка удаления. */
export function PhotoArea({ kind, loading, onAdd, onRemove, children }: { kind?: Garment; loading?: boolean; onAdd?: () => void; onRemove?: () => void; children?: ReactNode }) {
  return (
    <div className="y-photo-area">
      {children ??
        (kind ? (
          <>
            <ItemArt kind={kind} size={160} />
            {onRemove && <IconButton className="y-photo-area__close" icon="cross" label="Удалить фото" variant="ghost" size="S" onClick={onRemove} />}
          </>
        ) : (
          <button type="button" className="y-photo-area__add" onClick={onAdd} disabled={loading}>
            <IconButton icon="camera" label="Добавить фотографию" variant="primary" size="L" tabIndex={-1} />
            Добавить фотографию
          </button>
        ))}
    </div>
  );
}

/** Карточка погоды на экране «Сегодня»: температура + описание. Плавающая, инвертированная. */
export function WeatherCard({ temp, description }: { temp: string; description: string }) {
  return (
    <div className="y-weather">
      <span className="y-weather__temp">☀︎ {temp}</span>
      <span className="y-caption">{description}</span>
    </div>
  );
}

/** Сообщение в чате со стилистом. `own` — сообщение пользователя. */
export function ChatBubble({ own, children }: { own?: boolean; children: ReactNode }) {
  return <div className={cx('y-bubble', 'y-body', own && 'y-bubble--own')}>{children}</div>;
}
