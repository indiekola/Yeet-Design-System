/** Token metadata for documentation. The source of truth for values is tokens.css. */

export type SemanticToken = {
  token: string;
  role: string;
  light: string;
  dark: string;
  figma: string;
};

export const semanticColors: { group: string; tokens: SemanticToken[] }[] = [
  {
    group: 'Поверхности',
    tokens: [
      { token: '--color-bg-canvas', role: 'Фон экрана', light: '#FFFFFF', dark: '#0F0F11', figma: 'ui-colors/white' },
      { token: '--color-bg-elevated', role: 'Поднятые поверхности: tab-bar, sheet, dialog, hint', light: '#FFFFFF', dark: '#1A1A1E', figma: 'ui-colors/elevated' },
      { token: '--color-bg-subtle', role: 'Карточки, поля, tertiary-кнопки', light: '#F7F7F7', dark: '#26262B', figma: 'ui-colors/light-grey' },
      { token: '--color-bg-inverse', role: 'Snackbar, Secondary-кнопка', light: '#000000', dark: '#F5F5F7', figma: 'ui-colors/black' },
      { token: '--color-bg-overlay', role: 'Затемнение под модальным sheet', light: 'rgba(0,0,0,.4)', dark: 'rgba(0,0,0,.6)', figma: 'ui-colors/overlay' },
    ],
  },
  {
    group: 'Контент',
    tokens: [
      { token: '--color-text-primary', role: 'Основной текст и иконки', light: '#000000', dark: '#F5F5F7', figma: 'ui-colors/black' },
      { token: '--color-text-secondary', role: 'Вторичный текст, лейблы, подписи', light: '#777777', dark: '#8E8E93', figma: 'ui-colors/grey' },
      { token: '--color-text-inverse', role: 'Текст на inverse-поверхности', light: '#FFFFFF', dark: '#0F0F11', figma: 'ui-colors/white' },
      { token: '--color-text-on-accent', role: 'Текст и иконки на accent / danger', light: '#FFFFFF', dark: '#FFFFFF', figma: 'ui-colors/on-accent' },
      { token: '--color-text-accent', role: 'Акцентный текст, выбранное', light: '#0100F4', dark: '#5B5BFF', figma: 'ui-colors/blue' },
      { token: '--color-text-danger', role: 'Ошибки, деструктивные действия', light: '#FF4230', dark: '#FF5A4A', figma: 'ui-colors/red' },
    ],
  },
  {
    group: 'Акцент, обратная связь, линии',
    tokens: [
      { token: '--color-accent', role: 'Главное действие, выбранное, фокус', light: '#0100F4', dark: '#5B5BFF', figma: 'ui-colors/blue' },
      { token: '--color-accent-soft', role: 'Фон выбранного чипса (Soft)', light: 'blue @10%', dark: 'blue @20%', figma: 'ui-colors/blue-10%' },
      { token: '--color-danger', role: 'Удаление, ошибка, бейдж', light: '#FF4230', dark: '#FF5A4A', figma: 'ui-colors/red' },
      { token: '--color-danger-soft', role: 'Фон Destructive-кнопки', light: 'red @10%', dark: 'red @18%', figma: 'ui-colors/red-10%' },
      { token: '--color-border-subtle', role: 'Разделители, обводки свотчей', light: 'black @10%', dark: 'white @12%', figma: 'ui-colors/black-10%' },
    ],
  },
];

export const itemColors = [
  ['black', 'Чёрный', '#1A1A2E'],
  ['grey', 'Серый', '#777777'],
  ['white', 'Белый', '#FFFFFF'],
  ['purple', 'Фиолетовый', '#6A00FF'],
  ['pink', 'Розовый', '#D900FF'],
  ['green', 'Зелёный', '#00D08B'],
  ['blue', 'Синий', '#0100F4'],
  ['yellow', 'Жёлтый', '#FFD000'],
  ['orange', 'Оранжевый', '#FF8800'],
  ['red', 'Красный', '#FF4230'],
  ['beige', 'Бежевый', '#FFE1C7'],
  ['brown', 'Коричневый', '#C26547'],
] as const;

export type ItemColor = (typeof itemColors)[number][0];

export const spaces = [0, 1, 2, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 52, 56, 64, 72];

export const radii = [
  ['--radius-xs', 4, 'Хэндл sheet'],
  ['--radius-sm', 12, 'Badge'],
  ['--radius-md', 16, 'Snackbar'],
  ['--radius-lg', 20, 'Карточки, поля, фото'],
  ['--radius-xl', 32, 'Кнопки-капсулы, верх sheet'],
  ['--radius-bar', 48, 'Tab-bar'],
  ['--radius-full', 999, 'Аватар, радио'],
] as const;

export const textStyles = [
  ['y-h1', 'H1', 'Roboto Slab 380 · 32/36 · −1', 'Заголовки экранов'],
  ['y-h2', 'H2', 'Roboto Slab 400 · 24/28 · −0.4', 'Секции, пустые состояния, числа'],
  ['y-h3', 'H3', 'Roboto Slab 400 · 19/24 · −0.3', 'Заголовки sheet, диалогов, карточек'],
  ['y-body', 'Body', 'Inter 500 · 14/20', 'Текст, кнопки, пункты списков'],
  ['y-caption', 'Caption', 'Inter 400 · 12/16', 'Подписи, мета-данные, бейджи'],
] as const;
