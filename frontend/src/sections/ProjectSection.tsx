import { useEffect, useState } from "react";
import { Project } from "../types/project";
import { getProjects } from "../api/projectAPI";
import { ProjectCard } from "../components/ProjectCard";

export const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-heading">
        <h2>Featured Projects</h2>
        <span className="section-path">/api/projects</span>
      </div>

      {loading && <p className="state-message">Fetching projects...</p>}
      {error && <p className="state-message error">{error}</p>}

      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id || project.title} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};