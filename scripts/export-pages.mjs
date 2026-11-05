import { cp, readFile, writeFile } from 'node:fs/promises';

// GitHub Pages publishes main / (root). Source lives in app/;
// only files generated in dist/ are exported to the existing deployment.
const root = new URL('../', import.meta.url);
const html = await readFile(new URL('dist/index.html', root), 'utf8');
if (!html.includes('id="projetos"') || !html.includes('/assets/')) {
  throw new Error('Run npm run build before exporting the site.');
}
await cp(new URL('dist/assets/', root), new URL('assets/', root), { recursive: true });
await writeFile(new URL('index.html', root), html);
await cp(new URL('dist/robots.txt', root), new URL('robots.txt', root));
await cp(new URL('dist/sitemap.xml', root), new URL('sitemap.xml', root));
console.log('Build exported to index.html and assets/.');
