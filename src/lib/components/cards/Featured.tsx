import { Link } from "react-router-dom";
import { P5Canvas } from "@/lib/components";

const FeaturedCard = ({ project, simulationSketch, imageSrc }: FeaturedCardProps) => {
  return (
    <Link key={project.slug} className="flex flex-col rounded-[0.9rem] border border-(--line) bg-(--surface-soft) p-4 no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
      <h3 className="m-0 text-base">{project.title}</h3>
      <p className="mt-2 mb-2 text-[0.92rem] text-(--text-muted)">{project.summary}</p>

      {simulationSketch ? (
        <div className="mt-auto mb-0 overflow-hidden rounded-lg border border-(--line) h-50 lg:h-128 ">
          <P5Canvas sketch={simulationSketch} className="w-full" />
        </div>
      ) : imageSrc ? (
        <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="mt-auto mb-0  w-full rounded-lg border border-(--line) object-cover" loading="lazy" />
      ) : null}
    </Link>
  );
};

export default FeaturedCard;

interface FeaturedCardProps {
  project: any;
  simulationSketch: any;
  imageSrc: string | null;
}
