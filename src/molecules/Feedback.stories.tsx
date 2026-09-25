import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, Carousel, EmptyState, Hint, UsageMeter, LoadingState, PhotoTile, Snackbar, StatRow, StatTile } from '.';
import { Column, Usage, UsageGrid } from '../docs/helpers';

const meta = {
  title: 'Molecules/Feedback & content',
  component: EmptyState,
  tags: ['autodocs'],
  args: { title: 'Гардероб пуст', description: 'Добавь первую вещь, чтобы начать создавать образы' },
  parameters: { docs: { description: { component: 'Обратная связь и мелкий контент: пустые состояния, загрузка, тосты, подсказки, статистика, плитки фото.' } } },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { name: 'EmptyState' };

export const EmptyInFlow: Story = {
  name: 'EmptyState · В флоу',
  render: () => (
    <UsageGrid min={300}>
      <Usage screen="Wardrobe / Items / Empty"><EmptyState title="Гардероб пуст" description="Добавь первую вещь, чтобы начать создавать образы" /></Usage>
      <Usage screen="Wardrobe / Outfits / Empty"><EmptyState title="Образов ещё нет" description="Собери первый образ из своих вещей" /></Usage>
      <Usage screen="Archive / Empty"><EmptyState title="Архив пуст" description="Сюда попадают вещи, убранные из гардероба" /></Usage>
      <Usage screen="Search / No Results" note="с действием"><EmptyState title="Упс, не нашли" description="Измени запрос или попробуй поискать что-то другое" action={{ label: 'Сбросить поиск' }} /></Usage>
    </UsageGrid>
  ),
};

export const Loading: Story = {
  name: 'LoadingState · В флоу',
  render: () => (
    <UsageGrid min={200}>
      <Usage screen="New Item" note="удаление фона"><LoadingState label="Удаляем фон" /></Usage>
      <Usage screen="Stylist"><LoadingState label="Собираю образы из твоих вещей…" /></Usage>
      <Usage screen="Search / Photo"><LoadingState label="Ищем похожие вещи…" /></Usage>
    </UsageGrid>
  ),
};

export const Toasts: Story = {
  name: 'Snackbar · В флоу',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Wardrobe / Item"><Snackbar onClose={() => {}}>Перемещено в архив</Snackbar></Usage>
      <Usage screen="Search / Result"><Snackbar onClose={() => {}}>Добавлено в вишлист</Snackbar></Usage>
      <Usage screen="Trash / Item"><Snackbar onClose={() => {}}>Удалено навсегда</Snackbar></Usage>
    </UsageGrid>
  ),
};

export const Hints: Story = {
  name: 'Hint · В флоу',
  render: () => (
    <UsageGrid min={260}>
      <Usage screen="Outfit Creation / Canvas"><Hint>Перемещай и масштабируй вещи</Hint></Usage>
      <Usage screen="Search / Photo / Crop"><Hint>Перемещай и масштабируй фото</Hint></Usage>
    </UsageGrid>
  ),
};

export const Stats: Story = {
  name: 'StatTile · В флоу',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Wardrobe / Outfit Details"><StatRow><StatTile label="Надето раз" value={8} /><StatTile label="Д. простоя" value={1} /><StatTile label="Вещи" value={4} /></StatRow></Usage>
      <Usage screen="Dialog · Delete Account"><StatRow><StatTile label="Вещи" value={43} /><StatTile label="Образы" value={12} /><StatTile label="Вишлист" value={12} /></StatRow></Usage>
    </UsageGrid>
  ),
};

export const PhotoTiles: Story = {
  name: 'PhotoTile · В флоу',
  render: () => (
    <Column>
      <div style={{ display: 'flex', gap: 8 }}><PhotoTile source="gallery" /><PhotoTile source="camera" /></div>
    </Column>
  ),
};

export const Analytics: Story = {
  name: 'Аналитика: графики и лента',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Profile / Analytics" note="доля гардероба" width={353}><UsageMeter percent={11} /></Usage>
      <Usage screen="Profile / Analytics" note="по категориям" width={353}>
        <BarChart bars={[{ label: 'Верхняя одежда', icon: 'outerwear', value: 5 }, { label: 'Верх', icon: 'top', value: 50 }, { label: 'Обувь', icon: 'shoe', value: 10 }, { label: 'Аксессуары', icon: 'accessories', value: 30 }, { label: 'Низ', icon: 'bottom', value: 5 }]} />
      </Usage>
      <Usage screen="Profile / Analytics" note="по цветам" width={353}>
        <BarChart height={180} bars={[{ label: 'Синий', color: 'blue', value: 13 }, { label: 'Чёрный', color: 'black', value: 62 }, { label: 'Коричневый', color: 'brown', value: 25 }]} />
      </Usage>
      <Usage screen="Profile / Analytics" note="лента карточек" width={353}>
        <div style={{ width: 353, overflow: 'hidden', padding: '0 20px', boxSizing: 'content-box', marginLeft: -20 }}>
          <Carousel title="Чаще всего надевалось" itemWidth={150}>
            {[1, 2, 3].map((i) => <div key={i} style={{ height: 150, borderRadius: 20, background: 'var(--card-bg)' }} />)}
          </Carousel>
        </div>
      </Usage>
    </UsageGrid>
  ),
};
