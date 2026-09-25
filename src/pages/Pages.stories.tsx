import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Icon, IconButton, Logo, Stamp } from '../atoms';
import { BarChart, Carousel, ChipGroup, EmptyState, Field, InputBar, InputGroup, List, ListGroup, ListItem, LoadingState, PhotoTile, RangeSlider, SegmentControl, Snackbar, StatRow, StatTile, UsageMeter } from '../molecules';
import { BottomBar, BottomNav, type CanvasItem, ChatBubble, Dialog, OutfitCanvas, type Garment, Header, ItemCard, OutfitCollage, Overlay, PhotoArea, ProductCard, Sheet, StatusBar, StylistPromptCard, TripCard, WeatherCard } from '../organisms';
import { Grid, Row, Screen } from '../templates';
import type { ItemColor } from '../tokens/tokens';

const meta = {
  title: 'Pages/Экраны флоу',
  parameters: {
    layout: 'centered', controls: { disable: true }, options: { showPanel: false },
    docs: { description: { component: 'Экраны флоу, собранные **только** из компонентов системы. Названия — как в Figma (`Раздел / Экран / Состояние`).' } },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const grid: Garment[] = ['top', 'container', 'bottom', 'shoe', 'outerwear', 'accessories', 'top', 'bottom'];

export const OnboardingWelcome: Story = {
  parameters: { controls: { disable: true } },
  name: 'Onboarding / Welcome',
  render: () => (
    <Screen bottom={<BottomBar label="Начать бесплатно" />}>
      <h1 className="y-h1" style={{ marginTop: 8 }}>Полный шкаф,<br />а надеть нечего?</h1>
      <p className="y-body y-text--secondary">Создавай образы из своих вещей, находи похожие и покупай то, что действительно подходит твоему стилю</p>
      <OutfitCollage items={[{ kind: 'top', x: 68, y: 32, color: 'green' }, { kind: 'bottom', x: 30, y: 58, size: 140, color: 'green' }, { kind: 'accessories', x: 32, y: 20, size: 64 }, { kind: 'shoe', x: 70, y: 76, size: 80, color: 'brown' }]} />
    </Screen>
  ),
};

export const SignIn: Story = {
  parameters: { controls: { disable: true } },
  name: 'Auth / Sign In',
  render: () => (
    <Screen header={<Header type="back" title="Вход и регистрация" />}>
      <InputGroup>
        <Field label="E-mail" input={{ type: 'email' }} />
        <Field label="Пароль" input={{ type: 'password' }} trailingIcon="eye" />
      </InputGroup>
      <Button size="XL" fullWidth>Войти</Button>
      <Button variant="ghost" size="M">Забыли пароль?</Button>
      <Button variant="secondary" size="XL" leftIcon="apple" fullWidth>Войти с Apple</Button>
      <p className="y-caption y-text--secondary" style={{ textAlign: 'center', marginTop: 'auto' }}>Продолжая, вы соглашаетесь с политикой конфиденциальности и условиями использования</p>
    </Screen>
  ),
};

export const Today: Story = {
  parameters: { controls: { disable: true } },
  name: 'Outfits / Everyday / Sunny',
  render: () => (
    <Screen header={<Header type="large" title="Твои образы" subtitle="на каждый день" />} bottom={<BottomNav active="today" />}>
      <ChipGroup chips={[{ label: 'На каждый день', selected: true }, { label: 'Работа' }, { label: 'Свидание' }, { label: 'Вечеринка' }]} />
      <div style={{ position: 'relative' }}>
        <OutfitCollage items={[{ kind: 'top', x: 68, y: 32, color: 'green' }, { kind: 'bottom', x: 30, y: 58, size: 140, color: 'green' }, { kind: 'accessories', x: 32, y: 20, size: 64 }, { kind: 'shoe', x: 70, y: 76, size: 80, color: 'brown' }]} />
        <div style={{ position: 'absolute', top: -20, left: 16 }}><WeatherCard temperature="20°" description="Солнечно, ветер 14 км/ч" /></div>
        <div style={{ position: 'absolute', right: -8, bottom: -40 }}><Stamp label="Надеть" /></div>
      </div>
    </Screen>
  ),
};

export const Wardrobe: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wardrobe / Items / Populated',
  render: () => {
    const [tab, setTab] = useState('items');
    return (
      <Screen header={<Header type="large" title="Гардероб" />} bottom={<BottomNav active="wardrobe" fab />}>
        <SegmentControl value={tab} onChange={setTab} segments={[{ value: 'items', label: 'Вещи' }, { value: 'outfits', label: 'Образы' }, { value: 'wishlist', label: 'Вишлист' }]} />
        <Row gap={4}>
          <IconButton icon="search" label="Поиск" size="S" />
          <IconButton icon="archive" label="Архив" size="S" />
          <ChipGroup chips={[{ label: 'Категория', dropdown: true }, { label: 'Сезон', dropdown: true }, { label: 'Теги', dropdown: true }]} />
        </Row>
        <Grid>{grid.map((k, i) => <ItemCard key={i} kind={k} />)}</Grid>
      </Screen>
    );
  },
};

export const WardrobeEmpty: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wardrobe / Items / Empty',
  render: () => (
    <Screen header={<Header type="large" title="Гардероб" />} bottom={<BottomNav active="wardrobe" fab />}>
      <SegmentControl value="items" segments={[{ value: 'items', label: 'Вещи' }, { value: 'o', label: 'Образы' }, { value: 'w', label: 'Вишлист' }]} />
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <EmptyState title="Гардероб пуст" description="Добавь первую вещь, чтобы начать создавать образы" />
      </div>
    </Screen>
  ),
};

