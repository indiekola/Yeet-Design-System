import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';
import './preview.css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'light';
  const brand = (context.globals.brand as string) ?? 'blue';
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme;
    if (brand === 'blue') delete document.documentElement.dataset.brand;
    else document.documentElement.dataset.brand = brand;
  }
  return (
    <div className="sb-canvas" data-theme={theme} data-brand={brand === 'blue' ? undefined : brand}>
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
    brand: {
      description: 'Бренд-палитра',
      toolbar: {
        title: 'Бренд',
        icon: 'paintbrush',
        items: [
          { value: 'blue', title: 'Синий (текущий)' },
          { value: 'lime', title: 'Лайм (вариант)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', brand: 'blue' },
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
          ['Токены и семантика', 'Типографика', 'Отступы и радиусы', 'Иконки', 'Скролл и края экрана', 'Анимации', 'Тексты и тон'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
          'Процессы',
          ['Figma ↔ код', 'iOS и Android'],
        ],
      },
    },
  },
};

export default preview;
