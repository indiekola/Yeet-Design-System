import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Icon, IconButton, Logo } from '../atoms';
import { BarChart, Carousel, ChipGroup, EmptyState, ListGroup, PhotoTile, UsageMeter, Field, Hint, InputBar, InputGroup, List, ListItem, LoadingState, SegmentControl, Snackbar, StatRow, StatTile } from '../molecules';
import { BottomBar, BottomNav, ChatBubble, StatusBar, StylistPromptCard, TripCard, Dialog, Header, ItemCard, OutfitCollage, Overlay, PhotoArea, ProductCard, Sheet, WeatherCard, type Garment } from '../organisms';
import { Screen } from '../templates';

const meta = {
  title: 'Pages/Экраны флоу',
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Экраны флоу, собранные **только** из компонентов системы. Названия — как в Figma (`Раздел / Экран / Состояние`).' } },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const grid: Garment[] = ['top', 'container', 'bottom', 'shoe', 'outerwear', 'accessories', 'top', 'bottom'];

export const OnboardingWelcome: Story = {
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
  name: 'Outfits / Everyday / Sunny',
  render: () => (
    <Screen header={<Header type="large" title="Твои образы" subtitle="на каждый день" />} bottom={<BottomNav active="today" />}>
      <ChipGroup chips={[{ label: 'На каждый день', selected: true }, { label: 'Работа' }, { label: 'Свидание' }, { label: 'Вечеринка' }]} />
      <div style={{ position: 'relative' }}>
        <OutfitCollage items={[{ kind: 'top', x: 68, y: 32, color: 'green' }, { kind: 'bottom', x: 30, y: 58, size: 140, color: 'green' }, { kind: 'accessories', x: 32, y: 20, size: 64 }, { kind: 'shoe', x: 70, y: 76, size: 80, color: 'brown' }]} />
        <div style={{ position: 'absolute', top: -20, left: 16 }}><WeatherCard temp="20°" description="Солнечно, ветер 14 км/ч" /></div>
      </div>
      <Button size="XL" fullWidth>Надеть</Button>
    </Screen>
  ),
};

export const Wardrobe: Story = {
  name: 'Wardrobe / Items / Populated',
  render: () => {
    const [tab, setTab] = useState('items');
    return (
      <Screen header={<Header type="large" title="Гардероб" />} bottom={<BottomNav active="wardrobe" fab />}>
        <SegmentControl value={tab} onChange={setTab} segments={[{ value: 'items', label: 'Вещи' }, { value: 'outfits', label: 'Образы' }, { value: 'wishlist', label: 'Вишлист' }]} />
        <div style={{ display: 'flex', gap: 4 }}>
          <IconButton icon="search" label="Поиск" size="S" />
          <IconButton icon="archive" label="Архив" size="S" />
          <ChipGroup chips={[{ label: 'Категория', dropdown: true }, { label: 'Сезон', dropdown: true }, { label: 'Теги', dropdown: true }]} />
        </div>
        <div className="y-grid">{grid.map((k, i) => <ItemCard key={i} kind={k} />)}</div>
      </Screen>
    );
  },
};

export const WardrobeEmpty: Story = {
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
  name: 'Wishlist / Item Details',
  render: () => (
    <Screen header={<Header type="bar" actions={[{ icon: 'more', label: 'Ещё' }]} />} bottom={<BottomBar label="Переместить в гардероб" secondary={{ icon: 'external-link', label: 'Открыть в магазине' }} />} flush>
      <div style={{ padding: '0 20px' }}><PhotoArea kind="container" /></div>
      <Sheet type="panel" title="Сумка">
        <p className="y-body y-text--secondary">10 000 ₽ · Sander · Чёрный<br />Аксессуары · Все сезоны</p>
        <p className="y-body" style={{ background: 'var(--color-bg-subtle)', borderRadius: 20, padding: '16px 20px' }}>Мягкая сумка округлой формы с логотипом и кожаным ремешком</p>
        <h3 className="y-h3">Образы с этой вещью</h3>
        <div className="y-grid"><ItemCard kind="top" /><ItemCard kind="bottom" /></div>
      </Sheet>
    </Screen>
  ),
};

export const OutfitDetails: Story = {
  name: 'Wardrobe / Outfit Details / Scrolled',
  render: () => (
    <Screen header={<Header type="bar" actions={[{ icon: 'pen', label: 'Редактировать' }, { icon: 'more', label: 'Ещё' }]} />} flush>
      <Sheet type="panel" title="На каждый день">
        <p className="y-body y-text--secondary">Все сезоны</p>
        <StatRow><StatTile label="Надето раз" value={8} /><StatTile label="Д. простоя" value={1} /><StatTile label="Вещи" value={4} /></StatRow>
        <h3 className="y-h3">Теги</h3>
        <ChipGroup wrap chips={[{ label: 'Тег #1' }, { label: 'Тег #2' }, { label: 'Тег #3' }, { label: 'Тег #4' }]} />
        <h3 className="y-h3">Вещи из образа</h3>
        <div className="y-grid"><ItemCard kind="top" color="green" /><ItemCard kind="bottom" color="green" /><ItemCard kind="shoe" color="brown" /><ItemCard kind="accessories" /></div>
      </Sheet>
    </Screen>
  ),
};

export const SearchResults: Story = {
  name: 'Search / Text / Results',
  render: () => (
    <Screen header={<Header type="search" query="Белые кроссовки" filters={[{ label: 'Сортировка' }, { label: 'Цена' }]} />}>
      <div className="y-grid" style={{ rowGap: 16 }}>
        {['Nike Air Force 1 ’07', 'Nike Ava Edge', 'Adidas Samba', 'New Balance 550', 'Puma Palermo', 'Vans Old Skool'].map((n, i) => (
          <ProductCard key={n} kind="shoe" name={n} price={`${(10400 + i * 1300).toLocaleString('ru-RU')} ₽`} discount={i % 2 ? undefined : '-10%'} liked={i === 1} />
        ))}
      </div>
    </Screen>
  ),
};

export const SearchEmpty: Story = {
  name: 'Search / Text / No Results Filtered',
  render: () => (
    <Screen header={<Header type="search" query="asdasd" filters={[{ label: 'Сначала дешевле', selected: true }, { label: 'до 60 000 ₽', selected: true }]} />} center>
      <EmptyState title="Упс, не нашли" description="Измени запрос или попробуй поискать что-то другое" action={{ label: 'Сбросить поиск' }} />
    </Screen>
  ),
};

export const NewItem: Story = {
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

export const Canvas: Story = {
  name: 'Outfit Creation / Canvas / Gesture Hint',
  render: () => (
    <Screen header={<Header type="bar" actions={[{ icon: 'arrows-shuffle', label: 'Перемешать' }]} />} floating={<Hint>Перемещай и масштабируй вещи</Hint>} floatingOffset={120} bottom={<BottomBar label="Сохранить образ" />}>
      <OutfitCollage items={[{ kind: 'top', x: 66, y: 34, color: 'black' }, { kind: 'bottom', x: 34, y: 58, size: 140 }, { kind: 'shoe', x: 70, y: 78, size: 80 }]} />
    </Screen>
  ),
};

export const Stylist: Story = {
  name: 'Stylist / Assistant',
  render: () => (
    <Screen header={<Header type="large" title="Стилист" />} bottom={<div style={{ padding: '0 20px 20px' }}><InputBar placeholder="Спроси у стилиста" trailing={{ icon: 'arrow-up', label: 'Отправить', variant: 'primary' }} /></div>}>
      <div style={{ flex: 1 }} />
      <ChatBubble>Привет! Я твой ИИ-стилист. Спрашивай про образы, сочетания и что надеть сегодня</ChatBubble>
      <ChatBubble own>Что надеть на свидание вечером?</ChatBubble>
      <LoadingState label="Собираю образы из твоих вещей…" />
    </Screen>
  ),
};

export const FilterSheet: Story = {
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
      <div className="y-grid">{grid.map((k, i) => <ItemCard key={i} kind={k} />)}</div>
    </Screen>
  ),
};

export const ClearTrash: Story = {
  name: 'Trash / Items / Dialog / Clear',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Корзина вещей" />} overlay={<Overlay><Dialog tone="destructive" title="Очистить корзину?" description="Все вещи из корзины удаляются навсегда, их уже не вернуть" cancel="Отмена" confirm="Очистить" /></Overlay>}>
      <div className="y-grid">{grid.slice(0, 4).map((k, i) => <ItemCard key={i} kind={k} />)}</div>
    </Screen>
  ),
};