export const ItemDetails: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wishlist / Item Details',
  render: () => (
    <Screen header={<Header type="bar" actions={[{ icon: 'more', label: 'Ещё' }]} />} bottom={<BottomBar label="Переместить в гардероб" secondary={{ icon: 'external-link', label: 'Открыть в магазине' }} />} flush>
      <div style={{ padding: '0 20px' }}><PhotoArea kind="container" /></div>
      <Sheet type="panel" title="Сумка">
        <p className="y-body y-text--secondary">10 000 ₽ · Sander · Чёрный<br />Аксессуары · Все сезоны</p>
        <p className="y-body" style={{ background: 'var(--color-bg-subtle)', borderRadius: 20, padding: '16px 20px' }}>Мягкая сумка округлой формы с логотипом и кожаным ремешком</p>
        <h3 className="y-h3">Образы с этой вещью</h3>
        <Grid><ItemCard kind="top" /><ItemCard kind="bottom" /></Grid>
      </Sheet>
    </Screen>
  ),
};

export const OutfitDetails: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wardrobe / Outfit Details / Scrolled',
  render: () => (
    <Screen header={<Header type="bar" actions={[{ icon: 'pen', label: 'Редактировать' }, { icon: 'more', label: 'Ещё' }]} />} flush>
      <Sheet type="panel" title="На каждый день">
        <p className="y-body y-text--secondary">Все сезоны</p>
        <StatRow><StatTile label="Надето раз" value={8} /><StatTile label="Д. простоя" value={1} /><StatTile label="Вещи" value={4} /></StatRow>
        <h3 className="y-h3">Теги</h3>
        <ChipGroup wrap chips={[{ label: 'Тег #1' }, { label: 'Тег #2' }, { label: 'Тег #3' }, { label: 'Тег #4' }]} />
        <h3 className="y-h3">Вещи из образа</h3>
        <Grid><ItemCard kind="top" color="green" /><ItemCard kind="bottom" color="green" /><ItemCard kind="shoe" color="brown" /><ItemCard kind="accessories" /></Grid>
      </Sheet>
    </Screen>
  ),
};

