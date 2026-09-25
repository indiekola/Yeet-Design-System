// Brand the static Storybook build: tab title for GitHub Pages and shared links.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../storybook-static/index.html', import.meta.url);
const html = readFileSync(file, 'utf8').replace(/<title>.*?<\/title>/, '<title>yeet · Design System</title>');
writeFileSync(file, html);
