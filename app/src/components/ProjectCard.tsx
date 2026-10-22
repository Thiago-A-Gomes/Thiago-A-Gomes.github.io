import type { Project } from '../data/projects';
import { Icon } from './Icon';
import { RhythmArt, WorkflowArt } from './ProjectArt';

export function ProjectCard({
  project,
  featured = false,
  onDetails,
}: {
  project: Project;
  featured?: boolean;
  onDetails: (project: Project) => void;
}) {
  return (
    <article
      className={`project-card ${featured ? 'featured-project' : ''} project-${project.id}`}
      id={`projeto-${project.id}`}
    >
      <div className="project-visual">
        {project.image ? (
          <img src={project.image} alt={project.imageAlt} width="960" height="600" loading="lazy" />
        ) : project.id === 'central-compras' ? (
          <WorkflowArt />
        ) : (
          <RhythmArt />
        )}
      </div>
      <div className="project-content">
        <div className="project-heading">
          <p className="project-label">{project.label}</p>
          <span className="project-status">{project.status}</span>
        </div>
        <h3>
          {project.name}
          <span className="accent-text">{project.id === 'kurio' ? ' ↗' : ''}</span>
        </h3>
        <p className="project-description">{project.description}</p>
        <ul className="tech-list" aria-label={`Tecnologias de ${project.name}`}>
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {project.id === 'kurio' && (
          <p className="project-evidence">
            <Icon name="check" />
            74 testes E2E aprovados · suíte local desktop e mobile
          </p>
        )}
        <div className="project-actions">
          <button
            className="text-link"
            onClick={() => onDetails(project)}
            aria-label={`Por dentro do projeto: ${project.name}`}
          >
            Por dentro do projeto <Icon name="arrow" />
          </button>
          <a
            className="project-external"
            href={project.demo || project.repository}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              project.demo
                ? `Abrir demonstração de ${project.name}`
                : `Abrir documentação de ${project.name}`
            }
          >
            <Icon name={project.demo ? 'arrow' : 'github'} />
          </a>
        </div>
      </div>
    </article>
  );
}
