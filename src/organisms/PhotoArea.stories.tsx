import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhotoArea } from '.';
import { LoadingState } from '../molecules';

type Args = { state: 'empty' | 'photo' | 'loading' };

const meta: Meta<Args> = {
  title: 'Organisms/PhotoArea',
  tags: ['autodocs'],
  args: { state: 'empty' },
  argTypes: { state: { control: 'inline-radio', options: ['empty', 'photo', 'loading'] } },
  decorators: [(Story) => <div style={{ width: 353 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Область фото 353×353: пусто — синяя кнопка 48 с тенью + «Добавить фотографию» (gap 12); с фото — вещь и «×»; загрузка — LoadingState. Figma: `photo-area` · State, Label.' } } },
  render: ({ state }) => state === 'photo' ? <PhotoArea kind="container" onRemove={() => {}} /> : state === 'loading' ? <PhotoArea><LoadingState label="Удаляем фон" /></PhotoArea> : <PhotoArea />,
};
export default meta;
export const Playground: StoryObj<Args> = {};
