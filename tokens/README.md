# tokens/ — источник токенов

`tokens.json` — единый источник для web, iOS и Android в формате **DTCG** ([designtokens.org](https://www.designtokens.org/), 2025.10).
`npm run tokens` собирает из него через **Style Dictionary v5**:

| Вывод | Формат |
|---|---|
| `src/tokens/tokens.generated.css` | CSS-переменные, темы `[data-theme]`, бренды `[data-brand]` |
| `tokens/ios/YeetTokens.swift`, `native/ios/…/Generated/YeetTokens.swift` | SwiftUI |
| `tokens/android/YeetTokens.kt`, `native/android/…/YeetTokens.kt` | Jetpack Compose |

Сгенерированные файлы руками не правятся. CI пересобирает их и падает, если они разошлись с `tokens.json`.

## Как устроен токен

```json
"bg-canvas": {
  "$value": "{primitive.neutral-0}",
  "$description": "Фон экрана",
  "$extensions": { "com.yeet": { "figma": "ui-colors/white", "modes": { "dark": "{primitive.graphite-950}" } } }
}
```

- `$type` задаётся у токена или у группы (наследуется). Типы — из DTCG (`color`, `dimension`, `duration`, `cubicBezier`, `number`, `fontFamily`, `typography`, `shadow`, `transition`, …) и два своих: `spring`, `haptic` (описаны в корневом `$extensions["com.yeet"].customTypes`).
- Цвет — `{ "colorSpace": "srgb", "components": [r, g, b], "alpha"?: a, "hex": "#RRGGBB" }`; прозрачный — `alpha: 0`.
- Размеры и время — `{ "value": 16, "unit": "px" }`, `{ "value": 150, "unit": "ms" }`.
- Ссылка — полный путь: `{color.content.text-accent}`, `{radius.lg}`.
- **Темы:** `$value` — светлая, `$extensions["com.yeet"].modes.dark` — тёмная (если нет — как светлая).
- **Бренды:** группа `brand.<id>` переопределяет семантические цвета `color.*` по имени; название и описание — `$extensions["com.yeet"].brand`.
- Метаданные проекта (роль в Figma, название цвета вещи, iOS/Android-детали) — только в `$extensions["com.yeet"]`.

## Проверка

`scripts/tokens/dtcg.mjs` проверяет схему до сборки: неизвестный `$type`, значение не по типу, битая ссылка, ссылка на токен другого типа, цикл, неизвестная тема, бренд с несуществующим цветом — сборка падает со списком ошибок. Тесты валидатора: `node --test scripts/tokens/dtcg.test.mjs` (в CI — `qa.yml`).

## Код сборки

- `scripts/build-tokens.mjs` — конфигурация Style Dictionary.
- `scripts/tokens/transforms.mjs` — трансформы: пружина → CSS `linear()`, px → pt / dp / sp, цвета под платформы, имена с экранированием ключевых слов Swift / Kotlin.
- `scripts/tokens/formats.mjs` — форматы CSS / Swift / Kotlin.
- `src/tokens/model.js` — чтение токенов из кода (Storybook, утилиты, скрипты контраста и DESIGN.md) в плоской форме: `tokens.color`, `tokens.brand`, `tokens.motion.gesture`… Типы — `model.d.ts`.

## Быстрая замена и подстройка бренд-палитры

Пока палитра не выбрана, её меняют одной командой, без ручной правки `tokens.json` (`scripts/tokens/brand.mjs`):

```bash
# новая или пересобранная палитра из акцента (+ по желанию чернила и холст)
npm run brand -- new coral --accent "#FF5A4A" --name "Коралл"
npm run brand -- new coral --accent "#FF5A4A" --ink "#1D1716" --canvas "#F9F4F3"   # свои цвета поверхностей
npm run brand -- new coral --accent "#FF5A4A" --fit    # сдвинуть акцент к ближайшему, где проходит контраст
npm run brand -- list                                  # палитры и акценты
npm run brand -- remove coral
npm run brand -- promote coral                         # палитра становится основной темой (color.*), brand.coral удаляется
```

- `new` собирает все 14 семантических цветов (светлая и тёмная тема), подгоняет `text-secondary`, `text-accent`, `text-on-accent`, `text-danger` под контраст WCAG (текст 4.5:1) и сразу запускает `npm run tokens` и `npm run contrast -- --set=<id> --brands=error`. Провалы печатаются вместе с ближайшим цветом акцента, который проходит. Повторный запуск с тем же id заменяет палитру.
- Файл правится точечно и в формате самого `tokens.json` (сериализатор проверен тестом на существующих палитрах); остальные токены не меняются. Сгенерированные CSS / Swift / Kotlin обновляются через `npm run tokens`.
- `promote` переносит цвета бренда в `color.*`, не трогая роли Figma. Дальше вручную: новая ADR вместо [0002](../design/adr/0002-brand-palettes-experiment.md), переменные «Yeet DS 2.0» в Figma (замок в #6), эталоны QA в закреплённом образе, чистка `KNOWN` в `check-contrast.mjs`.
- Бренды по-прежнему только web (`data-brand`) и Android (`YeetBrand`); iOS их не получает (ADR 0002).
- Тесты: `node --test scripts/tokens/brand.test.mjs`.
