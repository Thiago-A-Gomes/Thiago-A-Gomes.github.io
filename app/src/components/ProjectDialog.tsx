import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import { Icon } from './Icon';

export function ProjectDialog({ project, onDismiss }: { project: Project; onDismiss: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onClose={(e) => {
        if (!e.currentTarget.open) onDismiss();
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return;
        const elements = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'),
        );
        const first = elements[0],
          last = elements.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
    >
      <div className="dialog-top">
        <span className="eyebrow">Por dentro do projeto</span>
        <button
          className="icon-button"
          aria-label="Fechar detalhes"
          onClick={() => ref.current?.close()}
        >
          <Icon name="close" />
        </button>
      </div>
      <p className="project-label">{project.label}</p>
      <h2 id="dialog-title">{project.name}</h2>
      <div className="dialog-section">
        <h3>O contexto</h3>
        <p>{project.context}</p>
      </div>
      <div className="dialog-section">
        <h3>A solução</h3>
        <p>{project.solution}</p>
      </div>
      <div className="dialog-section">
        <h3>O que explorar</h3>
        <ul className="highlights">
          {project.highlights.map((item) => (
            <li key={item}>
              <Icon name="check" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="tech-list" aria-label="Tecnologias">
        {project.technologies.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <p className="scope-note">{project.limitation}</p>
      <div className="dialog-actions">
        {project.demo && (
          <a
            className="button primary"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir demonstração <Icon name="arrow" />
          </a>
        )}
        <a
          className="button secondary"
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.id === 'ritmo-lab' ? 'Repositórios no GitHub' : 'Código e documentação'}{' '}
          <Icon name="github" />
        </a>
      </div>
    </dialog>
  );
}