export const Toast: Story = {
  name: 'Wardrobe / Item / Toast',
  render: () => (
    <Screen header={<Header type="large" title="Гардероб" />} bottom={<BottomNav active="wardrobe" fab />} floating={<Snackbar onClose={() => {}}>Перемещено в архив</Snackbar>}>
      <div className="y-grid">{grid.map((k, i) => <ItemCard key={i} kind={k} />)}</div>
    </Screen>
  ),
};

/* ─── Добавлено при синхронизации с флоу ─────────────────────────────── */

export const Splash: Story = {
  name: 'App / Splash',
  render: () => (
    <div style={{ width: 'var(--screen-width)', height: 'var(--screen-height)', borderRadius: 48, overflow: 'hidden', background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ color: 'var(--color-text-on-accent)' }}><StatusBar /></div>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}><Logo height={56} /></div>
    </div>
  ),
};

export const SearchDiscover: Story = {
  name: 'Search / Discover',
  render: () => (
    <Screen header={<Header type="large" title="Поиск в сторах" subtitle="Нашли классную вещь? Покажем, где купить такую же или похожую." />} bottom={<BottomNav active="search" />}>
      <div style={{ display: 'flex', gap: 8 }}>
        <PhotoTile source="gallery" />
        <PhotoTile source="camera" />
      </div>
      <InputBar placeholder="Белые кроссовки Nike" fieldIcon="search" />
      <ChipGroup wrap chips={['Nike', 'Crocs', 'Marine Serre', 'Белое платье с красными вкраплениями', 'JACQUEMUS', 'Обувь для бега'].map((label) => ({ label }))} />
    </Screen>
  ),
};

