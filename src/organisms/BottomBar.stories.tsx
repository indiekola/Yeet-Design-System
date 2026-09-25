import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomBar } from '.';
import { Usage, UsageGrid } from '../docs/helpers';

type Args = { label: string; disabled: boolean; withSecondary: boolean };

const meta: Meta<Args> = {
  title: 'Organisms/BottomBar',
  tags: ['autodocs'],
  args: { label: 'Добавить', disabled: false, withSecondary: false },
  decorators: [(Story) => <div style={{ width: 393, paddingTop: 24 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Закреплённый CTA 100: полоса затухания 24 + Button Primary XL, опционально IconButton Secondary XL. Figma: `bottom-bar` · Secondary Action.' } } },
  render: ({ label, disabled, withSecondary }) => <BottomBar label={label} disabled={disabled} secondary={withSecondary ? { icon: 'external-link', label: 'Открыть в магазине' } : undefined} />,
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const InFlow: Story = {
  parameters: { controls: { disable: true } },
  name: 'В флоу',
  decorators: [],
  render: () => (
    <UsageGrid min={393}>
      <Usage screen="New Item / Completed"><div style={{ width: 393, paddingTop: 24 }}><BottomBar label="Добавить" /></div></Usage>
      <Usage screen="Wishlist / Item Details" note="+ вторичное действие"><div style={{ width: 393, paddingTop: 24 }}><BottomBar label="Переместить в гардероб" secondary={{ icon: 'external-link', label: 'Открыть в магазине' }} /></div></Usage>
    </UsageGrid>
  ),
};
