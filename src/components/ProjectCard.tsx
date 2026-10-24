import { Link } from "react-router-dom";
import type { ProjectEntry } from "@/types";

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div>
        <h3>
          <Link to={`/${project.category}/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
      </div>

      <ul className="tag-list" aria-label="Project tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
