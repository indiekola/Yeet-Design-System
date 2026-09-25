import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, Sheet } from '.';
import { Usage, UsageGrid } from '../docs/helpers';
import { ChipGroup, InputBar, List, ListItem, PhotoTile, StatRow, StatTile } from '../molecules';
import { Button } from '../atoms';

const meta = {
  title: 'Organisms/Sheet & Dialog',
  component: Sheet,
  tags: ['autodocs'],
  args: { title: 'Название вещи' },
  parameters: {
    docs: {
      description: {
        component: `**Всё временное — sheet'ом, а не новым экраном**: действия, фильтры, выбор значений, фото.
Sheet: хэндл → заголовок H3 → контент → пара кнопок (Tertiary + Primary). Dialog — то же, но с описанием последствий.
**Безопасное действие всегда синее, опасное — всегда красное.**`,
      },
    },
  },
} satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

const wrap = (node: React.ReactNode) => <div style={{ width: 393, background: 'var(--color-bg-overlay)', paddingTop: 24, borderRadius: 24, overflow: 'hidden' }}>{node}</div>;

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: 393, background: 'var(--color-bg-overlay)', paddingTop: 40, borderRadius: 24, overflow: 'hidden' }}><Story /></div>],
  render: (args) => (
    <Sheet {...args}>
      <List><ListItem icon="ai" label="Создать образ" /><ListItem icon="pen" label="Редактировать" /><ListItem icon="archive" label="Архивировать" /><ListItem icon="trash" label="Удалить" /></List>
    </Sheet>
  ),
};

export const Sheets: Story = {
  name: 'Sheet · В флоу',
  render: () => (
    <UsageGrid min={393}>
      <Usage screen="Action" note="действия с вещью">{wrap(<Sheet title="Название вещи"><List><ListItem icon="ai" label="Создать образ" /><ListItem icon="pen" label="Редактировать" /><ListItem icon="archive" label="Архивировать" /><ListItem icon="trash" label="Удалить" /></List></Sheet>)}</Usage>
      <Usage screen="Filter" note="сезон">{wrap(<Sheet title="Сезон"><ChipGroup wrap chips={[{ label: 'Все', selected: true }, { label: 'Весна' }, { label: 'Лето' }, { label: 'Осень' }, { label: 'Зима' }]} /></Sheet>)}</Usage>
      <Usage screen="Picker" note="категория + пара кнопок">{wrap(<Sheet title="Категория" footer={[{ label: 'Сбросить' }, { label: 'Применить' }]}><List><ListItem type="expandable" icon="outerwear" label="Верхняя одежда" /><ListItem type="expandable" icon="top" label="Верх" expanded /></List><ChipGroup wrap chips={[{ label: 'Футболка', selected: true }, { label: 'Поло' }, { label: 'Топ' }, { label: 'Рубашка' }]} /><List><ListItem type="expandable" icon="bottom" label="Низ" /><ListItem type="expandable" icon="shoe" label="Обувь" /></List></Sheet>)}</Usage>
      <Usage screen="Search" note="страна">{wrap(<Sheet title="Страна"><InputBar placeholder="Поиск по странам" fieldIcon="search" /><List><ListItem type="radio" label="Россия" checked trailing="🇷🇺" /><ListItem type="radio" label="Беларусь" trailing="🇧🇾" /><ListItem type="radio" label="Казахстан" trailing="🇰🇿" /></List></Sheet>)}</Usage>
      <Usage screen="Photo" note="заменить фото">{wrap(<Sheet><div style={{ display: 'flex', gap: 8 }}><PhotoTile source="gallery" /><PhotoTile source="camera" /></div><Button variant="destructive" fullWidth>Удалить фотографию</Button></Sheet>)}</Usage>
      <Usage screen="Panel" note="постоянная панель деталей"><div style={{ width: 393, paddingTop: 24 }}><Sheet type="panel" title="Сумка"><p className="y-body y-text--secondary">10 000 ₽ · Sander · Чёрный<br />Аксессуары · Все сезоны</p></Sheet></div></Usage>
    </UsageGrid>
  ),
};

export const Dialogs: Story = {
  name: 'Dialog · В флоу',
  render: () => (
    <UsageGrid min={393}>
      <Usage screen="Outfit Creation / Exit" note="подтверждение">{wrap(<Dialog title="Точно хочешь выйти?" description="Можно сохранить образ и вернуться к нему позже" cancel="Выйти" confirm="Сохранить и выйти" />)}</Usage>
      <Usage screen="Trash" note="деструктивное">{wrap(<Dialog tone="destructive" title="Очистить корзину?" description="Все вещи из корзины удаляются навсегда, их уже не вернуть" cancel="Отмена" confirm="Очистить" />)}</Usage>
      <Usage screen="Settings / Delete Account" note="со статистикой">{wrap(<Dialog tone="destructive" title="Аккаунт будет удалён" description={<>Аккаунт <b style={{ color: 'var(--color-text-primary)' }}>sima@space.com</b> будет деактивирован. Ты потеряешь:</>} cancel="Отменить" confirm="Удалить"><StatRow><StatTile label="Вещи" value={43} /><StatTile label="Образы" value={12} /><StatTile label="Вишлист" value={12} /></StatRow><p className="y-body y-text--secondary">Восстановить аккаунт можно в течение <b style={{ color: 'var(--color-text-primary)' }}>14 дней</b>, войдя с тем же паролем.</p></Dialog>)}</Usage>
    </UsageGrid>
  ),
};
