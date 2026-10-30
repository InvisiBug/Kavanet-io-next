import { Link } from "react-router-dom";
import { P5Canvas } from "@/lib/components";
import { type ProjectEntry } from "@/lib/types";
import { getProjectImageSrc } from "@/lib/helpers";
import Meta from "./Meta";

const FullPictureCard = ({ project }: FeaturedCardProps) => {
  const imageSrc = getProjectImageSrc(project.imagePath);

  return (
    <Link key={project.slug} className="flex h-full max-w-full flex-col rounded-[0.9rem] overflow-hidden border border-(--line) bg-(--surface-soft) no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
      {imageSrc && <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="block  w-full object-cover" loading="lazy" />}

      <Meta project={project} />

      <ul className="m-3 flex list-none flex-wrap gap-2 p-0" aria-label="Project tags">
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

export default FullPictureCard;

interface FeaturedCardProps {
  project: ProjectEntry;
  simulationSketch?: any;
}
