import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flag, Icon, WeatherIcon, languages, weatherKinds, weatherNames } from '.';
import { icons, type IconName } from '../icons/icons';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'heart', size: 24, strokeWidth: 1.3 },
  argTypes: {
    name: { control: 'select', options: Object.keys(icons) as IconName[] },
    size: { control: { type: 'range', min: 12, max: 64 } },
    strokeWidth: { control: { type: 'range', min: 0.5, max: 2.5, step: 0.1 } },
  },
  parameters: { docs: { description: { component: 'Линейная иконка 24×24, линия 1.3, цвет `currentColor`. Все иконки — Foundations / Иконки. Figma: `ui-icons/*`.' } } },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16, width: 'min(760px, 90vw)' } as const;
const cell = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, borderRadius: 20, background: 'var(--card-bg)' } as const;

export const Weather: Story = {
  name: 'Погода (цветные)',
  parameters: { controls: { disable: true }, docs: { description: { story: 'Цветной набор из Figma: Design System → weather-icons. `<WeatherIcon kind="rain" />`. Ясно и переменная облачность — день и ночь.' } } },
  render: () => (
    <div style={grid}>
      {weatherKinds.map((k) => (
        <figure key={k} style={{ ...cell, margin: 0 }}>
          <WeatherIcon kind={k} size={40} />
          <figcaption className="y-caption">{weatherNames[k]}<div className="y-text--secondary"><code>{k}</code></div></figcaption>
        </figure>
      ))}
    </div>
  ),
};

export const Flags: Story = {
  name: 'Языки и флаги',
  parameters: { controls: { disable: true }, docs: { description: { story: 'Флаги из Figma: Design System → flags-icons, круглые 24. `languages` — языки интерфейса с флагом. `<Flag code="ge" />`.' } } },
  render: () => (
    <div style={grid}>
      {languages.map((l) => (
        <figure key={l.code} style={{ ...cell, margin: 0 }}>
          <Flag code={l.flag} size={32} />
          <figcaption className="y-caption">{l.name}<div className="y-text--secondary"><code>{l.code} · {l.flag}</code></div></figcaption>
        </figure>
      ))}
    </div>
  ),
};
