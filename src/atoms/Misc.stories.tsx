import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Badge, ColorDot, Divider, Logo, Text } from '.';
import { Column, Usage, UsageGrid } from '../docs/helpers';
import { itemColors } from '../tokens/tokens';

const meta = {
  title: 'Atoms/Basics',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Мелкие атомы: `Badge`, `Avatar`, `ColorDot`, `Divider`, `Text`. Не содержат других компонентов.' } } },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Badges: Story = {
  render: () => (
    <UsageGrid min={160}>
      {(['primary', 'danger', 'secondary', 'muted', 'tertiary', 'ghost'] as const).map((v) => (
        <Usage key={v} screen={v} note={v === 'danger' ? 'скидка на товаре' : v === 'secondary' ? 'счётчик вещей в поездке' : undefined}>
          <Badge variant={v}>{v === 'danger' ? '-10%' : v === 'secondary' ? '×5' : 'Badge'}</Badge>
        </Usage>
      ))}
    </UsageGrid>
  ),
};

export const Avatars: Story = {
  render: () => (
    <UsageGrid min={160}>
      <Usage screen="Profile / Edit" note="нет фото"><Avatar size="L" /></Usage>
      <Usage screen="Profile" note="буква"><Avatar size="L" initial="С" /></Usage>
      <Usage screen="Settings" note="строка профиля"><Avatar size="M" initial="С" /></Usage>
      <Usage screen="Tab bar" note="профиль"><Avatar size="S" initial="С" /></Usage>
    </UsageGrid>
  ),
};

export const ItemColorDots: Story = {
  name: 'Цвета вещей',
  render: () => (
    <UsageGrid min={120}>
      {itemColors.map(([id, ru, hex]) => (
        <Usage key={id} screen={ru} note={hex}><ColorDot color={id} size={24} /></Usage>
      ))}
    </UsageGrid>
  ),
};

export const Typography: Story = {
  name: 'Text',
  render: () => (
    <Column gap={12}>
      <Text variant="h1">Гардероб</Text>
      <Text variant="h2">Гардероб пуст</Text>
      <Text variant="h3">Название вещи</Text>
      <Text variant="body">Добавь первую вещь, чтобы начать создавать образы</Text>
      <Text variant="body" tone="secondary">Вторичный текст</Text>
      <Text variant="caption" tone="secondary">Продолжая, вы соглашаетесь с политикой конфиденциальности</Text>
      <Divider />
    </Column>
  ),
};

export const LogoMark: Story = {
  name: 'Logo',
  render: () => (
    <UsageGrid min={200}>
      <Usage screen="App / Splash" note="on-accent на синем">
        <div style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', padding: '32px 40px', borderRadius: 20 }}><Logo height={48} /></div>
      </Usage>
      <Usage screen="Settings / Main" note="подвал, secondary">
        <div style={{ color: 'var(--color-text-secondary)' }}><Logo height={28} /></div>
      </Usage>
    </UsageGrid>
  ),
};
