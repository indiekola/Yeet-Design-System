import type { Meta, StoryObj } from '@storybook/react-vite';
import { Snackbar } from '.';
import { Usage, UsageGrid, withWidth } from '../docs/helpers';

const meta = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  args: { children: 'Перемещено в архив' },
  argTypes: { children: { control: 'text', name: 'text' } },
  decorators: [withWidth(353)],
  parameters: { docs: { description: { component: 'Тост 56, радиус 16, inverse, текст Body + крестик. Figma: `snackbar` · Text, Icon.' } } },
} satisfies Meta<typeof Snackbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { onClose: () => {} } };

export const InFlow: Story = {
  parameters: { controls: { disable: true } },
  name: 'В флоу',
  decorators: [],
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Wardrobe / Item"><Snackbar onClose={() => {}}>Перемещено в архив</Snackbar></Usage>
      <Usage screen="Search / Result"><Snackbar onClose={() => {}}>Добавлено в вишлист</Snackbar></Usage>
      <Usage screen="Trash / Item"><Snackbar onClose={() => {}}>Удалено навсегда</Snackbar></Usage>
    </UsageGrid>
  ),
};