export const SearchResults: Story = {
  parameters: { controls: { disable: true } },
  name: 'Search / Text / Results',
  render: () => (
    <Screen header={<Header type="search" query="Белые кроссовки" filters={[{ label: 'Сортировка' }, { label: 'Цена' }]} />}>
      <Grid rowGap={16}>
        {['Nike Air Force 1 ’07', 'Nike Ava Edge', 'Adidas Samba', 'New Balance 550', 'Puma Palermo', 'Vans Old Skool'].map((n, i) => (
          <ProductCard key={n} kind="shoe" name={n} price={`${(10400 + i * 1300).toLocaleString('ru-RU')} ₽`} discount={i % 2 ? undefined : '-10%'} liked={i === 1} />
        ))}
      </Grid>
    </Screen>
  ),
};

export const SearchEmpty: Story = {
  parameters: { controls: { disable: true } },
  name: 'Search / Text / No Results Filtered',
  render: () => (
    <Screen header={<Header type="search" query="asdasd" filters={[{ label: 'Сначала дешевле', selected: true }, { label: 'до 60 000 ₽', selected: true }]} />} center>
      <EmptyState title="Упс, не нашли" description="Измени запрос или попробуй поискать что-то другое" action={{ label: 'Сбросить поиск' }} />
    </Screen>
  ),
};

export const NewItem: Story = {
  parameters: { controls: { disable: true } },
  name: 'New Item / Removing Background',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Новая вещь" />} bottom={<BottomBar label="Добавить" disabled />}>
      <PhotoArea><LoadingState label="Удаляем фон" /></PhotoArea>
      <h2 className="y-h2">Детали вещи</h2>
      <InputGroup><Field label="Название" input={{}} /><Field label="Стоимость" input={{ inputMode: 'numeric' }} /></InputGroup>
      <InputGroup><Field label="Категория" value="Аксессуары" trailingIcon="chevron-up-down" /><Field label="Цвет" value="Чёрный" colorDot="black" trailingIcon="chevron-up-down" /></InputGroup>
    </Screen>
  ),
};

function CanvasScreen() {
  const wardrobe: { id: string; kind: Garment; color: ItemColor }[] = [
    { id: 'bottom', kind: 'bottom', color: 'green' }, { id: 'shoes', kind: 'shoe', color: 'brown' },
    { id: 'top', kind: 'top', color: 'green' }, { id: 'glasses', kind: 'accessories', color: 'black' },
  ];
  const spots: Record<string, Pick<CanvasItem, 'x' | 'y' | 'size'>> = { bottom: { x: 30, y: 58, size: 140 }, shoes: { x: 72, y: 76, size: 72 }, top: { x: 66, y: 34 }, glasses: { x: 32, y: 18, size: 56 } };
  const [items, setItems] = useState<CanvasItem[]>(wardrobe.slice(0, 2).map((w) => ({ ...w, ...spots[w.id] })));
  const [selected, setSelected] = useState<string>();
  const [hint, setHint] = useState(true);
  const toggle = (w: (typeof wardrobe)[number]) =>
    setItems((cur) => (cur.some((c) => c.id === w.id) ? cur.filter((c) => c.id !== w.id) : [...cur, { ...w, ...spots[w.id] }]));
  return (
    <Screen
      header={<Header type="bar" center={<SegmentControl size="M" fit value="canvas" segments={[{ value: 'items', icon: 'wardrobe' }, { value: 'canvas', icon: 'collage' }, { value: 'info', icon: 'info' }]} />} actions={[{ icon: 'arrows-shuffle', label: 'Перемешать' }]} />}
      bottom={<BottomBar label="Далее" />}
    >
      <OutfitCanvas items={items} onChange={setItems} selectedId={selected} onSelect={setSelected} hint={hint ? <Snackbar onClose={() => setHint(false)}>Перемещай и масштабируй вещи</Snackbar> : undefined} />
      <div style={{ margin: '0 calc(var(--screen-gutter) * -1)' }}>
        <Sheet type="panel" title="Гардероб">
          <ChipGroup chips={[{ label: 'Категория · 2', selected: true, dropdown: true }, { label: 'Зима', selected: true, dropdown: true }]} />
          <Grid>{wardrobe.map((w) => <ItemCard key={w.id} kind={w.kind} color={w.color} selected={items.some((c) => c.id === w.id)} onClick={() => toggle(w)} />)}</Grid>
        </Sheet>
      </div>
    </Screen>
  );
}

