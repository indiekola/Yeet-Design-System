import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherCard } from '.';

const meta = {
  title: 'Organisms/WeatherCard',
  component: WeatherCard,
  tags: ['autodocs'],
  args: { temperature: '20°', description: 'Солнечно, ветер 14 км/ч', weather: 'sunny' },
  argTypes: { icon: { control: 'select', options: [undefined, 'sun', 'snowflake', 'leaf', 'flower'] }, alert: { control: 'text' }, tilt: { control: 'boolean' }, weather: { control: 'select', options: ['sunny', 'clear-day', 'clear-night', 'pcloudy-day', 'pcloudy-night', 'mcloudy', 'fog', 'rain', 'shower', 'tstorm', 'snow', 'windy'] } },
  parameters: { docs: { description: { component: 'Погода над коллажем (флоу Outfits / Everyday): inverse, радиус 20/20/20/8, паддинг 16/20, цветная иконка погоды 24 + температура Roboto Slab 24/24, подпись Inter 460 12/16 `text-inverse-secondary`, предупреждение второй строкой белым. На экране — наклон 10°. Figma: `weather-card` · Temperature, Description, Icon.' } } },
} satisfies Meta<typeof WeatherCard>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
