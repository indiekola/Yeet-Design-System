# yeet · Design System

Дизайн-система приложения **YeetStyle** — умного гардероба.

| Где | Что |
|---|---|
| **Storybook** · GitHub Pages | Живые компоненты, правила, «В флоу» — для продукта, разработки и дизайна |
| **Figma** · YeetStyle 2.0 → «Design System 2.0 (Claude)» | Компоненты и варианты, переменные Yeet DS 2.0 (Light / Dark) |
| [`DESIGN.md`](./DESIGN.md) | Полная текстовая спецификация |

## Структура

```
src/
  tokens/      3 слоя токенов: примитивы → семантика → компонентные (CSS + метаданные)
  icons/       линейные иконки из Figma
  atoms/       Button, IconButton, Icon, Badge, Avatar, ColorDot, Divider, Text, ScrollEdge
  molecules/   Field, InputGroup, InputBar, SegmentControl, ChipGroup, ListItem, StatTile, Hint,
               Snackbar, EmptyState, LoadingState, PhotoTile
  organisms/   Header, TabBar, BottomNav, BottomBar, Sheet, Dialog, ItemCard, ProductCard,
               OutfitCollage, PhotoArea, WeatherCard, ChatBubble
  templates/   Screen — каркас экрана со скроллом под навигацией
  pages/       экраны флоу, собранные из компонентов (stories)
  docs/        страницы документации Storybook (MDX)
```

## Запуск

```bash
npm ci
npm run storybook        # http://localhost:6006
npm run build-storybook  # статическая сборка в storybook-static/
```

## Публикация

Workflow `.github/workflows/storybook.yml` собирает Storybook и публикует на GitHub Pages при пуше в `main`
или `claude/figma-access-ara4o8`. Один раз нужно включить Pages: **Settings → Pages → Source: GitHub Actions**.
