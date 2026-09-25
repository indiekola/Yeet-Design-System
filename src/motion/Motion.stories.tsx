import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { IconButton, Stamp } from '../atoms';
import { ChipGroup } from '../molecules';
import { BottomNav, OutfitCollage, StatusBar, type CollageItem, type Tab } from '../organisms';
import { curves, sample } from './motion';
import './motion.css';

const meta = {
  title: 'Foundations/Анимации',
  parameters: { layout: 'centered', controls: { disable: true }, options: { showPanel: false } },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const looks: CollageItem[][] = [
  [{ kind: 'accessories', x: 34, y: 18, size: 56 }, { kind: 'top', x: 66, y: 34, color: 'green' }, { kind: 'bottom', x: 30, y: 60, size: 130, color: 'green' }, { kind: 'shoe', x: 72, y: 76, size: 72, color: 'brown' }],
  [{ kind: 'bottom', x: 28, y: 58, size: 140, color: 'black' }, { kind: 'top', x: 64, y: 36, color: 'brown' }, { kind: 'container', x: 76, y: 76, size: 64, color: 'black' }],
  [{ kind: 'outerwear', x: 36, y: 36, size: 120, color: 'beige' }, { kind: 'bottom', x: 68, y: 58, size: 110, color: 'blue' }, { kind: 'shoe', x: 34, y: 80, size: 64, color: 'white' }],
];

/* ─── Кривые ─────────────────────────────────────────────────────────── */

function CurvePlot({ i }: { i: number }) {
  const c = curves[i];
  const W = 200, H = 120, top = 24, bottom = 12;
  const y = (v: number) => H - bottom - v * (H - top - bottom);
  const d = Array.from({ length: 81 }, (_, j) => `${j ? 'L' : 'M'}${(j / 80) * W},${y(sample(c, j / 80)).toFixed(1)}`).join('');
  return (
    <figure className="y-curve">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`${c.figma}: ${c.duration} мс`}>
        <line x1="0" x2={W} y1={y(1)} y2={y(1)} className="y-curve__grid" />
        <line x1="0" x2={W} y1={y(0)} y2={y(0)} className="y-curve__axis" />
        <path d={d} className="y-curve__line">
          <title>{`${c.token} · ${c.duration} мс`}</title>
        </path>
      </svg>
      <div className="y-curve__track">
        <span className="y-curve__dot" style={{ animationDuration: `${c.duration}ms`, animationTimingFunction: `var(${c.token})` }} />
      </div>
      <figcaption>
        <b>{c.figma}</b> · {c.duration} мс
        <code>{c.token}</code>
      </figcaption>
    </figure>
  );
}

export const Curves: Story = {
  parameters: { controls: { disable: true } },
  name: 'Кривые',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24, width: 'min(920px, 90vw)' }}>
      {curves.map((_, i) => <CurvePlot key={i} i={i} />)}
    </div>
  ),
};

/* ─── Штамп ─────────────────────────────────────────────────────────── */

function StampDemo() {
  const [done, setDone] = useState(false);
  const [spin, setSpin] = useState(0);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Stamp label="Надеть" done={done} onClick={() => setDone((v) => !v)} />
      <Stamp label="Перемешать" tone="secondary" size="S" icon="arrows-shuffle" onClick={() => setSpin((s) => s + 1)} style={{ transform: `rotate(${spin * 180}deg)`, transition: 'transform var(--motion-swap)' }} />
      <p className="y-caption y-text--secondary" style={{ maxWidth: 200 }}>Нажми на штамп: сжатие, поворот −60° и «×» на пружине bouncy. Повторное нажатие отменяет.</p>
    </div>
  );
}
export const StampPress: Story = { name: 'Штамп «Надеть»', render: () => <StampDemo /> };

/* ─── Таб-бар и FAB ─────────────────────────────────────────────────── */

function NavDemo() {
  const [tab, setTab] = useState<Tab>('today');
  return (
    <div className="y-motion-phone y-motion-phone--short">
      <p className="y-caption y-text--secondary" style={{ padding: '24px 20px' }}>Переключай вкладки: на «Гардеробе» таб-бар уступает место кнопке «+».</p>
      <div style={{ marginTop: 'auto' }}>
        <BottomNav active={tab} fab={tab === 'wardrobe'} onTabChange={setTab} />
      </div>
    </div>
  );
}
export const NavFab: Story = { name: 'Таб-бар и FAB', render: () => <NavDemo /> };

