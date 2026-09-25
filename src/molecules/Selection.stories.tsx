import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChipGroup, List, ListItem, SegmentControl } from '.';
import { Column, Usage, UsageGrid } from '../docs/helpers';

const meta = {
  title: 'Molecules/Selection',
  component: SegmentControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Выбор значений. **SegmentControl** — переключение вкладок внутри экрана. **ChipGroup** — фильтры, теги, поводы
(выбранный чипс — \`soft\`). **ListItem** — строки в sheet: действия, категории, радио.`,
      },
    },
  },
  args: { segments: [{ value: 'items', label: 'Вещи' }, { value: 'outfits', label: 'Образы' }, { value: 'wishlist', label: 'Вишлист' }], value: 'items' },
} satisfies Meta<typeof SegmentControl>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Segments: Story = {
  name: 'SegmentControl',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return <Column><SegmentControl {...args} value={v} onChange={setV} /></Column>;
  },
};

export const SegmentsInFlow: Story = {
  name: 'SegmentControl · В флоу',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Wardrobe"><SegmentControl value="items" segments={[{ value: 'items', label: 'Вещи' }, { value: 'o', label: 'Образы' }, { value: 'w', label: 'Вишлист' }]} /></Usage>
      <Usage screen="Stylist / Trip Details"><SegmentControl value="o" segments={[{ value: 'o', label: 'Образы · 1' }, { value: 'i', label: 'Вещи' }]} /></Usage>
      <Usage screen="Outfit Creation" note="режимы, иконки"><SegmentControl size="M" value="w" segments={[{ value: 'w', icon: 'wardrobe' }, { value: 'c', icon: 'collage' }, { value: 'h', icon: 'container' }]} /></Usage>
    </UsageGrid>
  ),
};

export const Chips: Story = {
  name: 'ChipGroup · В флоу',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Outfit Creation" note="теги, перенос"><ChipGroup wrap onAdd={() => {}} chips={['Тег #1', 'Тег #2', 'Тег #3', 'Тег #4', 'Тег #5'].map((l) => ({ label: l, removable: true }))} /></Usage>
      <Usage screen="Sheet · Season" note="одиночный выбор"><ChipGroup wrap chips={[{ label: 'Все', selected: true }, { label: 'Весна' }, { label: 'Лето' }, { label: 'Осень' }, { label: 'Зима' }]} /></Usage>
      <Usage screen="Sheet · Color" note="чипсы с цветом"><ChipGroup wrap chips={[{ label: 'Чёрный', colorDot: 'black', selected: true }, { label: 'Серый', colorDot: 'grey' }, { label: 'Белый', colorDot: 'white' }, { label: 'Зелёный', colorDot: 'green' }, { label: 'Бежевый', colorDot: 'beige' }]} /></Usage>
      <Usage screen="Wardrobe" note="фильтры-дропдауны, скролл"><ChipGroup chips={[{ label: 'Категория · 2', selected: true, dropdown: true }, { label: 'Сезон', dropdown: true }, { label: 'Теги', dropdown: true }]} /></Usage>
      <Usage screen="Profile / Edit" note="пол — одинаково для всех"><ChipGroup wrap chips={[{ label: 'Женский', selected: true }, { label: 'Мужской' }, { label: 'Унисекс' }]} /></Usage>
    </UsageGrid>
  ),
};

export const ListItems: Story = {
  name: 'ListItem · В флоу',
  render: () => (
    <UsageGrid min={300}>
      <Usage screen="Sheet · Item Actions" note="action"><List><ListItem icon="ai" label="Создать образ" /><ListItem icon="pen" label="Редактировать" /><ListItem icon="archive" label="Архивировать" /><ListItem icon="trash" label="Удалить" /></List></Usage>
      <Usage screen="Sheet · Category" note="expandable"><List><ListItem type="expandable" icon="outerwear" label="Верхняя одежда" /><ListItem type="expandable" icon="top" label="Верх" expanded /><ListItem type="expandable" icon="bottom" label="Низ" /><ListItem type="expandable" icon="shoe" label="Обувь" /><ListItem type="expandable" icon="accessories" label="Аксессуары" /></List></Usage>
      <Usage screen="Sheet · Birth Year" note="radio"><List>{[1991, 1992, 1993, 1994].map((y, i) => <ListItem key={y} type="radio" label={String(y)} checked={i === 0} />)}</List></Usage>
      <Usage screen="Sheet · Country" note="radio + флаг"><List><ListItem type="radio" label="Россия" checked trailing="🇷🇺" /><ListItem type="radio" label="Беларусь" trailing="🇧🇾" /><ListItem type="radio" label="Казахстан" trailing="🇰🇿" /><ListItem type="radio" label="Грузия" trailing="🇬🇪" /></List></Usage>
    </UsageGrid>
  ),
};
