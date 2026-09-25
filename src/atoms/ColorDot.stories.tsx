import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorDot } from '.';
import { Usage, UsageGrid } from '../docs/helpers';
import { itemColors } from '../tokens/tokens';

const meta = {
  title: 'Atoms/ColorDot',
  component: ColorDot,
  tags: ['autodocs'],
  args: { color: 'green', size: 24 },
  argTypes: { color: { control: 'select', options: itemColors.map(([id]) => id) }, size: { control: { type: 'range', min: 8, max: 40 } } },
  parameters: { docs: { description: { component: 'Свотч цвета вещи — только для атрибута «цвет вещи» (item-colors), не для интерфейса. Figma: `color`.' } } },
} satisfies Meta<typeof ColorDot>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Palette: Story = {
  name: 'Все цвета вещей',
  render: () => (
    <UsageGrid min={120}>
      {itemColors.map(([id, ru, hex]) => <Usage key={id} screen={ru} note={hex}><ColorDot color={id} size={24} /></Usage>)}
    </UsageGrid>
  ),
};
