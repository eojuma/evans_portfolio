import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="card-header">
        <h3>{project.title}</h3>
      </div>
      
      <p className="project-description">{project.description}</p>

      {/* Backend Tech Badges */}
      <div className="tech-stack">
        {project.tech_stack?.map((tech, index) => (
          <span key={index} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      {/* Direct Links for Employers */}
      <div className="card-links">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-link">
            <span>Source Code (GitHub)</span> ↗
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" className="btn-link">
            <span>Live API / Demo</span> ↗
          </a>
        )}
      </div>
    </div>
  );
};