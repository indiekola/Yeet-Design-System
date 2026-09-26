import type { Meta, StoryObj } from '@storybook/react-vite';
import { ItemCard } from '.';
import { unlessBare, Usage, UsageGrid } from '../docs/helpers';
import { itemColors } from '../tokens/tokens';

const kinds = ['top', 'bottom', 'outerwear', 'shoe', 'accessories', 'container'] as const;

const meta = {
  title: 'Organisms/ItemCard',
  component: ItemCard,
  tags: ['autodocs'],
  args: { kind: 'top', color: 'green', discount: '', label: '', selected: undefined },
  argTypes: { kind: { control: 'select', options: kinds }, color: { control: 'select', options: [undefined, ...itemColors.map(([id]) => id)] }, selected: { control: 'select', options: [undefined, false, true] } },
  decorators: [unlessBare((Story) => <div style={{ width: 173 }}><Story /></div>)],
  parameters: { docs: { description: { component: 'Карточка вещи 173×172, радиус 20, фото без фона на light-grey. Бейдж и галочка — отступ 16. Figma: `item-card` · Show Discount, Discount, Selected.' } } },
} satisfies Meta<typeof ItemCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <ItemCard {...args} discount={args.discount || undefined} label={args.label || undefined} /> };

export const InFlow: Story = {
  parameters: { controls: { disable: true } },
  name: 'В флоу',
  tags: ['bare'],
  render: () => (
    <UsageGrid min={173}>
      <Usage screen="Wardrobe / Items" width={173}><ItemCard kind="top" color="green" /></Usage>
      <Usage screen="Search / Results" note="скидка" width={173}><ItemCard kind="shoe" color="white" discount="-10%" /></Usage>
      <Usage screen="Outfit Creation" note="выбрана" width={173}><ItemCard kind="bottom" color="black" selected /></Usage>
      <Usage screen="Profile / Analytics" note="счётчик" width={173}><ItemCard kind="top" color="green" label="30 раз" /></Usage>
    </UsageGrid>
  ),
};
