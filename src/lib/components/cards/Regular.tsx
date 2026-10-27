import { Link } from "react-router-dom";
import { P5Canvas } from "@/lib/components";
import { type ProjectEntry } from "@/lib/types";
import { getProjectImageSrc } from "@/lib/helpers";

const FeaturedCard = ({ project, simulationSketch }: FeaturedCardProps) => {
  const imageSrc = getProjectImageSrc(project.imagePath);

  return (
    <Link key={project.slug} className="flex max-w-full flex-col rounded-[0.9rem] border border-(--line) bg-(--surface-soft) p-4 no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
      <h3 className="m-0 text-(--text)">{project.title}</h3>
      <p className="mt-2 mb-2 text-[0.92rem] text-(--text-muted)">{project.summary}</p>

      {simulationSketch ? (
        <div className="mt-auto mb-0 overflow-hidden rounded-lg border border-(--line) h-50 lg:h-128 ">
          <P5Canvas sketch={simulationSketch} className="w-full" />
        </div>
      ) : imageSrc ? (
        <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="mt-auto mb-0  w-full rounded-lg border border-(--line) object-cover" loading="lazy" />
      ) : null}

      <ul className="mt-auto m-0 flex list-none flex-wrap gap-2 p-0 pt-3" aria-label="Project tags">
        {project.tags &&
          project.tags.map((tag: string) => (
            <li key={tag} className="flex items-center text-(--text) max-h-10 justify-center rounded-full border border-(--line) bg-(--surface-soft) px-2.5 py-1 text-[0.8rem]">
              {tag}
            </li>
          ))}
      </ul>
    </Link>
  );
};

export default FeaturedCard;

interface FeaturedCardProps {
  project: ProjectEntry;
  simulationSketch?: any;
}
