import { Link } from "react-router-dom";
import { P5Canvas } from "@/lib/components";
import { type ProjectEntry } from "@/lib/types";
import { getProjectImageSrc } from "@/lib/helpers";
import Meta from "./Meta";

const FullPictureCard = ({ project }: FeaturedCardProps) => {
  const imageSrc = getProjectImageSrc(project.imagePath);

  console.log("here");
  return (
    <Link key={project.slug} className="flex h-full mb-4 max-w-full flex-col rounded-[0.9rem] overflow-hidden border border-(--line) bg-(--surface-soft) no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
      {imageSrc && <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="block  w-full object-cover" loading="lazy" />}

      <Meta project={project} />
    </Link>
  );
};

export default FullPictureCard;

interface FeaturedCardProps {
  project: ProjectEntry;
  simulationSketch?: any;
}
