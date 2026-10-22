import { cp, readFile, writeFile } from 'node:fs/promises';

// O GitHub Pages já publica main / (root). O código-fonte fica em app/;
// somente arquivos gerados em dist/ são exportados para a publicação existente.
const root = new URL('../', import.meta.url);
const html = await readFile(new URL('dist/index.html', root), 'utf8');
if (!html.includes('id="projetos"') || !html.includes('/assets/')) {
  throw new Error('Execute npm run build antes de exportar o site.');
}
await cp(new URL('dist/assets/', root), new URL('assets/', root), { recursive: true });
await writeFile(new URL('index.html', root), html);
await cp(new URL('dist/robots.txt', root), new URL('robots.txt', root));
await cp(new URL('dist/sitemap.xml', root), new URL('sitemap.xml', root));
console.log('Build exportado para index.html e assets/.');
