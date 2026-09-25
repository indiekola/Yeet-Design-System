import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from '.';
import { ItemCard } from '../organisms';

type Args = { title: string; itemWidth: number; count: number };

const meta: Meta<Args> = {
  title: 'Molecules/Carousel',
  tags: ['autodocs'],
  args: { title: 'Чаще всего надевалось', itemWidth: 173, count: 4 },
  argTypes: { itemWidth: { control: { type: 'range', min: 120, max: 240 } }, count: { control: { type: 'range', min: 1, max: 8 } } },
  decorators: [(Story) => <div style={{ width: 393, padding: '0 20px', boxSizing: 'border-box', overflow: 'hidden' }}><Story /></div>],
  parameters: { docs: { description: { component: 'Горизонтальная лента со snap, выходит за поля экрана. Figma: `carousel` · Title, слот Cards (любые карточки).' } } },
  render: ({ title, itemWidth, count }) => (
    <Carousel title={title} itemWidth={itemWidth}>
      {Array.from({ length: count }, (_, i) => <ItemCard key={i} kind={i % 2 ? 'top' : 'bottom'} color={i % 2 ? 'green' : 'black'} label={`${30 - i * 7} раз`} />)}
    </Carousel>
  ),
};
export default meta;
export const Playground: StoryObj<Args> = {};
