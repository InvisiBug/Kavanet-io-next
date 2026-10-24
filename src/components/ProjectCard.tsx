import { Link } from "react-router-dom";
import type { ProjectEntry } from "@/types";

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="grid gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <div>
        <h3 className="m-0">
          <Link className="text-[var(--text)] no-underline" to={`/${project.category}/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 mb-0 text-[var(--text-muted)]">{project.summary}</p>
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Project tags">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-1 text-[0.8rem]">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