export const Canvas: Story = {
  parameters: { controls: { disable: true } },
  name: 'Outfit Creation / Canvas / Filtered',
  render: () => <CanvasScreen />,
};

export const Stylist: Story = {
  parameters: { controls: { disable: true } },
  name: 'Stylist / Assistant',
  render: () => (
    <Screen header={<Header type="large" title="Стилист" />} bottom={<div style={{ padding: '0 20px 20px' }}><InputBar placeholder="Спроси у стилиста" trailing={{ icon: 'arrow-up', label: 'Отправить', variant: 'primary' }} /></div>}>
      <div style={{ flex: 1 }} />
      <ChatBubble>Привет! Я твой ИИ-стилист. Спрашивай про образы, сочетания и что надеть сегодня</ChatBubble>
      <ChatBubble from="user">Что надеть на свидание вечером?</ChatBubble>
      <LoadingState label="Собираю образы из твоих вещей…" />
    </Screen>
  ),
};

export const FilterSheet: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wardrobe / Items / Sheet / Category',
  render: () => (
    <Screen
      header={<Header type="large" title="Гардероб" />}
      overlay={
        <Overlay>
          <Sheet title="Категория" footer={[{ label: 'Сбросить' }, { label: 'Применить' }]}>
            <List><ListItem type="expandable" icon="outerwear" label="Верхняя одежда" /><ListItem type="expandable" icon="top" label="Верх" expanded /></List>
            <ChipGroup wrap chips={[{ label: 'Футболка', selected: true }, { label: 'Поло' }, { label: 'Топ' }, { label: 'Рубашка' }]} />
            <List><ListItem type="expandable" icon="bottom" label="Низ" /><ListItem type="expandable" icon="shoe" label="Обувь" /><ListItem type="expandable" icon="accessories" label="Аксессуары" /></List>
          </Sheet>
        </Overlay>
      }
    >
      <Grid>{grid.map((k, i) => <ItemCard key={i} kind={k} />)}</Grid>
    </Screen>
  ),
};

export const ClearTrash: Story = {
  parameters: { controls: { disable: true } },
  name: 'Trash / Items / Dialog / Clear',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Корзина вещей" />} overlay={<Overlay><Dialog tone="destructive" title="Очистить корзину?" description="Все вещи из корзины удаляются навсегда, их уже не вернуть" cancel="Отмена" confirm="Очистить" /></Overlay>}>
      <Grid>{grid.slice(0, 4).map((k, i) => <ItemCard key={i} kind={k} />)}</Grid>
    </Screen>
  ),
};

export const Toast: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wardrobe / Item / Toast',
  render: () => (
    <Screen header={<Header type="large" title="Гардероб" />} bottom={<BottomNav active="wardrobe" fab />} floating={<Snackbar onClose={() => {}}>Перемещено в архив</Snackbar>}>
      <Grid>{grid.map((k, i) => <ItemCard key={i} kind={k} />)}</Grid>
    </Screen>
  ),
};

/* ─── Добавлено при синхронизации с флоу ─────────────────────────────── */

