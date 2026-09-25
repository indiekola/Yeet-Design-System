import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhotoTile } from '.';
import { Usage, UsageGrid } from '../docs/helpers';

const meta = {
  title: 'Molecules/PhotoTile',
  component: PhotoTile,
  tags: ['autodocs'],
  args: { source: 'gallery' },
  argTypes: { source: { control: 'inline-radio', options: ['gallery', 'camera'] }, label: { control: 'text' } },
  decorators: [(Story) => <div style={{ width: 173, display: 'flex' }}><Story /></div>],
  parameters: { docs: { description: { component: 'Плитка источника фото 173×173: иллюстрация сверху (паддинг 28), подпись Body, gap 24. Figma: `photo-tile` · Label.' } } },
} satisfies Meta<typeof PhotoTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InFlow: Story = {
  name: 'В флоу',
  decorators: [],
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Photo sheet / Search / Discover"><div style={{ display: 'flex', gap: 8, width: 353 }}><PhotoTile source="gallery" /><PhotoTile source="camera" /></div></Usage>
    </UsageGrid>
  ),
};
