import { simLoader, FeaturedCard } from "@/lib/components";
import { getProjectImageSrc } from "@/lib/helpers";
import type { ProjectEntry } from "@/lib/types";

const HeroFeatured = ({ featured, showSimulationPreview = false }: HeroFeaturedProps) => {
  return (
    <section
      className="rounded-[1.2rem] bg-(--surface) border border-(--line) bg-[linear-gradient(145deg,rgba(255,127,0,0.08),transparent_42%),var(--surface)] p-8 shadow-[0_24px_42px_rgba(12,21,43,0.08)] max-[680px]:p-[1.4rem]"
      aria-labelledby="hero-title"
    >
      <p className="m-0 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-(--accent)">Featured Work</p>
      {/* <h1 id="hero-title" className="mt-2 mb-3 max-w-[18ch] text-[clamp(2rem,4vw,3rem)] leading-tight"> */}
      {/* {siteConfig.headline} */}
      {/* </h1> */}
      {/* <p className="m-0 text-(--text-muted)">{siteConfig.subheadline}</p> */}

      {/* // TODO: Not happy with the grid, needs to be one item on sims and many on others */}
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start gap-4">
        {/* <div className="mt-6 flex flex-wrap gap-4"> */}
        {featured.map((project) => {
          const imageSrc = getProjectImageSrc(project.imagePath);
          const simulationSketch = showSimulationPreview && project.category === "simulations" && project.simulationKey ? simLoader[project.simulationKey] : null;

          return <FeaturedCard key={project.slug} project={project} simulationSketch={simulationSketch} imageSrc={imageSrc} />;
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
