import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hint } from '.';

const meta = {
  title: 'Molecules/Hint',
  component: Hint,
  tags: ['autodocs'],
  args: { children: 'Перемещай и масштабируй вещи', icon: 'fingers-pinch' },
  argTypes: { icon: { control: 'select', options: ['fingers-pinch', 'horizontal-drag', 'info'] }, children: { control: 'text', name: 'label' } },
  parameters: { docs: { description: { component: 'Плавающая подсказка 24: elevated, радиус 32, тень, иконка 16 + Caption. Figma: `hint` · Label, Icon.' } } },
} satisfies Meta<typeof Hint>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
