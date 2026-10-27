import { Link } from "react-router-dom";
import { P5Canvas } from "@/lib/components";
import { type ProjectEntry } from "@/lib/types";
import { getProjectImageSrc } from "@/lib/helpers";

const FullPictureCard = ({ project, simulationSketch }: FeaturedCardProps) => {
  const imageSrc = getProjectImageSrc(project.imagePath);

  const media = simulationSketch ? (
    <P5Canvas sketch={simulationSketch} className="mt-auto mb-0 h-50 overflow-hidden rounded-lg border border-(--line) lg:h-128" />
  ) : imageSrc ? (
    <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="block h-52 w-full object-cover" loading="lazy" />
  ) : null;

  return (
    <Link key={project.slug} className="flex h-full max-w-full flex-col rounded-[0.9rem] overflow-hidden border border-(--line) bg-(--surface-soft) no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
      {media}

      <div className="px-4 pb-4 pt-3">
        <h3 className="m-0 text-(--text)">{project.title}</h3>
        <p className="mt-2 mb-2 text-[0.92rem] text-(--text-muted)">{project.summary}</p>

        {/* <span className="mt-5 inline-flex items-center gap-2 text-[0.96rem] font-medium text-(--accent)">
          View Project <span aria-hidden="true">→</span>
        </span> */}
      </div>
    </Link>
  );
};

export default FullPictureCard;

interface FeaturedCardProps {
  project: ProjectEntry;
  simulationSketch?: any;
}
