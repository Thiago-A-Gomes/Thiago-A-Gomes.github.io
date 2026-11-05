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
  const summaries: Record<string, string> = {
    'central-estudos': 'Every study session, a step forward.',
    'ritmo-lab': 'Create rhythms. Train your ear.',
    'central-compras': 'From request to ERP, in one workflow.',
    kurio: 'A discovery experience for digital art.',
    fiscalguard: 'Less manual checking. More clarity.',
    caixinha: 'Your accounts and goals, organized in one place.',
  };
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
        <p className="project-description">{summaries[project.id] || project.description}</p>
        <div className="project-actions">
          <button
            className="text-link"
            onClick={() => onDetails(project)}
            aria-label={`Project details: ${project.name}`}
          >
            View project <Icon name="arrow" />
          </button>
          <a
            className="project-external"
            href={project.demo || project.repository}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              project.demo
                ? project.access === 'private'
                  ? `Open private access to ${project.name}`
                  : `Open ${project.name} demo`
                : `Open ${project.name} documentation`
            }
          >
            <Icon name={project.demo ? 'arrow' : 'github'} />
          </a>
        </div>
      </div>
    </article>
  );
}
