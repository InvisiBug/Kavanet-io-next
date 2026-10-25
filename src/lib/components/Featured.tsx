import { Link } from "react-router-dom";
import { simLoader } from "@/lib/components";
import { P5Canvas } from "@/lib/components/P5Canvas";
import { getProjectImageSrc } from "@/lib/helpers";
import type { ProjectEntry } from "@/lib/types";
import { siteConfig } from "@/data";

const HeroFeatured = ({ featured, showSimulationPreview = false }: HeroFeaturedProps) => {
  return (
    <section className="rounded-[1.2rem] border border-(--line) bg-[linear-gradient(145deg,rgba(255,127,0,0.08),transparent_42%),var(--surface)] p-8 shadow-[0_24px_42px_rgba(12,21,43,0.08)] max-[680px]:p-[1.4rem]" aria-labelledby="hero-title">
      <p className="m-0 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-(--accent)">Featured Work</p>
      {/* <h1 id="hero-title" className="mt-2 mb-3 max-w-[18ch] text-[clamp(2rem,4vw,3rem)] leading-tight"> */}
      {/* {siteConfig.headline} */}
      {/* </h1> */}
      {/* <p className="m-0 text-(--text-muted)">{siteConfig.subheadline}</p> */}

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {featured.map((project) => {
          const imageSrc = getProjectImageSrc(project.imagePath);
          const simulationSketch = showSimulationPreview && project.category === "simulations" && project.simulationKey ? simLoader[project.simulationKey] : null;

          return (
            <Link key={project.slug} className="block rounded-[0.9rem] border border-(--line) bg-(--surface-soft) p-4 no-underline text-inherit" to={`/${project.category}/${project.slug}`}>
              <h3 className="m-0 text-base">{project.title}</h3>
              <p className="mt-2 mb-10 text-[0.92rem] text-(--text-muted) ">{project.summary}</p>

              {simulationSketch ? (
                <div className="mb-3 overflow-hidden rounded-lg border border-(--line) h-50 lg:h-128 ">
                  <P5Canvas sketch={simulationSketch} className=" w-full" />
                </div>
              ) : imageSrc ? (
                <img src={imageSrc} alt={`${project.title} placeholder`} data-no-lightbox="true" className="mb-3   w-full rounded-lg border border-(--line) object-cover" loading="lazy" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default HeroFeatured;

interface HeroFeaturedProps {
  featured: ProjectEntry[];
  showSimulationPreview?: boolean;
}
