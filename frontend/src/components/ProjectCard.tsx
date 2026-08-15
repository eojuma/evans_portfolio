import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const path = `/projects/${slugify(project.title)}`;

  return (
    <div className="project-card">
      <div className="card-header">
        <div className="card-header-left">
          <h3 className="card-path">{path}</h3>
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="tech-stack">
          <span className="stack-key">"stack"</span>
          <span>: [</span>
          {project.tech_stack.map((tech, index) => (
            <span key={tech}>
              <span className="tech-badge">"{tech}"</span>
              {index < project.tech_stack.length - 1 ? ", " : ""}
            </span>
          ))}
          <span>]</span>
        </div>
      )}

      <div className="card-links">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="btn-link"
          >
            Source ↗
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="btn-link"
          >
            Live demo ↗
          </a>
        )}
      </div>
    </div>
  );
};
