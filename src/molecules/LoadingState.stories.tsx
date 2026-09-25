import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingState } from '.';

const meta = {
  title: 'Molecules/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
  args: { label: 'Удаляем фон' },
  parameters: { docs: { description: { component: 'Загрузка: спиннер 24 + Body grey, gap 8. Figma: `loading-state` · Label.' } } },
} satisfies Meta<typeof LoadingState>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
