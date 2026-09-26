import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatRow, StatTile } from '.';
import { Usage, UsageGrid } from '../docs/helpers';

const meta = {
  title: 'Molecules/StatTile',
  component: StatTile,
  tags: ['autodocs'],
  args: { label: 'Надето раз', value: 8 },
  decorators: [(Story) => <div style={{ width: 112 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Плитка статистики: Caption grey + H2 через 4, паддинг 16/20, высота 80, радиус 20 (флоу Outfit Details). В ряду `StatRow` по 3. Figma: `stat-tile` · Label, Value.' } } },
} satisfies Meta<typeof StatTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InFlow: Story = {
  parameters: { controls: { disable: true } },
  name: 'В флоу',
  decorators: [],
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Wardrobe / Outfit Details"><StatRow><StatTile label="Надето раз" value={8} /><StatTile label="Д. простоя" value={1} /><StatTile label="Вещи" value={4} /></StatRow></Usage>
      <Usage screen="Profile / Analytics"><StatRow><StatTile label="Вещи" value={43} /><StatTile label="Образы" value={12} /><StatTile label="Вишлист" value={4} /></StatRow></Usage>
    </UsageGrid>
  ),
};
