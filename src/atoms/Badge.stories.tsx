import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '.';
import { Usage, UsageGrid } from '../docs/helpers';

const variants = ['primary', 'danger', 'secondary', 'muted', 'tertiary', 'ghost'] as const;

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: '-10%', variant: 'danger' },
  argTypes: { variant: { control: 'inline-radio', options: variants }, children: { control: 'text', name: 'label' } },
  parameters: { docs: { description: { component: 'Бейдж 24, радиус 12, Caption. Figma: `badge` · Style, Label. Скидка на товаре — `danger`, счётчик и повод — `secondary`.' } } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  name: 'Все варианты',
  render: () => <div style={{ display: 'flex', gap: 12 }}>{variants.map((v) => <Badge key={v} variant={v}>{v}</Badge>)}</div>,
};

export const InFlow: Story = {
  parameters: { controls: { disable: true } },
  name: 'В флоу',
  render: () => (
    <UsageGrid min={170}>
      <Usage screen="Search / Results" note="скидка"><Badge variant="danger">-10%</Badge></Usage>
      <Usage screen="Profile / Analytics" note="сколько раз надето"><Badge variant="secondary">30 раз</Badge></Usage>
      <Usage screen="Stylist / Trip Details" note="повод образа"><Badge variant="secondary">Прогулка</Badge></Usage>
    </UsageGrid>
  ),
};