/* ─── Смена образа ──────────────────────────────────────────────────── */

function SwapDemo() {
  const [i, setI] = useState(0);
  const n = looks.length;
  const pos = (k: number) => ((k - i) % n + n) % n; // 0 текущий, 1 следующий, 2 предыдущий
  return (
    <div className="y-motion-phone">
      <StatusBar />
      <div className="y-swap" onClick={() => setI((v) => v + 1)} role="button" tabIndex={0} aria-label="Следующий образ">
        {looks.map((items, k) => (
          <div key={k} className={cx3(pos(k))}>
            <OutfitCollage items={items} />
          </div>
        ))}
        <span className="y-swap__stamp" style={{ transform: `rotate(${i * 180}deg)` }}>
          <Stamp label="Надеть" tabIndex={-1} />
        </span>
      </div>
      <p className="y-caption y-text--secondary" style={{ padding: '0 20px 20px', textAlign: 'center' }}>Нажми на экран: следующий образ вырастает из превью снизу.</p>
    </div>
  );
}
const cx3 = (p: number) => `y-swap__look ${p === 0 ? 'is-current' : p === 1 ? 'is-next' : 'is-prev'}`;
export const OutfitSwap: Story = { name: 'Смена образа', render: () => <SwapDemo /> };

/* ─── Сворачивание фото ─────────────────────────────────────────────── */

function CollapseDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`y-motion-phone y-collapse ${collapsed ? 'is-collapsed' : ''}`}>
      <StatusBar />
      <div className="y-collapse__bar">
        <IconButton icon="chevron-left" label="Назад" />
        <IconButton icon="more" label="Ещё" />
      </div>
      <div className="y-collapse__photo" aria-hidden>
        <OutfitCollage items={[{ kind: 'container', x: 50, y: 50, size: 180, color: 'black' }]} />
      </div>
      <div className="y-collapse__scroll" onScroll={(e) => setCollapsed(e.currentTarget.scrollTop > 24)}>
        <div className="y-collapse__panel">
          <h2 className="y-h2">Сумка</h2>
          <p className="y-caption y-text--secondary">10 000 ₽ · Аксессуары · Чёрный · Все сезоны</p>
          {Array.from({ length: 6 }, (_, k) => <div key={k} style={{ height: 96, borderRadius: 20, background: 'var(--card-bg)' }} />)}
        </div>
      </div>
    </div>
  );
}
export const PhotoCollapse: Story = { name: 'Сворачивание фото', render: () => <CollapseDemo /> };

/* ─── Листание поводов ──────────────────────────────────────────────── */

const occasions = ['Офис', 'На каждый день', 'Свидание', 'Вечеринка'];

function PagerDemo() {
  const [i, setI] = useState(1);
  const start = useRef<number | null>(null);
  const go = (d: number) => setI((v) => Math.min(occasions.length - 1, Math.max(0, v + d)));
  const down = (e: PointerEvent) => (start.current = e.clientX);
  const up = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
  };
  const track: CSSProperties = { transform: `translateX(calc(${-i} * (353px + 20px)))` };
  return (
    <div className="y-motion-phone">
      <StatusBar />
      <div className="y-pager" onPointerDown={down} onPointerUp={up}>
        <div className="y-pager__track" style={track}>
          {occasions.map((o, k) => (
            <div key={o} className="y-pager__page"><OutfitCollage items={looks[k % looks.length]} /></div>
          ))}
        </div>
      </div>
      <div className="y-pager__chips" style={{ transform: `translateX(${80 - i * 110}px)` }}>
        <ChipGroup chips={occasions.map((label, k) => ({ label, selected: k === i }))} onToggle={(label) => setI(occasions.indexOf(label))} />
      </div>
      <p className="y-caption y-text--secondary" style={{ padding: '16px 20px', textAlign: 'center' }}>Свайпни образ или выбери повод.</p>
    </div>
  );
}
export const OccasionPager: Story = { name: 'Листание поводов', render: () => <PagerDemo /> };
