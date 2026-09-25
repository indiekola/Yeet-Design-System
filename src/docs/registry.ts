/**
 * Реестр компонентов: одна точка правды для соответствия Figma ↔ код.
 * Из него строятся «Атомарная карта» и таблица «Figma ↔ код». Добавляешь компонент — добавь строку сюда.
 */
export type Level = 'Atoms' | 'Molecules' | 'Organisms' | 'Templates';

export type Entry = {
  code: string;
  /** Имя компонента на странице «Design System 2.0 (Claude)»; `null` — только в коде. */
  figma: string | null;
  level: Level;
  /** Секция Figma */
  section: string;
  /** Путь в Storybook */
  story: string;
  note?: string;
};

export const registry: Entry[] = [
  { code: 'Icon', figma: 'ui-icons/*', level: 'Atoms', section: '01 Foundations', story: 'Foundations/Иконки' },
  { code: 'Logo', figma: 'yeet', level: 'Atoms', section: '01 Foundations', story: 'Atoms/Basics' },
  { code: 'Button', figma: 'button', level: 'Atoms', section: '02 Actions', story: 'Atoms/Button' },
  { code: 'IconButton', figma: 'icon-button', level: 'Atoms', section: '02 Actions', story: 'Atoms/IconButton' },
  { code: 'Stamp', figma: 'stamp', level: 'Atoms', section: '02 Actions', story: 'Atoms/Stamp', note: 'анимация --motion-stamp' },
  { code: 'Badge', figma: 'badge', level: 'Atoms', section: '02 Actions', story: 'Atoms/Basics' },
  { code: 'Avatar', figma: 'avatar', level: 'Atoms', section: '07 Content', story: 'Atoms/Basics' },
  { code: 'Divider', figma: 'divider', level: 'Atoms', section: '09 System', story: 'Atoms/Basics' },
  { code: 'ColorDot', figma: 'color', level: 'Atoms', section: '01 Foundations', story: 'Atoms/Basics' },
  { code: 'Text', figma: 'text styles', level: 'Atoms', section: '01 Foundations', story: 'Atoms/Basics' },
  { code: 'ScrollEdge', figma: 'scroll-edge', level: 'Atoms', section: '05 Navigation & scroll', story: 'Templates/Screen' },

  { code: 'Field', figma: 'input (+ input-value)', level: 'Molecules', section: '03 Inputs', story: 'Molecules/Inputs' },
  { code: 'InputGroup', figma: 'input-group', level: 'Molecules', section: '03 Inputs', story: 'Molecules/Inputs' },
  { code: 'InputBar', figma: 'input-bar', level: 'Molecules', section: '03 Inputs', story: 'Molecules/Inputs' },
  { code: 'SegmentControl', figma: 'segment-control', level: 'Molecules', section: '04 Selection', story: 'Molecules/Selection' },
  { code: 'ChipGroup', figma: 'chip-group', level: 'Molecules', section: '04 Selection', story: 'Molecules/Selection' },
  { code: 'ListItem', figma: 'list-item', level: 'Molecules', section: '04 Selection', story: 'Molecules/Selection' },
  { code: 'ListGroup', figma: 'list-group', level: 'Molecules', section: '04 Selection', story: 'Molecules/Selection' },
  { code: 'RangeSlider', figma: 'range-slider', level: 'Molecules', section: '04 Selection', story: 'Molecules/Selection' },
  { code: 'StatTile', figma: 'stat-tile', level: 'Molecules', section: '07 Content', story: 'Molecules/Feedback & content' },
  { code: 'Hint', figma: 'hint', level: 'Molecules', section: '06 Overlays', story: 'Molecules/Feedback & content' },
  { code: 'Snackbar', figma: 'snackbar', level: 'Molecules', section: '06 Overlays', story: 'Molecules/Feedback & content' },
  { code: 'EmptyState', figma: 'empty-state', level: 'Molecules', section: '08 States', story: 'Molecules/Feedback & content' },
  { code: 'LoadingState', figma: 'loading-state', level: 'Molecules', section: '08 States', story: 'Molecules/Feedback & content' },
  { code: 'PhotoTile', figma: 'photo-tile', level: 'Molecules', section: '07 Content', story: 'Molecules/Feedback & content', note: 'поглотил brand-card' },
  { code: 'Carousel', figma: 'carousel', level: 'Molecules', section: '07 Content', story: 'Molecules/Feedback & content' },
  { code: 'BarChart', figma: 'bar-chart', level: 'Molecules', section: '07 Content', story: 'Molecules/Feedback & content' },
  { code: 'UsageMeter', figma: 'usage-meter', level: 'Molecules', section: '07 Content', story: 'Molecules/Feedback & content' },

  { code: 'StatusBar', figma: 'system / status-bar', level: 'Organisms', section: '09 System', story: 'Templates/Screen', note: 'только для макетов' },
  { code: 'Header', figma: 'header', level: 'Organisms', section: '05 Navigation & scroll', story: 'Organisms/Navigation' },
  { code: 'TabBar', figma: 'tab-bar', level: 'Organisms', section: '05 Navigation & scroll', story: 'Organisms/Navigation' },
  { code: 'BottomNav', figma: 'bottom-nav', level: 'Organisms', section: '05 Navigation & scroll', story: 'Organisms/Navigation' },
  { code: 'BottomBar', figma: 'bottom-bar', level: 'Organisms', section: '05 Navigation & scroll', story: 'Organisms/Navigation' },
  { code: 'Sheet', figma: 'sheet', level: 'Organisms', section: '06 Overlays', story: 'Organisms/Sheet & Dialog' },
  { code: 'Dialog', figma: 'dialog', level: 'Organisms', section: '06 Overlays', story: 'Organisms/Sheet & Dialog' },
  { code: 'ItemCard', figma: 'item-card', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'ProductCard', figma: 'product-card', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'OutfitCollage', figma: 'outfit-collage', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'OutfitThumbnail', figma: 'outfit-thumbnail', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'PhotoArea', figma: 'photo-area', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'WeatherCard', figma: 'weather-card', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'ChatBubble', figma: 'chat-bubble', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'StylistPromptCard', figma: 'stylist-prompt-card', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },
  { code: 'TripCard', figma: 'trip-card', level: 'Organisms', section: '07 Content', story: 'Organisms/Cards & media' },

  { code: 'Screen', figma: 'Screen patterns', level: 'Templates', section: '10 Screen patterns', story: 'Templates/Screen' },
  { code: 'Grid', figma: 'auto layout 2 × 173, gap 8/7', level: 'Templates', section: '10 Screen patterns', story: 'Pages/Экраны флоу' },
  { code: 'Row', figma: 'auto layout, horizontal', level: 'Templates', section: '10 Screen patterns', story: 'Pages/Экраны флоу' },
];
