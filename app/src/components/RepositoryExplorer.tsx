import { useMemo, useState } from 'react';
import catalog from '../data/repositories.json';
import { Icon } from './Icon';

export function RepositoryExplorer() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('Todas');
  const [sort, setSort] = useState('recent');
  const languages = [
    'Todas',
    ...Array.from(
      new Set(catalog.repositories.map((r) => r.language).filter((x): x is string => Boolean(x))),
    ).sort(),
  ];
  const repositories = useMemo(
    () =>
      catalog.repositories
        .filter((repo) => {
          const text =
            `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLocaleLowerCase('pt-BR');
          return (
            text.includes(query.trim().toLocaleLowerCase('pt-BR')) &&
            (language === 'Todas' || repo.language === language)
          );
        })
        .sort((a, b) =>
          sort === 'name' ? a.name.localeCompare(b.name) : b.updatedAt.localeCompare(a.updatedAt),
        ),
    [query, language, sort],
  );
  return (
    <section
      className="section repository-section"
      id="repositorios"
      aria-labelledby="repositories-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / MY LAB</p>
            <h2 id="repositories-title">
              One commit at a time<span className="accent-text">.</span>
            </h2>
          </div>
          <p>
            Projects, studies, and experiments. All my public repositories in one place.
          </p>
        </div>
        <details className="catalog-details">
          <summary>
            Explore repositories <span aria-hidden="true">+</span>
          </summary>
          <div className="repo-toolbar">
            <div className="search-field">
              <label htmlFor="repository-search">Search repositories</label>
              <input
                id="repository-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, technology, or topic..."
              />
            </div>
            <div className="select-field">
              <label htmlFor="repository-language">Language</label>
              <select
                id="repository-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((l) => (
                  <option key={l} value={l}>{l === 'Todas' ? 'All' : l}</option>
                ))}
              </select>
            </div>
            <div className="select-field">
              <label htmlFor="repository-order">Sort</label>
              <select id="repository-order" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Most recent</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>
          <div className="repo-meta">
            <p role="status">
              {repositories.length} of {catalog.repositories.length} repositories
            </p>
            <span>
              Updated on{' '}
              <time dateTime={catalog.syncedAt}>
                {catalog.syncedAt.split('-').reverse().join('/')}
              </time>
            </span>
          </div>
          <div className="repo-grid">
            {repositories.map((repo) => (
              <article className="repo-card" key={repo.id}>
                <div className="repo-top">
                  <Icon name="code" />
                  <span>
                    {repo.name === 'Thiago-A-Gomes'
                      ? 'Profile'
                      : repo.topics.includes('learning-project')
                        ? 'Study'
                        : 'Repository'}
                  </span>
                </div>
                <h3>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                    <Icon name="arrow" />
                  </a>
                </h3>
                <p>{repo.description || 'Code and documentation available on GitHub.'}</p>
                <div className="repo-bottom">
                  <span className={`language language-${repo.language?.toLowerCase() || 'docs'}`}>
                    <i aria-hidden="true" />
                    {repo.language || 'Documentation'}
                  </span>
                  {repo.fork && <span>Fork</span>}
                  {repo.archived && <span>Archived</span>}
                </div>
              </article>
            ))}
          </div>
          {repositories.length === 0 && (
            <div className="empty-state">
              <Icon name="code" />
              <h3>No repositories found</h3>
              <p>Try another name or clear the filters.</p>
              <button
                className="button secondary"
                onClick={() => {
                  setQuery('');
                  setLanguage('Todas');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
          <div className="repository-footer">
            <span>A growing collection of lessons learned.</span>
            <a
              className="text-link"
              href="https://github.com/Thiago-A-Gomes?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore on GitHub <Icon name="arrow" />
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
