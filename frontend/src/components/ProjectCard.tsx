import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      
      {/* Tech Stack Badges */}
      <div className="tech-stack" style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", margin: "12px 0" }}>
        {project.tech_stack?.map((tech, index) => (
          <span key={index} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Links */}
      <div className="card-links" style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};