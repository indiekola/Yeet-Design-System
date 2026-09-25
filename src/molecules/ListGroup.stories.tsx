import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListGroup, ListItem } from '.';
import { Icon } from '../atoms';
import { Usage, UsageGrid, withWidth } from '../docs/helpers';

type Args = { rows: string[]; trailing: 'external-link' | 'chevron-right' };

const meta: Meta<Args> = {
  title: 'Molecules/ListGroup',
  tags: ['autodocs'],
  args: { rows: ['Язык', 'Уведомления'], trailing: 'external-link' },
  argTypes: { trailing: { control: 'inline-radio', options: ['external-link', 'chevron-right'] } },
  decorators: [withWidth(353)],
  parameters: { docs: { description: { component: 'Карточка строк-переходов (Figma: `list-group`, слот Rows из `list-group / row`). ↗ — внешнее (системные настройки, ссылки), → — переход внутрь. Для пар «ключ — значение» — Field + InputGroup.' } } },
  render: ({ rows, trailing }) => <ListGroup>{rows.map((r) => <ListItem key={r} label={r} trailing={<Icon name={trailing} />} />)}</ListGroup>,
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const InFlow: Story = {
  parameters: { controls: { disable: true } },
  name: 'В флоу',
  decorators: [],
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Settings / Main" note="переход внутрь"><ListGroup><ListItem label="Корзина вещей" trailing={<Icon name="chevron-right" />} /></ListGroup></Usage>
      <Usage screen="Settings / Main" note="системные настройки"><ListGroup><ListItem label="Язык" trailing={<Icon name="external-link" />} /><ListItem label="Уведомления" trailing={<Icon name="external-link" />} /></ListGroup></Usage>
    </UsageGrid>
  ),
};
