import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomBar, BottomNav, Header, TabBar } from '.';
import { Usage, UsageGrid } from '../docs/helpers';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Navigation',
  component: Header,
  tags: ['autodocs'],
  args: { type: 'large', title: 'Гардероб' } as never,
  parameters: {
    docs: {
      description: {
        component: `Закреплённая навигация. **Header** сверху и **BottomNav / BottomBar** снизу имеют сплошную подложку и полосу затухания:
контент скроллится под них и плавно гаснет (см. «Foundations / Скролл и края экрана»).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: 393, border: '1px dashed var(--color-border-subtle)', borderRadius: 24, overflow: 'hidden' }}><Story /></div>],
};

export const Headers: Story = {
  name: 'Header · В флоу',
  render: () => (
    <UsageGrid min={393}>
      <Usage screen="Wardrobe" note="корневая вкладка"><div style={{ width: 393 }}><Header type="large" title="Гардероб" /></div></Usage>
      <Usage screen="Stylist" note="с подзаголовком"><div style={{ width: 393 }}><Header type="large" title="Стилист" subtitle="Нашли классную вещь? Поищем похожую дешевле" /></div></Usage>
      <Usage screen="New Item" note="назад + title-chip"><div style={{ width: 393 }}><Header type="bar" titleChip="Новая вещь" /></div></Usage>
      <Usage screen="Item Details" note="назад + меню"><div style={{ width: 393 }}><Header type="bar" actions={[{ icon: 'more', label: 'Ещё' }]} /></div></Usage>
      <Usage screen="Trash" note="2 действия"><div style={{ width: 393 }}><Header type="bar" titleChip="Корзина вещей" actions={[{ icon: 'trash', label: 'Очистить' }, { icon: 'more', label: 'Ещё' }]} /></div></Usage>
      <Usage screen="Auth / Sign In"><div style={{ width: 393 }}><Header type="back" title="Вход и регистрация" /></div></Usage>
      <Usage screen="Onboarding / First Item"><div style={{ width: 393 }}><Header type="back" title="Добавь первую вещь" textAction={{ label: 'Пропустить' }} /></div></Usage>
      <Usage screen="Search / Results" note="с фильтрами"><div style={{ width: 393 }}><Header type="search" query="Белые кроссовки" filters={[{ label: 'Сортировка' }, { label: 'Цена' }]} /></div></Usage>
    </UsageGrid>
  ),
};

export const Bottom: Story = {
  name: 'BottomNav & BottomBar · В флоу',
  render: () => (
    <UsageGrid min={393}>
      <Usage screen="Outfits (Сегодня)"><div style={{ width: 393, paddingTop: 40 }}><BottomNav active="today" /></div></Usage>
      <Usage screen="Wardrobe" note="с FAB"><div style={{ width: 393, paddingTop: 40 }}><BottomNav active="wardrobe" fab /></div></Usage>
      <Usage screen="New Item / Completed"><div style={{ width: 393, paddingTop: 24 }}><BottomBar label="Добавить" /></div></Usage>
      <Usage screen="Wishlist / Item Details" note="+ вторичное действие"><div style={{ width: 393, paddingTop: 24 }}><BottomBar label="Переместить в гардероб" secondary={{ icon: 'external-link', label: 'Открыть в магазине' }} /></div></Usage>
      <Usage screen="Tab bar" note="все активные вкладки"><div style={{ display: 'grid', gap: 12, width: 353 }}>{(['today', 'search', 'wardrobe', 'stylist', 'profile'] as const).map((t) => <TabBar key={t} active={t} />)}</div></Usage>
    </UsageGrid>
  ),
};
