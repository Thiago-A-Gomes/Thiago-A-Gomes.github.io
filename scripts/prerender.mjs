import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-server/entry-server.js';

const file = new URL('../dist/index.html', import.meta.url);
const template = await readFile(file, 'utf8');
if (!template.includes('<!--app-html-->'))
  throw new Error('Pre-render marker not found.');
await writeFile(file, template.replace('<!--app-html-->', render()));
console.log('HTML pre-rendered: content and links are available before JavaScript.');
