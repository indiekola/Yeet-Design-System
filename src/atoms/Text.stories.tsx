import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, Text } from '.';
import { Column } from '../docs/helpers';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  args: { variant: 'h1', tone: 'primary', children: 'Гардероб' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['h1', 'h2', 'h3', 'body', 'caption'] },
    tone: { control: 'inline-radio', options: ['primary', 'secondary', 'accent', 'danger'] },
    children: { control: 'text' },
  },
  parameters: { docs: { description: { component: 'Пять текстовых стилей Figma: H1 · H2 · H3 (Roboto Slab) · Body · Caption (Inter). `Divider` — разделитель 1px.' } } },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Scale: Story = {
  parameters: { controls: { disable: true } },
  name: 'Все стили',
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
