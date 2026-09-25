import type { ReactNode } from 'react';
import { Badge, Button, ColorDot, Icon, IconButton, ScrollEdge, type ButtonStyle } from '../atoms';
import type { IconName } from '../icons/icons';
import { ChipGroup, InputBar, type Chip } from '../molecules';
import type { ItemColor } from '../tokens/tokens';
import { cx } from '../utils/cx';
import './organisms.css';

/* ─── StatusBar (system) ────────────────────────────────────────────── */

/** Статус-бар iOS — только для макетов и Storybook. */
export function StatusBar() {
  return (
    <div className="y-status-bar" aria-hidden>
      <span>9:41</span>
      <span className="y-status-bar__icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.9 5.7 2.3l1.1-1.1A9.6 9.6 0 0 0 8 1C5.4 1 3 2 1.2 3.8l1.1 1.1A8 8 0 0 1 8 2.6Zm0 3.2c1.3 0 2.5.5 3.4 1.4l1.1-1.1A6.4 6.4 0 0 0 8 4.2 6.4 6.4 0 0 0 3.5 6.1l1.1 1.1c.9-.9 2.1-1.4 3.4-1.4Zm0 3.2c.5 0 .9.2 1.2.5L8 10.7 6.8 9.5c.3-.3.7-.5 1.2-.5Z" /></svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".35" /><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" /><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".4" /></svg>
      </span>
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────── */

type Action = { icon: IconName; label: string; onClick?: () => void };

export type HeaderProps =
  | { type: 'large'; title: string; subtitle?: string; action?: Action }
  | { type: 'bar'; titleChip?: string; onBack?: () => void; actions?: Action[] }
  | { type: 'back'; title: string; onBack?: () => void; textAction?: { label: string; onClick?: () => void } }
  | { type: 'search'; query?: string; placeholder?: string; onBack?: () => void; onQueryChange?: (v: string) => void; filters?: Chip[] };

/**
 * Закреплённая шапка экрана со статус-баром. Сплошная подложка + полоса затухания снизу:
 * контент скроллится под шапку и плавно гаснет.
 *
 * | type | Где |
 * |---|---|
 * | `large` | Корневые вкладки: Гардероб, Стилист, Профиль, Поиск |
 * | `bar` | Новая вещь, Архив, Корзина, детали вещи и образа, создание образа |
 * | `back` | Вход, восстановление пароля, онбординг |
 * | `search` | Поиск, результаты, поиск по гардеробу |
 */
export function Header(props: HeaderProps) {
  return (
    <header className="y-header">
      <StatusBar />
      <div className="y-header__body">
        {props.type === 'large' && (
          <>
            <div className="y-header__title-row">
              <h1 className="y-h1">{props.title}</h1>
              {props.action && <IconButton icon={props.action.icon} label={props.action.label} onClick={props.action.onClick} />}
            </div>
            {props.subtitle && <p className="y-body y-text--secondary">{props.subtitle}</p>}
          </>
        )}
        {props.type === 'bar' && (
          <div className="y-header__row y-header__row--bar">
            <div className="y-header__side">
              <IconButton icon="chevron-left" label="Назад" onClick={props.onBack} />
            </div>
            <div className="y-header__center">{props.titleChip && <Button variant="tertiary" size="M" tabIndex={-1}>{props.titleChip}</Button>}</div>
            <div className="y-header__side y-header__side--end">
              {props.actions?.map((a) => <IconButton key={a.label} icon={a.icon} label={a.label} onClick={a.onClick} />)}
            </div>
          </div>
        )}
        {props.type === 'back' && (
          <>
            <div className="y-header__row">
              <IconButton icon="chevron-left" label="Назад" onClick={props.onBack} />
              {props.textAction && (
                <Button variant="ghost" size="M" onClick={props.textAction.onClick}>
                  {props.textAction.label}
                </Button>
              )}
            </div>
            <h1 className="y-h1 y-header__back-title">{props.title}</h1>
          </>
        )}
        {props.type === 'search' && (
          <>
            <InputBar
              placeholder={props.placeholder ?? 'Уточните текстом'}
              value={props.query}
              onChange={props.onQueryChange}
              fieldIcon="search"
              leading={{ icon: 'chevron-left', label: 'Назад', onClick: props.onBack }}
              trailing={{ icon: 'search-by-image', label: 'Поиск по фото' }}
            />
            {props.filters && <ChipGroup chips={props.filters.map((f) => ({ ...f, dropdown: true }))} />}
          </>
        )}
      </div>
      <ScrollEdge position="top" size={24} />
    </header>
  );
}

/* ─── TabBar & BottomNav ────────────────────────────────────────────── */

export type Tab = 'today' | 'search' | 'wardrobe' | 'stylist' | 'profile';

const tabs: { id: Tab; label: string; icon?: IconName }[] = [
  { id: 'today', label: 'Сегодня', icon: 'home' },
  { id: 'search', label: 'Поиск', icon: 'search-by-image' },
  { id: 'wardrobe', label: 'Гардероб', icon: 'wardrobe' },
  { id: 'stylist', label: 'Стилист', icon: 'ai' },
  { id: 'profile', label: 'Профиль' },
];

/** Плавающий таб-бар: 5 вкладок-иконок, активная — подложка `--color-bg-subtle`. */
export function TabBar({ active, initial = 'С', onChange }: { active: Tab; initial?: string; onChange?: (t: Tab) => void }) {
  return (
    <nav className="y-tab-bar" aria-label="Основная навигация">
      {tabs.map((t) => (
        <button key={t.id} type="button" className="y-tab-bar__tab" aria-label={t.label} aria-current={t.id === active ? 'page' : undefined} onClick={() => onChange?.(t.id)}>
          {t.icon ? <Icon name={t.icon} /> : <span className="y-tab-bar__avatar">{initial}</span>}
        </button>
      ))}
    </nav>
  );
}

/**
 * Нижняя навигация: TabBar (+ FAB «+» на экранах с добавлением) на подложке с затуханием сверху.
 * **Контексты:** все корневые вкладки; FAB — Гардероб и Вишлист.
 */
export function BottomNav({ active, fab, onFab, onTabChange }: { active: Tab; fab?: boolean; onFab?: () => void; onTabChange?: (t: Tab) => void }) {
  return (
    <div className="y-bottom-nav">
      <ScrollEdge position="bottom" size={40} />
      <TabBar active={active} onChange={onTabChange} />
      {fab && <IconButton icon="plus" label="Добавить" variant="primary" size="XL" floating onClick={onFab} />}
    </div>
  );
}

/**
 * Закреплённая нижняя кнопка (CTA) поверх контента: «Добавить», «Создать образ», «Переместить в гардероб».
 * Справа опционально — вторичное действие `IconButton Secondary XL`.
 */
export function BottomBar({ label, onClick, secondary, disabled }: { label: string; onClick?: () => void; secondary?: Action; disabled?: boolean }) {
  return (
    <div className="y-bottom-bar">
      <ScrollEdge position="bottom" size={24} />
      <Button variant="primary" size="XL" fullWidth onClick={onClick} disabled={disabled}>
        {label}
      </Button>
      {secondary && <IconButton icon={secondary.icon} label={secondary.label} variant="secondary" size="XL" onClick={secondary.onClick} />}
    </div>
  );
}

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

export function OutfitCollage({ items, label, footer }: { items: CollageItem[]; /** Повод: «Прогулка», «Ужин». */ label?: string; /** Панель снизу: цена образа, переход. */ footer?: ReactNode }) {
  return (
    <div className="y-collage">
      {label && <Badge variant="secondary" className="y-collage__label">{label}</Badge>}
      {footer && <div className="y-collage__footer">{footer}</div>}
      {items.map((it, i) => (
        <span key={i} className="y-collage__item" style={{ left: `${it.x}%`, top: `${it.y}%` }}>
          <ItemArt kind={it.kind} color={it.color} size={it.size ?? 96} />
        </span>
      ))}
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

/* ─── Stylist & trips ───────────────────────────────────────────────── */

/**
 * Превью образа 138×138 (радиус 20) — несколько вещей на `--card-bg`.
 * **Контексты:** «предыдущий / следующий образ» на экране Образов, списки образов в поездке.
 */
export function OutfitThumbnail({ items, size = 138, onClick }: { items: CollageItem[]; size?: number; onClick?: () => void }) {
  return (
    <button type="button" className="y-outfit-thumb" style={{ width: size, height: size }} onClick={onClick} aria-label="Открыть образ">
      {items.map((it, i) => (
        <span key={i} className="y-collage__item" style={{ left: `${it.x}%`, top: `${it.y}%` }}>
          <ItemArt kind={it.kind} color={it.color} size={it.size ?? size * 0.4} />
        </span>
      ))}
    </button>
  );
}

/**
 * Карточка-вход в сценарий стилиста 173×173, радиус 32: подпись снизу, иллюстрация сверху.
 * **Контексты:** Стилист — «Образ дня», «Конструктор», «Для поездки», «Чат со стилистом».
 */
export function StylistPromptCard({ label, icon, onClick }: { label: string; icon?: IconName; onClick?: () => void }) {
  return (
    <button type="button" className="y-prompt-card" onClick={onClick}>
      {icon && <Icon name={icon} size={40} strokeWidth={1} />}
      <span className="y-body">{label}</span>
    </button>
  );
}

export type TripCardProps =
  | { add: true; label?: string; onClick?: () => void }
  | { add?: false; city: string; items: number; outfits: number; art?: CollageItem[]; onClick?: () => void };

const plural = (n: number, [one, few, many]: [string, string, string]) => {
  const m10 = n % 10, m100 = n % 100;
  return `${n} ${m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many}`;
};

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
          {props.art.map((it, i) => (
            <span key={i} className="y-collage__item" style={{ left: `${it.x}%`, top: `${it.y}%` }}>
              <ItemArt kind={it.kind} color={it.color} size={it.size ?? 64} />
            </span>
          ))}
        </span>
      )}
    </button>
  );
}
