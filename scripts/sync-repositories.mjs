import { writeFile } from 'node:fs/promises';

// Public API only, without credentials. No private data is sent to the site.
const owner = 'Thiago-A-Gomes';
const all = [];
for (let page = 1; page <= 100; page++) {
  const response = await fetch(
    `https://api.github.com/users/${owner}/repos?type=owner&per_page=100&page=${page}`,
    {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(15000),
    },
  );
  if (!response.ok)
    throw new Error(`GitHub HTTP ${response.status}: the previous catalog was preserved.`);
  const batch = await response.json();
  if (!Array.isArray(batch)) throw new Error('Invalid response from GitHub.');
  all.push(...batch);
  if (batch.length < 100) break;
}
const repositories = all
  .filter((repo) => !repo.private && repo.owner.login.toLowerCase() === owner.toLowerCase())
  .map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || '',
    url: repo.html_url,
    language: repo.language,
    homepage: repo.homepage || null,
    fork: repo.fork,
    archived: repo.archived,
    size: repo.size,
    updatedAt: repo.pushed_at,
    topics: repo.topics || [],
  }));
if (repositories.length === 0) throw new Error('An empty list cannot replace the existing catalog.');
const kurio = repositories.find((repo) => repo.name === 'frontend-challenge-kurio');
if (kurio) {
  kurio.description = 'Marketplace de NFTs com React e TypeScript, API simulada e testes E2E.';
  kurio.homepage = 'https://frontend-challenge-kurio-thiago-gomes-projects1.vercel.app/';
}
const portfolio = repositories.find((repo) => repo.name === 'Thiago-A-Gomes.github.io');
if (portfolio) {
  portfolio.description = 'A portfolio built with React, TypeScript, Vite, and Tailwind CSS.';
  portfolio.language = 'TypeScript';
}
await writeFile(
  new URL('../app/src/data/repositories.json', import.meta.url),
  JSON.stringify(
    {
      syncedAt: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }),
      owner,
      repositories,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `${repositories.length} public repositories updated. Review the diff before publishing.`,
);
