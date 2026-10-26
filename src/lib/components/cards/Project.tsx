import { Link } from "react-router-dom";
import { getProjectImageSrc } from "@/lib/helpers";
import type { ProjectEntry } from "@/lib/types";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageSrc = getProjectImageSrc(project.imagePath);

  return (
    <Link to={`/${project.category}/${project.slug}`} className="grid gap-4 rounded-2xl border border-(--line) bg-(--surface) p-5 no-underline transition hover:border-(--accent)" aria-label={`Open project ${project.title}`}>
      {imageSrc ? <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="aspect-video w-full rounded-xl border border-(--line) object-cover" loading="lazy" /> : null}

      <div>
        <h3 className="m-0 text-(--text)">{project.title}</h3>
        <p className="mt-2 mb-0 text-(--text-muted)">{project.summary}</p>
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Project tags">
        {project.tags &&
          project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-(--line) bg-(--surface-soft) px-2.5 py-1 text-[0.8rem]">
              {tag}
            </li>
          ))}
      </ul>
    </Link>
  );
};

export default ProjectCard;

interface ProjectCardProps {
  project: ProjectEntry;
}
