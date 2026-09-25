import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, type Bar } from '.';
import { Usage, UsageGrid, withWidth } from '../docs/helpers';

const categories: Bar[] = [{ label: 'Верхняя одежда', icon: 'outerwear', value: 5 }, { label: 'Верх', icon: 'top', value: 50 }, { label: 'Обувь', icon: 'shoe', value: 10 }, { label: 'Аксессуары', icon: 'accessories', value: 30 }, { label: 'Низ', icon: 'bottom', value: 5 }];

const meta = {
  title: 'Molecules/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  args: { bars: categories, height: 200 },
  argTypes: { height: { control: { type: 'range', min: 120, max: 280, step: 4 } } },
  decorators: [withWidth(353)],
  parameters: { docs: { description: { component: 'Столбцы-капсулы аналитики (Figma: `bar-chart` из `bar-chart / bar` · Value, Icon). Высота ∝ значению, минимум 34%.' } } },
} satisfies Meta<typeof BarChart>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InFlow: Story = {
  name: 'В флоу',
  decorators: [],
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Profile / Analytics" note="по категориям"><BarChart bars={categories} /></Usage>
      <Usage screen="Profile / Analytics" note="по цветам"><BarChart height={180} bars={[{ label: 'Синий', color: 'blue', value: 13 }, { label: 'Чёрный', color: 'black', value: 62 }, { label: 'Коричневый', color: 'brown', value: 25 }]} /></Usage>
      <Usage screen="Profile / Analytics" note="по сезонам"><BarChart height={180} bars={[{ label: 'Весна', icon: 'flower', value: 20 }, { label: 'Лето', icon: 'sun', value: 70 }, { label: 'Осень', icon: 'leaf', value: 8 }, { label: 'Зима', icon: 'snowflake', value: 1 }]} /></Usage>
    </UsageGrid>
  ),
};
