import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ProductCard } from '.';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: { kind: 'shoe', name: 'Nike Air Force 1 ’07', price: '10 400 ₽', discount: '-10%', liked: false, showLike: true },
  argTypes: { kind: { control: 'select', options: ['top', 'bottom', 'outerwear', 'shoe', 'accessories', 'container'] } },
  decorators: [(Story) => <div style={{ width: 173 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Товар в поиске: карточка 173×172 + название Caption grey и цена Body (gap 16, между строками 2). Сердце — в вишлист. Figma: `product-card` · Name, Price, Discount, Show Discount, Show Like.' } } },
} satisfies Meta<typeof ProductCard>;
export default meta;

export const Playground: StoryObj<typeof meta> = {
  render: function Render(args) {
    const [, update] = useArgs();
    return <ProductCard {...args} discount={args.discount || undefined} onLike={() => update({ liked: !args.liked })} />;
  },
};
