import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import tokens from '../../tokens/tokens.json';
import { Badge, Button, Logo, Stamp } from '../atoms';
import { ChipGroup, SegmentControl, Snackbar } from '../molecules';
import { BottomNav, ItemCard, StatusBar } from '../organisms';

const meta = {
  title: 'Foundations/Бренд-палитры',
  parameters: { layout: 'fullscreen', controls: { disable: true }, options: { showPanel: false } },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Brand = 'blue' | 'lime';
const cases: { brand: Brand; theme: 'light' | 'dark'; title: string }[] = [
  { brand: 'blue', theme: 'light', title: 'Синий · светлая' },
  { brand: 'lime', theme: 'light', title: 'Лайм · светлая' },
  { brand: 'blue', theme: 'dark', title: 'Синий · тёмная' },
  { brand: 'lime', theme: 'dark', title: 'Лайм · тёмная' },
];

function Sample({ brand, theme, title }: (typeof cases)[number]) {
  const [seg, setSeg] = useState('items');
  const [done, setDone] = useState(false);
  return (
    <section
      data-theme={theme}
      data-brand={brand === 'blue' ? undefined : brand}
      style={{ background: 'var(--color-bg-canvas)', color: 'var(--color-text-primary)', borderRadius: 32, display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 4, boxShadow: 'inset 0 0 0 1px var(--color-border-subtle)' }}
    >
      <div style={{ background: 'var(--color-accent)', height: 140, borderRadius: '32px 32px 0 0', display: 'flex', flexDirection: 'column' }}>
        <StatusBar onAccent />
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--color-text-on-accent)' }}><Logo height={36} /></div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 className="y-h3">{title}</h3>
        <SegmentControl segments={[{ value: 'items', label: 'Вещи' }, { value: 'looks', label: 'Образы' }]} value={seg} onChange={setSeg} />
        <ChipGroup wrap chips={[{ label: 'Офис', selected: true }, { label: 'Прогулка' }, { label: 'Свидание' }]} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <ItemCard kind="outerwear" color="green" selected />
          <ItemCard kind="bottom" color="beige" discount="-20%" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Stamp label="Надеть" size="S" done={done} onClick={() => setDone((v) => !v)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <Badge variant="primary">Новое</Badge>
            <span className="y-body y-text--accent">Акцентный текст</span>
            <span className="y-caption y-text--secondary">Вторичный текст</span>
          </div>
        </div>
        <Snackbar>Образ сохранён</Snackbar>
        <Button fullWidth>Добавить вещь</Button>
      </div>
      <BottomNav active="today" />
    </section>
  );
}

function Swatches({ brand }: { brand: 'lime' }) {
  const b = tokens.brand[brand];
  const keys = ['accent', 'text-accent', 'accent-soft', 'bg-canvas', 'bg-subtle', 'text-primary', 'text-secondary'] as const;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
      {keys.map((k) => (
        <figure key={k} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', height: 56, borderRadius: 16, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--color-border-subtle)' }}>
            {(['light', 'dark'] as const).map((th) => {
              const [hex, a] = b[th][k].split('@');
              return <span key={th} style={{ flex: 1, background: hex, opacity: a ? Number(a) : 1 }} />;
            })}
          </div>
          <figcaption className="y-caption">
            <code>--color-{k}</code>
            <div className="y-text--secondary">{b.light[k]} / {b.dark[k]}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export const Compare: Story = {
  name: 'Синий и Лайм',
  render: () => (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32, background: 'var(--color-bg-canvas)', color: 'var(--color-text-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h1 className="y-h1">Бренд-палитры</h1>
        <p className="y-body y-text--secondary">
          {tokens.brand.lime.about} Меняются только семантические цвета: компоненты, радиусы, типографика и анимации те же.
          Переключить весь Storybook — кнопка «Бренд» на панели сверху.
        </p>
      </div>
      <Swatches brand="lime" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(353px, 393px))', gap: 24 }}>
        {cases.map((c) => <Sample key={c.brand + c.theme} {...c} />)}
      </div>
    </div>
  ),
};
