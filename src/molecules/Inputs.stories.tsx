import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, InputBar, InputGroup } from '.';
import { Column, Usage, UsageGrid } from '../docs/helpers';

const meta = {
  title: 'Molecules/Inputs',
  component: InputGroup,
  tags: ['autodocs'],
  args: { children: null },
  parameters: {
    docs: {
      description: {
        component: `**Field** — строка поля, **InputGroup** — группа строк на сером фоне, **InputBar** — поле с кнопками по бокам.

Три паттерна строки: ввод текста · «ключ — значение» (выбор открывает sheet, справа \`chevron-up-down\`) · пароль (справа \`eye\`).
Ошибка — красный текст значения, без рамок и подложек.`,
      },
    },
  },
} satisfies Meta<typeof InputGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  name: 'В флоу · Вход',
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <Column>
        <InputGroup>
          <Field label="E-mail" input={{ type: 'email', defaultValue: 'sima@space.com' }} />
          <Field label="Пароль" input={{ type: show ? 'text' : 'password', defaultValue: 'yeet-2026' }} trailingIcon={show ? 'eye' : 'eye'} onTrailingClick={() => setShow(!show)} />
        </InputGroup>
      </Column>
    );
  },
};

export const InFlow: Story = {
  name: 'В флоу',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="New Item / Details" note="ввод"><InputGroup><Field label="Название" input={{}} /><Field label="Стоимость" input={{ inputMode: 'numeric' }} /></InputGroup></Usage>
      <Usage screen="New Item / Details" note="ключ — значение, выбор в sheet"><InputGroup><Field label="Категория" value="Аксессуары" trailingIcon="chevron-up-down" /><Field label="Цвет" value="Чёрный" colorDot="black" trailingIcon="chevron-up-down" /></InputGroup></Usage>
      <Usage screen="Settings" note="страна и валюта"><InputGroup><Field label="Страна" value="Россия" trailingIcon="chevron-up-down" /><Field label="Валюта" value="₽ · RUB" trailingIcon="chevron-up-down" /></InputGroup></Usage>
      <Usage screen="Settings" note="ссылки"><InputGroup><Field label="Язык" trailingIcon="external-link" /><Field label="Уведомления" trailingIcon="external-link" /></InputGroup></Usage>
      <Usage screen="Outfit Creation / Criteria"><InputGroup><Field label="Повод" value="Все" trailingIcon="chevron-up-down" /><Field label="Сезон" value="Все" trailingIcon="chevron-up-down" /></InputGroup></Usage>
      <Usage screen="Auth / Sign In" note="ошибка"><InputGroup><Field label="Пароль" input={{ type: 'password', defaultValue: '12345' }} error /></InputGroup></Usage>
    </UsageGrid>
  ),
};

export const Bars: Story = {
  name: 'InputBar · В флоу',
  render: () => (
    <UsageGrid min={353}>
      <Usage screen="Search / Text" note="назад + поле + поиск по фото"><InputBar placeholder="Уточните текстом" value="Белые кроссовки" fieldIcon="search" leading={{ icon: 'chevron-left', label: 'Назад' }} trailing={{ icon: 'search-by-image', label: 'Поиск по фото' }} /></Usage>
      <Usage screen="Wardrobe / Item Search"><InputBar placeholder="Название вещи" fieldIcon="search" leading={{ icon: 'chevron-left', label: 'Назад' }} /></Usage>
      <Usage screen="Stylist" note="сообщение стилисту"><InputBar placeholder="Спроси у стилиста" trailing={{ icon: 'arrow-up', label: 'Отправить', variant: 'primary' }} /></Usage>
    </UsageGrid>
  ),
};
