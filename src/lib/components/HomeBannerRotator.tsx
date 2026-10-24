import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/data/siteData";
import { getProjectImageSrc } from "@/lib/helpers";
import type { ProjectEntry } from "@/lib/types";

function getRandomProjects(limit: number): ProjectEntry[] {
  const shuffled = [...projects].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.max(1, limit));
}

const AUTO_ROTATE_MS = 5000;

export function HomeBannerRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  const highlightedProjects = useMemo(() => getRandomProjects(3), []);
  const totalBanners = highlightedProjects.length;

  useEffect(() => {
    if (totalBanners < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % totalBanners);
    }, AUTO_ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [totalBanners]);

  if (totalBanners === 0) {
    return null;
  }

  const activeProject = highlightedProjects[activeIndex];
  const activeImageSrc = getProjectImageSrc(activeProject.imagePath);

  return (
    <section className="overflow-hidden rounded-[1.2rem] border border-(--line) bg-(--surface) shadow-[0_18px_36px_rgba(12,21,43,0.08)]" aria-label="Rotating project highlights">
      <div className="relative grid min-h-60 content-center gap-3 px-6 py-8 text-white">
        {activeImageSrc ? <img src={activeImageSrc} alt={`${activeProject.title} placeholder`} className="absolute inset-0 h-full w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(20,33,61,0.92),rgba(27,82,129,0.9))]" />

        <div className="relative z-10 grid gap-3">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-sky-200">Project Spotlight</p>
          <h2 className="m-0 text-3xl font-bold leading-tight">{activeProject.title}</h2>
          <p className="m-0 max-w-[70ch] text-slate-100/90">{activeProject.summary}</p>
          <Link to={`/${activeProject.category}/${activeProject.slug}`} className="mt-2 inline-block w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 no-underline transition hover:bg-sky-100">
            View Project
          </Link>
        </div>
      </div>

      {totalBanners > 1 ? (
        <div className="flex items-center justify-center gap-2 px-3 pt-3 pb-4" aria-label="Banner selection">
          {highlightedProjects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={index === activeIndex ? "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-(--accent)" : "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-slate-300"}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
