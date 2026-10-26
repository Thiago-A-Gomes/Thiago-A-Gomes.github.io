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
            <p className="eyebrow">02 / MEU LABORATÓRIO</p>
            <h2 id="repositories-title">
              Um commit de cada vez<span className="accent-text">.</span>
            </h2>
          </div>
          <p>
            Projetos, estudos e experimentos. Todos os meus repositórios públicos, em um só lugar.
          </p>
        </div>
        <details className="catalog-details">
          <summary>
            Explorar repositórios <span aria-hidden="true">+</span>
          </summary>
          <div className="repo-toolbar">
            <div className="search-field">
              <label htmlFor="repository-search">Buscar repositório</label>
              <input
                id="repository-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome, tecnologia ou assunto..."
              />
            </div>
            <div className="select-field">
              <label htmlFor="repository-language">Linguagem</label>
              <select
                id="repository-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="select-field">
              <label htmlFor="repository-order">Ordenar</label>
              <select id="repository-order" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Mais recentes</option>
                <option value="name">Nome A–Z</option>
              </select>
            </div>
          </div>
          <div className="repo-meta">
            <p role="status">
              {repositories.length} de {catalog.repositories.length} repositórios
            </p>
            <span>
              Atualizado em{' '}
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
                      ? 'Perfil'
                      : repo.topics.includes('learning-project')
                        ? 'Estudo'
                        : 'Repositório'}
                  </span>
                </div>
                <h3>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                    <Icon name="arrow" />
                  </a>
                </h3>
                <p>{repo.description || 'Código e documentação disponíveis no GitHub.'}</p>
                <div className="repo-bottom">
                  <span className={`language language-${repo.language?.toLowerCase() || 'docs'}`}>
                    <i aria-hidden="true" />
                    {repo.language || 'Documentação'}
                  </span>
                  {repo.fork && <span>Fork</span>}
                  {repo.archived && <span>Arquivado</span>}
                </div>
              </article>
            ))}
          </div>
          {repositories.length === 0 && (
            <div className="empty-state">
              <Icon name="code" />
              <h3>Nenhum repositório encontrado</h3>
              <p>Tente outro nome ou remova os filtros.</p>
              <button
                className="button secondary"
                onClick={() => {
                  setQuery('');
                  setLanguage('Todas');
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
          <div className="repository-footer">
            <span>Uma coleção de aprendizados em construção.</span>
            <a
              className="text-link"
              href="https://github.com/Thiago-A-Gomes?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorar no GitHub <Icon name="arrow" />
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
