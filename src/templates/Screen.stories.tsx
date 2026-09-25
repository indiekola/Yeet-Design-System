import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Screen } from '.';
import { BottomNav, Header, ItemCard, type Garment } from '../organisms';
import { SegmentControl } from '../molecules';

const meta = {
  title: 'Templates/Screen',
  component: Screen,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Каркас экрана 393×852: **header** (закреплён) → **контент** (скроллится) → **bottom** (закреплён) + слои \`floating\` и \`overlay\`.
Проскролльте контент в примере: карточки уходят под шапку и таб-бар и плавно гаснут.`,
      },
    },
  },
} satisfies Meta<typeof Screen>;
export default meta;
type Story = StoryObj<typeof meta>;

const kinds: Garment[] = ['top', 'container', 'bottom', 'shoe', 'outerwear', 'accessories', 'top', 'bottom', 'shoe', 'container'];

export const Scroll: Story = {
  name: 'Скролл под навигацией',
  args: {
    header: <Header type="large" title="Гардероб" />,
    bottom: <BottomNav active="wardrobe" fab />,
    children: (
      <>
        <SegmentControl value="items" segments={[{ value: 'items', label: 'Вещи' }, { value: 'o', label: 'Образы' }, { value: 'w', label: 'Вишлист' }]} />
        <Grid>{kinds.map((k, i) => <ItemCard key={i} kind={k} />)}</Grid>
      </>
    ),
  },
};
