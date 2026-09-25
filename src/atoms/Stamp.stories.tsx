import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stamp } from '.';
import { Usage, UsageGrid } from '../docs/helpers';

const meta = {
  title: 'Atoms/Stamp',
  component: Stamp,
  tags: ['autodocs'],
  args: { label: 'Надеть', tone: 'primary', size: 'L', done: false },
  parameters: {
    docs: {
      description: {
        component: `Штамп — фирменная кнопка-звезда для **одного главного действия** поверх коллажа образа.
Не заменяет \`Button\` в формах и sheet'ах. Нажатие анимируется токеном \`--motion-stamp\` (см. Foundations / Анимации).`,
      },
    },
  },
} satisfies Meta<typeof Stamp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InFlow: Story = {
  name: 'В флоу',
  render: () => (
    <UsageGrid min={200}>
      <Usage screen="Outfits / Everyday" note="главное действие"><Stamp label="Надеть" /></Usage>
      <Usage screen="Outfits / Everyday" note="после нажатия — отменить"><Stamp label="Надеть" done /></Usage>
      <Usage screen="Stylist / С чем носить" note="сохранить образ"><Stamp label="Сохранить" /></Usage>
      <Usage screen="Stylist / С чем носить" note="перемешать, secondary S"><Stamp label="Перемешать" tone="secondary" size="S" icon="arrows-shuffle" /></Usage>
    </UsageGrid>
  ),
};
