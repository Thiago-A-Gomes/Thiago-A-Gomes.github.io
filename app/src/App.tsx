import { useCallback, useEffect, useRef, useState } from 'react';
import portrait from '../../img/thiago-gomes.webp';
import portraitMedium from '../../img/thiago-gomes-medium.webp';
import portraitSmall from '../../img/thiago-gomes-small.webp';
import { projects, type Category, type Project } from './data/projects';
import { Icon } from './components/Icon';
import { HeroScene } from './components/HeroScene';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDialog } from './components/ProjectDialog';
import { RepositoryExplorer } from './components/RepositoryExplorer';
import { useScrollReveal } from './useScrollReveal';

const navigation = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'repositorios', label: 'Laboratório' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

export function App() {
  useScrollReveal();
  const [category, setCategory] = useState<Category>('Todos');
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dismiss = useCallback(() => setSelected(null), []);
  const filtered = projects.filter((p) => category === 'Todos' || p.category === category);

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(current);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', current === 'dark' ? '#11160f' : '#f7f8f4');
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#11160f' : '#f7f8f4');
    try {
      localStorage.setItem('portfolio.theme', next);
    } catch {
      /* A troca de tema continua disponível sem armazenamento. */
    }
  }

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '';
      for (const { id } of navigation)
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <
          innerHeight * 0.4
        )
          current = id;
      if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 8)
        current = 'contato';
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('thigogo3@gmail.com');
      setCopied('E-mail copiado!');
    } catch {
      setCopied('Copie o endereço: thigogo3@gmail.com');
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(''), 5000);
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio">
            <span className="brand-symbol" aria-hidden="true">
              tg<span>·</span>
            </span>
            <span className="brand-name">
              thiago gomes<span>PORTFÓLIO / 2026</span>
            </span>
          </a>
          <nav aria-label="Navegação principal">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => {
                  if (item.id === 'projetos') setCategory('Todos');
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <a
              className="header-contact"
              href="mailto:thigogo3@gmail.com"
              aria-label="Enviar e-mail para Thiago Gomes"
            >
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </header>
      <main id="conteudo">
        <section className="hero container" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" /> OLÁ, EU SOU O THIAGO
            </p>
            <h1 id="hero-title">
              Ideias que viram
              <br />
              <span className="hero-emphasis">soluções</span> <br />
              digitais<span className="accent-text">.</span>
            </h1>
            <p className="hero-description">
              Construo aplicações web, conecto sistemas e automatizo rotinas. Tecnologia para
              simplificar o trabalho e transformar boas ideias em algo que funciona.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projetos">
                Conhecer projetos <Icon name="down" />
              </a>
              <a
                className="text-link"
                href="https://github.com/Thiago-A-Gomes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" /> GitHub
              </a>
            </div>
            <div className="hero-person">
              <img
                src={portraitSmall}
                alt="Thiago Gomes"
                width="48"
                height="48"
                fetchPriority="high"
              />
              <div>
                <strong>Thiago Gomes</strong>
                <span>Salto, São Paulo · Brasil</span>
              </div>
              <span className="person-rule" />
              <p>
                Construindo.
                <br />
                <span>Aprendendo sempre.</span>
              </p>
            </div>
          </div>
          <HeroScene />
        </section>
        <div className="tech-strip">
          <div className="container tech-strip-inner">
            <span className="tech-strip-caption">
              DA INTERFACE
              <br />À INTEGRAÇÃO
            </span>
            {['React', 'TypeScript', 'Node.js', 'Python', 'Azure', 'Automação'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <section
          className="section projects-section"
          id="projetos"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / DO CÓDIGO À PRÁTICA</p>
                <h2 id="projects-title">
                  Projetos com propósito<span className="accent-text">.</span>
                </h2>
              </div>
              <p>
                De uma rotina de compras a um marketplace. Conheça o problema, a solução e as
                escolhas por trás de cada entrega.
              </p>
            </div>
            <div className="projects-toolbar">
              <div className="filter-group" role="group" aria-label="Filtrar projetos">
                {(['Todos', 'Aplicações web', 'Automação'] as Category[]).map((item) => (
                  <button
                    key={item}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                    {item === 'Todos' && <span>{projects.length}</span>}
                  </button>
                ))}
              </div>
              <span className="project-count" role="status">
                {filtered.length} projetos selecionados
              </span>
            </div>
            <div className="projects-grid">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={project.id === 'central-compras'}
                  onDetails={setSelected}
                />
              ))}
            </div>
          </div>
        </section>
        <RepositoryExplorer />
        <section className="section about-section" id="sobre" aria-labelledby="about-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / QUEM ESTÁ POR TRÁS</p>
                <h2 id="about-title">
                  Pessoas, problemas
                  <br />e possibilidades<span className="accent-text">.</span>
                </h2>
              </div>
              <p>
                Minha trajetória combina atendimento, operação e desenvolvimento. Entender a
                necessidade de quem usa vem antes de escrever a primeira linha.
              </p>
            </div>
            <div className="about-grid">
              <div className="about-portrait">
                <img
                  src={portrait}
                  srcSet={`${portraitMedium} 400w, ${portrait} 760w`}
                  sizes="(max-width:620px) 320px, 430px"
                  alt="Retrato de Thiago Gomes"
                  width="1254"
                  height="1254"
                  loading="lazy"
                />
                <div className="portrait-caption">
                  <span>
                    <Icon name="location" /> Salto, SP
                  </span>
                  <span>THIAGO GOMES ↗</span>
                </div>
              </div>
              <div className="about-content">
                <p className="about-lead">
                  Curiosidade para entender.
                  <br />
                  <span>Prática para construir.</span>
                </p>
                <p>
                  Tenho experiência com suporte de TI e desenvolvimento de aplicações para apoiar a
                  operação. Essa vivência me aproximou dos problemas reais: tarefas repetitivas,
                  informação espalhada e sistemas que precisam conversar.
                </p>
                <p>
                  Sou formado em Análise e Desenvolvimento de Sistemas e agora curso Engenharia de
                  Software na UNINTER. Sigo ampliando minha base em desenvolvimento, cloud e
                  automação, com projetos e aprendizado contínuo.
                </p>
                <div className="about-facts">
                  <div>
                    <span>FOCO</span>
                    <strong>Web & automação</strong>
                  </div>
                  <div>
                    <span>FORMAÇÃO ATUAL</span>
                    <strong>Engenharia de Software</strong>
                  </div>
                </div>
                <a
                  className="text-link"
                  href="https://www.linkedin.com/in/thiago-gomes-9a85a4268/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minha trajetória no LinkedIn <Icon name="arrow" />
                </a>
              </div>
            </div>
            <div className="journey-grid">
              <section aria-labelledby="experience-title" id="experiencia">
                <div className="subsection-heading">
                  <Icon name="workflow" />
                  <h3 id="experience-title">Experiência</h3>
                </div>
                <div className="timeline">
                  <article>
                    <span className="timeline-date">JUL/2025 — OUT/2026</span>
                    <h4>Analista de Suporte Júnior</h4>
                    <p>
                      Microsoft 365, Windows Server, Azure, monitoramento, redes e telecomunicações.
                      Desenvolvimento de aplicações internas para apoiar a operação.
                    </p>
                    <ul className="tech-list">
                      <li>Azure</li>
                      <li>Microsoft 365</li>
                      <li>Redes</li>
                      <li>Desenvolvimento</li>
                    </ul>
                  </article>
                  <article>
                    <span className="timeline-date">2023 — 2024</span>
                    <h4>Estagiário de TI</h4>
                    <p className="employer">John Deere Brasil</p>
                    <p>
                      Suporte a sistemas, integração entre plataformas, automação e documentação
                      técnica, com trabalho organizado em Scrum e Kanban.
                    </p>
                  </article>
                </div>
              </section>
              <section aria-labelledby="education-title" id="formacao">
                <div className="subsection-heading">
                  <Icon name="layers" />
                  <h3 id="education-title">Formação & aprendizado</h3>
                </div>
                <div className="education-list">
                  <article className="current-education">
                    <span className="education-status">
                      <span className="status-dot" /> EM ANDAMENTO
                    </span>
                    <h4>Engenharia de Software</h4>
                    <p>UNINTER</p>
                  </article>
                  <article>
                    <span className="eyebrow">GRADUAÇÃO CONCLUÍDA</span>
                    <h4>Análise e Desenvolvimento de Sistemas</h4>
                    <p>CEUNSP · Tecnólogo</p>
                  </article>
                </div>
                <div className="certifications">
                  <span>CERTIFICAÇÕES MICROSOFT AZURE</span>
                  <div>
                    <span>
                      AZ-900 <small>Fundamentals</small>
                    </span>
                    <span>
                      AZ-104 <small>Administrator</small>
                    </span>
                  </div>
                </div>
                <details className="learning-details">
                  <summary>
                    Formação complementar e idiomas <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    <li>Front-end: Origamid, DIO e TIM Tec</li>
                    <li>MySQL: Udemy</li>
                    <li>Python / RPA e metodologia OKR</li>
                  </ul>
                  <p>Português: nativo · Inglês: corporativo · Espanhol: intermediário</p>
                </details>
              </section>
            </div>
          </div>
        </section>
        <section className="contact-section" id="contato" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact-top">
              <p className="eyebrow">04 / O PRÓXIMO PASSO</p>
              <span className="contact-spark" aria-hidden="true">
                ✳
              </span>
            </div>
            <div className="contact-grid">
              <div>
                <h2 id="contact-title">
                  Uma boa conversa.
                  <br />
                  Uma nova <em>possibilidade.</em>
                </h2>
                <p>
                  Uma oportunidade, um projeto ou uma ideia para tirar do papel. Vamos conversar?
                </p>
                <a className="button primary" href="mailto:thigogo3@gmail.com">
                  Enviar um e-mail <Icon name="arrow" />
                </a>
              </div>
              <div className="contact-links">
                <div className="email-row">
                  <a href="mailto:thigogo3@gmail.com">thigogo3@gmail.com</a>
                  <button
                    onClick={copyEmail}
                    className="icon-button"
                    aria-label="Copiar endereço de e-mail"
                  >
                    <Icon name={copied === 'E-mail copiado!' ? 'check' : 'copy'} />
                  </button>
                </div>
                <p className="copy-feedback" role="status">
                  {copied}
                </p>
                <a
                  href="https://www.linkedin.com/in/thiago-gomes-9a85a4268/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <Icon name="arrow" />
                </a>
                <a
                  href="https://github.com/Thiago-A-Gomes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <Icon name="arrow" />
                </a>
                <a href="https://wa.me/5511958179439" target="_blank" rel="noopener noreferrer">
                  WhatsApp <Icon name="arrow" />
                </a>
              </div>
            </div>
            <footer className="footer-base">
              <a className="footer-brand" href="#inicio">
                thiago gomes<span>®</span>
              </a>
              <p>Feito com React, TypeScript e vontade de construir.</p>
              <a href="#inicio">Voltar ao início ↑</a>
              <span>© 2026</span>
            </footer>
          </div>
        </section>
      </main>
      {selected && <ProjectDialog project={selected} onDismiss={dismiss} />}
    </>
  );
}
