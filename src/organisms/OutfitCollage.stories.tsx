import type { Meta, StoryObj } from '@storybook/react-vite';
import { OutfitCollage, OutfitThumbnail, type CollageItem } from '.';
import { Icon } from '../atoms';
import { unlessBare, Usage, UsageGrid } from '../docs/helpers';

const look: CollageItem[] = [{ kind: 'top', x: 64, y: 34, color: 'green' }, { kind: 'bottom', x: 32, y: 58, size: 130, color: 'green' }, { kind: 'accessories', x: 34, y: 20, size: 56 }, { kind: 'shoe', x: 72, y: 78, size: 72, color: 'brown' }];

type Args = { label: string; withFooter: boolean };

const meta: Meta<Args> = {
  title: 'Organisms/OutfitCollage',
  tags: ['autodocs'],
  args: { label: 'Прогулка', withFooter: false },
  decorators: [unlessBare((Story) => <div style={{ width: 353 }}><Story /></div>)],
  parameters: { docs: { description: { component: 'Коллаж образа 353×353, радиус 20, точечный фон; вещи раскладываются свободно (слот Items в Figma). Повод — Badge secondary, панель снизу — цена образа. `OutfitThumbnail` — превью 138. Figma: `outfit-collage`, `outfit-thumbnail`.' } } },
  render: ({ label, withFooter }) => (
    <OutfitCollage label={label || undefined} items={look} footer={withFooter ? <><span><span className="y-h2" style={{ display: 'block' }}>120 640 ₽</span><span className="y-caption y-text--secondary">4 вещи</span></span><Icon name="chevron-right" /></> : undefined} />
  ),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const Thumbnail: Story = {
  parameters: { controls: { disable: true } },
  name: 'OutfitThumbnail',
  tags: ['bare'],
  render: () => (
    <UsageGrid min={173}>
      <Usage screen="Outfits" note="предыдущий / следующий образ" width={173}><OutfitThumbnail items={[{ kind: 'outerwear', x: 50, y: 34, color: 'brown' }, { kind: 'bottom', x: 50, y: 70, color: 'black' }]} /></Usage>
    </UsageGrid>
  ),
};
