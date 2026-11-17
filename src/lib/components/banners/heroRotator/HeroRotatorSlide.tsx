import { Link } from "react-router-dom";
import { getProjectImageSrc } from "@/lib/helpers";
import type { ProjectEntry } from "@/lib/types";

interface HeroRotatorSlideProps {
  project: ProjectEntry;
  isActive: boolean;
  isClone: boolean;
}

const HeroRotatorSlide = ({ project, isActive, isClone }: HeroRotatorSlideProps) => {
  const imageSrc = getProjectImageSrc(project.imagePath);
  const isAccessible = isActive && !isClone;

  return (
    <Link
      to={`/${project.category}/${project.slug}`}
      className="relative block w-full shrink-0"
      aria-hidden={!isAccessible}
      tabIndex={isAccessible ? 0 : -1}
    >
      <div className="relative grid h-60 min-h-60 content-center gap-3 px-6 py-8 text-white">
        {imageSrc ? <img src={imageSrc} alt={`${project.title} placeholder`} className="absolute inset-0 h-full w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(20,33,61,0.92),rgba(27,82,129,0.0))]" />

        <div className="relative z-10 grid gap-3">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-sky-200">Project Spotlight</p>
          <h2 className="m-0 text-3xl font-bold leading-tight">{project.title}</h2>
          <p className="m-0 max-w-[70ch] text-slate-100/90">{project.summary}</p>
          <div className="mt-2 inline-block w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 no-underline transition hover:bg-sky-100">View Project</div>
        </div>
      </div>
    </Link>
  );
};

export default HeroRotatorSlide;
