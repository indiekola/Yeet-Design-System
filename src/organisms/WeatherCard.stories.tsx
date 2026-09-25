import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherCard } from '.';

const meta = {
  title: 'Organisms/WeatherCard',
  component: WeatherCard,
  tags: ['autodocs'],
  args: { temperature: '20°', description: 'Солнечно, ветер 14 км/ч', icon: 'sun' },
  argTypes: { icon: { control: 'inline-radio', options: ['sun', 'snowflake', 'leaf', 'flower'] }, weather: { control: 'select', options: [undefined, 'clear-day', 'clear-night', 'pcloudy-day', 'pcloudy-night', 'mcloudy', 'fog', 'rain', 'shower', 'tstorm', 'snow', 'windy'] } },
  parameters: { docs: { description: { component: 'Погода над коллажем: inverse, радиус 20/20/20/8, иконка + H2, Caption @70%. Figma: `weather-card` · Temperature, Description, Icon.' } } },
} satisfies Meta<typeof WeatherCard>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