export const Splash: Story = {
  parameters: { controls: { disable: true } },
  name: 'App / Splash',
  render: () => (
    <div style={{ width: 'var(--screen-width)', height: 'var(--screen-height)', borderRadius: 48, overflow: 'hidden', background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar onAccent />
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}><Logo height={56} /></div>
    </div>
  ),
};

export const SearchDiscover: Story = {
  parameters: { controls: { disable: true } },
  name: 'Search / Discover',
  render: () => (
    <Screen header={<Header type="large" title="Поиск в сторах" subtitle="Нашли классную вещь? Покажем, где купить такую же или похожую." />} bottom={<BottomNav active="search" />}>
      <Row gap={8}>
        <PhotoTile source="gallery" />
        <PhotoTile source="camera" />
      </Row>
      <InputBar placeholder="Белые кроссовки Nike" fieldIcon="search" />
      <ChipGroup wrap chips={['Nike', 'Crocs', 'Marine Serre', 'Белое платье с красными вкраплениями', 'JACQUEMUS', 'Обувь для бега'].map((label) => ({ label }))} />
    </Screen>
  ),
};

export const StylistHome: Story = {
  parameters: { controls: { disable: true } },
  name: 'Stylist / Home',
  render: () => (
    <Screen header={<Header type="large" title="Стилист" />} bottom={<BottomNav active="stylist" />}>
      <Grid>
        <StylistPromptCard label="Образ дня" />
        <StylistPromptCard label="Конструктор" />
        <StylistPromptCard label="Для поездки" />
        <StylistPromptCard label="Чат со стилистом" />
      </Grid>
    </Screen>
  ),
};

const tripArt = (a: Garment, b: Garment, c: Garment) => [{ kind: a, x: 70, y: 28, size: 44 }, { kind: b, x: 28, y: 62, size: 72 }, { kind: c, x: 74, y: 66, size: 64 }];

export const Trips: Story = {
  parameters: { controls: { disable: true } },
  name: 'Stylist / Trips / List',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Все для поездок" actions={[{ icon: 'info', label: 'Как это работает' }]} />}>
      <Grid>
        <TripCard add />
        <TripCard city="Самуй" items={12} outfits={8} art={tripArt('container', 'bottom', 'top')} />
        <TripCard city="Берлин" items={12} outfits={8} art={tripArt('accessories', 'bottom', 'top')} />
        <TripCard city="Бразилиа" items={4} outfits={1} art={tripArt('accessories', 'bottom', 'top')} />
        <TripCard city="Париж" items={12} outfits={8} art={tripArt('accessories', 'bottom', 'outerwear')} />
        <TripCard city="Торонто" items={12} outfits={8} art={tripArt('container', 'top', 'bottom')} />
      </Grid>
    </Screen>
  ),
};

export const TripDetails: Story = {
  parameters: { controls: { disable: true } },
  name: 'Stylist / Trip Details / Outfits Tab',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Бразилиа · 8–13 сент" actions={[{ icon: 'more', label: 'Ещё' }]} />}>
      <SegmentControl value="outfits" segments={[{ value: 'outfits', label: 'Образы · 1' }, { value: 'items', label: 'Вещи · 4' }]} />
      <OutfitCollage label="Прогулка" items={[{ kind: 'accessories', x: 34, y: 18, size: 56 }, { kind: 'top', x: 66, y: 34, color: 'green' }, { kind: 'bottom', x: 30, y: 60, size: 130, color: 'green' }, { kind: 'shoe', x: 72, y: 76, size: 72, color: 'brown' }]} />
      <OutfitCollage label="Ужин" items={[{ kind: 'bottom', x: 28, y: 58, size: 140, color: 'black' }, { kind: 'top', x: 64, y: 40, color: 'brown' }, { kind: 'container', x: 76, y: 78, size: 64, color: 'black' }]} />
    </Screen>
  ),
};

export const Settings: Story = {
  parameters: { controls: { disable: true } },
  name: 'Settings / Main',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Настройки" />}>
      <ListGroup>
        <ListItem label="Сима · sima@space.com" trailing={<IconButton icon="log-out" label="Выйти" variant="ghost" size="S" />} />
      </ListGroup>
      <ListGroup><ListItem label="Корзина вещей" trailing={<Icon name="chevron-right" />} /></ListGroup>
      <InputGroup>
        <Field label="Страна" value="Россия" trailingIcon="chevron-up-down" />
        <Field label="Валюта" value="₽ · RUB" trailingIcon="chevron-up-down" />
      </InputGroup>
      <ListGroup>
        <ListItem label="Язык" trailing={<Icon name="external-link" />} />
        <ListItem label="Уведомления" trailing={<Icon name="external-link" />} />
      </ListGroup>
      <ListGroup>
        {['Оценить приложение', 'Техническая поддержка', 'Идеи по доработке приложения', 'Сотрудничество'].map((l) => <ListItem key={l} label={l} trailing={<Icon name="external-link" />} />)}
      </ListGroup>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 8, color: 'var(--color-text-secondary)', padding: '8px 0 24px' }}>
        <Logo height={24} />
        <span className="y-caption">Политика конфиденциальности</span>
      </div>
    </Screen>
  ),
};

