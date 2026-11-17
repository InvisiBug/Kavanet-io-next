import type { FC } from "react";
import type { ProjectEntry } from "@/lib/types";

const HeroRotatorControls: FC<HeroRotatorControlsProps> = ({ projects, activeIndex, onSelect, onPrevious, onNext }) => (
  <div className="hidden items-center justify-center gap-2 px-3 pt-3 pb-4 md:flex" role="group" aria-label="Banner navigation">
    <button
      type="button"
      className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-(--text-muted) transition hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) md:flex"
      onClick={onPrevious}
      aria-label="Previous project"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
    {projects.map((project, index) => (
      <button
        key={project.slug}
        type="button"
        className={index === activeIndex ? "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-(--accent)" : "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-slate-300"}
        onClick={() => onSelect(index)}
        aria-label={`Show banner ${index + 1}`}
        aria-pressed={index === activeIndex}
      />
    ))}
    <button
      type="button"
      className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-(--text-muted) transition hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) md:flex"
      onClick={onNext}
      aria-label="Next project"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>
);

export default HeroRotatorControls;

interface HeroRotatorControlsProps {
  projects: ProjectEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}