export const StylistHome: Story = {
  name: 'Stylist / Home',
  render: () => (
    <Screen header={<Header type="large" title="Стилист" />} bottom={<BottomNav active="stylist" />}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <StylistPromptCard label="Образ дня" icon="ai" />
        <StylistPromptCard label="Конструктор" icon="collage" />
        <StylistPromptCard label="Для поездки" icon="bag-check" />
        <StylistPromptCard label="Чат со стилистом" icon="arrow-up" />
      </div>
    </Screen>
  ),
};

const tripArt = (a: Garment, b: Garment, c: Garment) => [{ kind: a, x: 70, y: 28, size: 44 }, { kind: b, x: 28, y: 62, size: 72 }, { kind: c, x: 74, y: 66, size: 64 }];

export const Trips: Story = {
  name: 'Stylist / Trips / List',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Все для поездок" actions={[{ icon: 'info', label: 'Как это работает' }]} />}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <TripCard add />
        <TripCard city="Самуй" items={12} outfits={8} art={tripArt('container', 'bottom', 'top')} />
        <TripCard city="Берлин" items={12} outfits={8} art={tripArt('accessories', 'bottom', 'top')} />
        <TripCard city="Бразилиа" items={4} outfits={1} art={tripArt('accessories', 'bottom', 'top')} />
        <TripCard city="Париж" items={12} outfits={8} art={tripArt('accessories', 'bottom', 'outerwear')} />
        <TripCard city="Торонто" items={12} outfits={8} art={tripArt('container', 'top', 'bottom')} />
      </div>
    </Screen>
  ),
};

export const TripDetails: Story = {
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
  name: 'Settings / Main',
  render: () => (
    <Screen header={<Header type="bar" titleChip="Настройки" />}>
      <ListGroup>
        <ListItem label="Сима · sima@space.com" trailing={<IconButton icon="log-out" label="Выйти" variant="ghost" size="S" tabIndex={-1} />} icon={undefined} />
      </ListGroup>
      <ListGroup><ListItem label="Корзина вещей" trailing={<Icon name="chevron-right" />} /></ListGroup>
      <ListGroup>
        <ListItem label="Страна" trailing={<><span className="y-body">Россия</span><Icon name="chevron-up-down" /></>} />
        <ListItem label="Валюта" trailing={<><span className="y-body">₽ · RUB</span><Icon name="chevron-up-down" /></>} />
      </ListGroup>
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
      <h3 className="y-h3">Самый дорогой образ</h3>
      <OutfitCollage
        label="Ужин"
        items={[{ kind: 'bottom', x: 28, y: 44, size: 130, color: 'black' }, { kind: 'top', x: 64, y: 30, color: 'brown' }, { kind: 'container', x: 78, y: 56, size: 56, color: 'black' }]}
        footer={<><span><span className="y-h2" style={{ display: 'block' }}>120 640 ₽</span><span className="y-caption y-text--secondary">4 вещи</span></span><Icon name="chevron-right" /></>}
      />
    </Screen>
  ),
};