export const ProfileAnalytics: Story = {
  parameters: { controls: { disable: true } },
  name: 'Profile / Overview / Analytics',
  render: () => (
    <Screen header={<Header type="large" title="Профиль" />} bottom={<BottomNav active="profile" />}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar size="M" initial="С" />
        <Button variant="tertiary" size="S" rightIcon="chevron-up-down">За всё время</Button>
      </div>
      <UsageMeter percent={11} />
      <StatRow>
        <StatTile label="Вещи" value={43} />
        <StatTile label="Образы" value={12} />
        <StatTile label="Вишлист" value={4} />
      </StatRow>
      <Carousel title="Чаще всего надевалось" itemWidth={173}>
        <ItemCard kind="top" color="green" label="30 раз" />
        <ItemCard kind="top" color="brown" label="12 раз" />
        <ItemCard kind="bottom" color="black" label="9 раз" />
      </Carousel>
      <BarChart bars={[{ label: 'Верхняя одежда', icon: 'outerwear', value: 5 }, { label: 'Верх', icon: 'top', value: 50 }, { label: 'Обувь', icon: 'shoe', value: 10 }, { label: 'Аксессуары', icon: 'accessories', value: 30 }, { label: 'Низ', icon: 'bottom', value: 5 }]} />
      <h3 className="y-h3">По сезонам</h3>
      <BarChart height={180} bars={[{ label: 'Весна', icon: 'flower', value: 20 }, { label: 'Лето', icon: 'sun', value: 70 }, { label: 'Осень', icon: 'leaf', value: 8 }, { label: 'Зима', icon: 'snowflake', value: 1 }]} />
      <h3 className="y-h3">Самый дорогой образ</h3>
      <OutfitCollage
        label="Ужин"
        items={[{ kind: 'bottom', x: 28, y: 44, size: 130, color: 'black' }, { kind: 'top', x: 64, y: 30, color: 'brown' }, { kind: 'container', x: 78, y: 56, size: 56, color: 'black' }]}
        footer={<><span><span className="y-h2" style={{ display: 'block' }}>120 640 ₽</span><span className="y-caption y-text--secondary">4 вещи</span></span><Icon name="chevron-right" /></>}
      />
    </Screen>
  ),
};

/* ─── Вишлист, архив, создание образа, профиль ────────────────────────── */

const shoes = ['Nike Air Force 1 ’07', 'Nike Ava Edge', 'Nike Ava Edge', 'Nike Ava Edge'];

export const Wishlist: Story = {
  parameters: { controls: { disable: true } },
  name: 'Wishlist / Items / Populated',
  render: () => (
    <Screen header={<Header type="large" title="Гардероб" />} bottom={<BottomNav active="wardrobe" fab />}>
      <SegmentControl value="wishlist" segments={[{ value: 'items', label: 'Вещи' }, { value: 'outfits', label: 'Образы' }, { value: 'wishlist', label: 'Вишлист' }]} />
      <div style={{ alignSelf: 'flex-start' }}>
        <SegmentControl size="S" value="items" segments={[{ value: 'items', label: 'Вещи' }, { value: 'outfits', label: 'Образы' }]} />
      </div>
      <Grid rowGap={16}>
        {shoes.map((n, i) => <ProductCard key={i} kind="shoe" name={n} price={i ? '14 300 ₽' : '10 400 ₽'} liked />)}
      </Grid>
    </Screen>
  ),
};

export const Archive: Story = {
  parameters: { controls: { disable: true } },
  name: 'Archive / Items / Populated',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Архив вещей" />}>
      <Grid>
        <ItemCard kind="top" color="white" />
        <ItemCard kind="top" color="black" />
      </Grid>
    </Screen>
  ),
};

