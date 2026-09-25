import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '.';
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
