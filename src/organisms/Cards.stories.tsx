import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatBubble, ItemCard, OutfitCollage, PhotoArea, ProductCard, WeatherCard } from '.';
import { Usage, UsageGrid } from '../docs/helpers';
import { LoadingState } from '../molecules';

const meta = {
  title: 'Organisms/Cards & media',
  component: ItemCard,
  tags: ['autodocs'],
  args: { kind: 'top', color: 'green' },
  parameters: {
    docs: {
      description: {
        component: `Карточки и медиа. Вещи всегда **без фона** на \`--card-bg\` — цвет и фактура приходят из фото, интерфейс остаётся тихим.
В Storybook вместо фото — иллюстрации из набора иконок.`,
      },
    },
  },
} satisfies Meta<typeof ItemCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: 173 }}><Story /></div>],
};

export const InFlow: Story = {
  name: 'В флоу',
  render: () => (
    <UsageGrid min={173}>
      <Usage screen="Wardrobe / Items" note="сетка" width={173}><ItemCard kind="top" color="green" /></Usage>
      <Usage screen="Search / Results" note="со скидкой" width={173}><ItemCard kind="shoe" color="white" discount="-10%" /></Usage>
      <Usage screen="Outfit Creation" note="выбрана" width={173}><ItemCard kind="bottom" color="black" selected /></Usage>
      <Usage screen="Search / Results" note="карточка товара" width={173}><ProductCard kind="shoe" name="Nike Air Force 1 ’07" price="10 400 ₽" discount="-10%" /></Usage>
      <Usage screen="Search / Results" note="в вишлисте" width={173}><ProductCard kind="shoe" name="Nike Ava Edge" price="14 300 ₽" liked /></Usage>
    </UsageGrid>
  ),
};

export const Media: Story = {
  name: 'Коллаж, фото, погода, чат',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Outfits / Everyday" note="коллаж образа" width={353}><OutfitCollage items={[{ kind: 'top', x: 68, y: 32, color: 'green' }, { kind: 'bottom', x: 30, y: 58, size: 140, color: 'green' }, { kind: 'accessories', x: 32, y: 20, size: 64 }, { kind: 'shoe', x: 70, y: 76, size: 80, color: 'brown' }]} /></Usage>
      <Usage screen="New Item / No Photo" width={353}><PhotoArea /></Usage>
      <Usage screen="Wardrobe / Item Details" width={353}><PhotoArea kind="container" onRemove={() => {}} /></Usage>
      <Usage screen="New Item / Removing Background" width={353}><PhotoArea><LoadingState label="Удаляем фон" /></PhotoArea></Usage>
      <Usage screen="Outfits / Everyday" note="погода"><WeatherCard temp="20°" description="Солнечно, ветер 14 км/ч" /></Usage>
      <Usage screen="Stylist / Assistant" note="чат" width={353}><div style={{ display: 'grid', gap: 8 }}><ChatBubble>Привет! Я твой ИИ-стилист. Спрашивай про образы, сочетания и что надеть сегодня</ChatBubble><ChatBubble own>Что надеть на свидание?</ChatBubble></div></Usage>
    </UsageGrid>
  ),
};