const creationSteps = (step: string) => (
  <SegmentControl size="S" value={step} segments={[{ value: 'items', icon: 'wardrobe' }, { value: 'canvas', icon: 'collage' }, { value: 'info', icon: 'info' }]} />
);

export const OutfitCriteria: Story = {
  parameters: { controls: { disable: true } },
  name: 'Outfit Creation / Criteria / Default',
  render: () => (
    <Screen header={<Header type="bar" center={creationSteps('info')} />} bottom={<BottomBar label="Создать образ" />}>
      <InputGroup>
        <Field label="Повод" value="Все" trailingIcon="chevron-up-down" />
        <Field label="Сезон" value="Все" trailingIcon="chevron-up-down" />
      </InputGroup>
      <h3 className="y-h3">Теги</h3>
      <ChipGroup wrap onAdd={() => {}} chips={['Тег #1', 'Тег #2', 'Тег #3', 'Тег #4', 'Тег #5', 'Тег #6'].map((label) => ({ label, removable: true }))} />
    </Screen>
  ),
};

export const OutfitItems: Story = {
  parameters: { controls: { disable: true } },
  name: 'Outfit Creation / Item Selection / Ready to Continue',
  render: () => (
    <Screen header={<Header type="bar" center={creationSteps('items')} actions={[{ icon: 'arrows-shuffle', label: 'Перемешать' }]} />} bottom={<BottomBar label="Далее" />}>
      {(
        [
          ['Верх', 'top', 'green'],
          ['Низ', null, null],
          ['Обувь', 'shoe', 'brown'],
        ] as const
      ).map(([title, kind, color]) => (
        <section key={title} style={{ display: 'grid', gap: 12 }}>
          <h3 className="y-h3">{title}</h3>
          <Row gap={12} align="center">
            {kind && <div style={{ width: 173 }}><ItemCard kind={kind} color={color ?? undefined} /></div>}
            <IconButton icon="plus" label={`Добавить: ${title.toLowerCase()}`} />
          </Row>
        </section>
      ))}
    </Screen>
  ),
};

export const ProfileEdit: Story = {
  parameters: { controls: { disable: true } },
  name: 'Profile / Edit / No Avatar',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Редактирование профиля" />}>
      <div style={{ display: 'grid', placeItems: 'center', padding: '8px 0' }}><Avatar size="L" /></div>
      <InputGroup>
        <Field label="Имя" value="Сима" />
        <Field label="E-mail" value="sima@space.com" />
      </InputGroup>
      <InputGroup>
        <Field label="Пол" value="Не указан" trailingIcon="chevron-up-down" />
        <Field label="Стиль" value="Кэжуал" trailingIcon="chevron-up-down" />
        <Field label="Год рождения" value="1991" trailingIcon="chevron-up-down" />
      </InputGroup>
    </Screen>
  ),
};

function PriceSheet() {
  const [v, setV] = useState<[number, number]>([0, 30000]);
  return (
    <Screen
      header={<Header type="search" query="Белые кроссовки" filters={[{ label: 'Сортировка' }, { label: 'Цена', selected: true }]} />}
      overlay={
        <Overlay>
          <Sheet title="Цена" footer={[{ label: 'Сбросить' }, { label: 'Показать 128' }]}>
            <RangeSlider label="Цена" min={0} max={60000} value={v} onChange={setV} histogram={[2, 3, 6, 12, 18, 20, 17, 19, 22, 16, 10, 6, 4, 3, 2, 2, 3, 2, 1, 1]} />
          </Sheet>
        </Overlay>
      }
    >
      <Grid rowGap={16}>
        {shoes.map((n, i) => <ProductCard key={i} kind="shoe" name={n} price="14 300 ₽" />)}
      </Grid>
    </Screen>
  );
}

export const PriceFilter: Story = { name: 'Search / Results / Sheet / Price Filter', render: () => <PriceSheet /> };
