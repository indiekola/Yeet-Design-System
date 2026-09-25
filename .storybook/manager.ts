import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'yeet · Design System',
    brandTarget: '_self',
    colorPrimary: '#0100F4',
    colorSecondary: '#0100F4',
    appBg: '#F7F7F7',
    appContentBg: '#FFFFFF',
    appBorderColor: 'rgba(0,0,0,0.1)',
    appBorderRadius: 20,
    fontBase: '"Inter", -apple-system, sans-serif',
    textColor: '#000000',
    barSelectedColor: '#0100F4',
  }),
  sidebar: { showRoots: true },
});
