import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatBubble, ItemCard, OutfitCollage, OutfitThumbnail, PhotoArea, ProductCard, StylistPromptCard, TripCard, WeatherCard } from '.';
import { Icon } from '../atoms';
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
      <Usage screen="Profile / Analytics" note="метка-счётчик" width={173}><ItemCard kind="top" color="green" label="30 раз" /></Usage>
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

const look = [{ kind: 'top', x: 64, y: 34, color: 'green' }, { kind: 'bottom', x: 32, y: 58, size: 130, color: 'green' }, { kind: 'accessories', x: 34, y: 20, size: 56 }, { kind: 'shoe', x: 72, y: 78, size: 72, color: 'brown' }] as const;

export const Stylist: Story = {
  name: 'Стилист и поездки',
  render: () => (
    <UsageGrid min={173}>
      <Usage screen="Stylist / Home" note="вход в сценарий" width={173}><StylistPromptCard label="Образ дня" icon="ai" /></Usage>
      <Usage screen="Stylist / Home" width={173}><StylistPromptCard label="Для поездки" icon="bag-check" /></Usage>
      <Usage screen="Stylist / Trips / List" note="первая карточка" width={173}><TripCard add /></Usage>
      <Usage screen="Stylist / Trips / List" note="поездка" width={173}><TripCard city="Бразилиа" items={4} outfits={1} art={[{ kind: 'accessories', x: 60, y: 30, size: 40 }, { kind: 'bottom', x: 28, y: 62, size: 72, color: 'green' }, { kind: 'top', x: 74, y: 62, size: 64, color: 'green' }]} /></Usage>
      <Usage screen="Outfits" note="предыдущий / следующий образ" width={173}><OutfitThumbnail items={[{ kind: 'outerwear', x: 50, y: 34, color: 'brown' }, { kind: 'bottom', x: 50, y: 70, color: 'black' }]} /></Usage>
    </UsageGrid>
  ),
};

export const CollageVariants: Story = {
  name: 'Коллаж: повод и панель',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Stylist / Trip Details" note="повод" width={353}><OutfitCollage label="Прогулка" items={[...look]} /></Usage>
      <Usage screen="Profile / Analytics" note="самый дорогой образ" width={353}>
        <OutfitCollage
          label="Ужин"
          items={[...look]}
          footer={<><span><span className="y-h2" style={{ display: 'block' }}>120 640 ₽</span><span className="y-caption y-text--secondary">4 вещи</span></span><Icon name="chevron-right" /></>}
        />
      </Usage>
    </UsageGrid>
  ),
};
