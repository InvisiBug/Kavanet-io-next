import { Link } from "react-router-dom";
import { P5Canvas, simLoader } from "@/lib/components";
import { type ProjectEntry } from "@/lib/types";
import Meta from "./Meta";

const SimulationCard = ({ project }: SimulationCardProps) => {
  return (
    <Link key={project.slug} className="flex h-150 mb-4 max-w-full flex-col rounded-[0.9rem] overflow-hidden border border-(--line) bg-(--surface-soft) no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
      {project.simulationKey && <P5Canvas sketch={simLoader[project.simulationKey]} className="mt-auto mb-0  overflow-hidden rounded-lg border  border-(--line) lg:h-128" />}

      <Meta project={project} />
    </Link>
  );
};

export default SimulationCard;

interface SimulationCardProps {
  project: ProjectEntry;
}
