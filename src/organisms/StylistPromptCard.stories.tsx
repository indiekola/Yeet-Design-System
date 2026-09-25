import type { Meta, StoryObj } from '@storybook/react-vite';
import { StylistPromptCard } from '.';

const meta = {
  title: 'Organisms/StylistPromptCard',
  component: StylistPromptCard,
  tags: ['autodocs'],
  args: { label: 'Образ дня' },
  decorators: [(Story) => <div style={{ width: 173 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Вход в сценарий стилиста 173×173, радиус 32, паддинг 24, подпись Body внизу по центру. Figma: `stylist-prompt-card` · Label.' } } },
} satisfies Meta<typeof StylistPromptCard>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
