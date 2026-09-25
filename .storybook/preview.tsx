import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';
import './preview.css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'light';
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = theme;
  return (
    <div className="sb-canvas" data-theme={theme}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Тема',
      toolbar: {
        title: 'Тема',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Светлая', icon: 'sun' },
          { value: 'dark', title: 'Тёмная', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Старт',
          ['О проекте', 'Введение', 'Принципы', 'Атомарная система', 'Как пользоваться'],
          'Foundations',
          ['Токены и семантика', 'Типографика', 'Отступы и радиусы', 'Иконки', 'Скролл и края экрана', 'Тексты и тон'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
          'Процессы',
        ],
      },
    },
  },
};

export default preview;
