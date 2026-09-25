import type { ReactNode } from 'react';
import { Button, Icon, IconButton, ScrollEdge } from '../atoms';
import type { IconName } from '../icons/icons';
import { ChipGroup, InputBar, type Chip } from '../molecules';
import { cx } from '../utils/cx';
import { StatusBar } from './system';

/* ─── Header ────────────────────────────────────────────────────────── */

type Action = { icon: IconName; label: string; onClick?: () => void };

export type HeaderProps =
  | { type: 'large'; title: string; subtitle?: string; action?: Action }
  | { type: 'bar'; titleChip?: string; /** Вместо чипа: шаги создания образа (`SegmentControl` S с иконками). */ center?: ReactNode; onBack?: () => void; actions?: Action[] }
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
            <div className="y-header__center">{props.center ?? (props.titleChip && <Button variant="tertiary" size="M" tabIndex={-1}>{props.titleChip}</Button>)}</div>
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
 * При переходе на вкладку с FAB таб-бар сжимается и уступает место кнопке — `--motion-nav` (quick, 744 мс).
 */
export function BottomNav({ active, fab, onFab, onTabChange }: { active: Tab; fab?: boolean; onFab?: () => void; onTabChange?: (t: Tab) => void }) {
  return (
    <div className="y-bottom-nav">
      <ScrollEdge position="bottom" size={40} />
      <TabBar active={active} onChange={onTabChange} />
      <span className={cx('y-bottom-nav__fab', fab && 'is-open')} aria-hidden={!fab}>
        <IconButton icon="plus" label="Добавить" variant="primary" size="XL" floating onClick={onFab} tabIndex={fab ? undefined : -1} />
      </span>
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
