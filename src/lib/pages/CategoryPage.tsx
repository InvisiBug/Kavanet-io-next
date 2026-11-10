import type { ReactNode } from "react";
import { HeroFeatured, FullPictureCard, SimulationCard } from "@/lib/components";
import { categoryMeta, siteConfig } from "@/data";
import { getProjectsByCategory, getFeaturedProjectsByCategory, getRandomProjectsByCategory, getCategorySettings } from "@/lib/helpers";
import type { CategoryKey, ProjectEntry } from "@/lib/types";

const CategoryPage = ({ category }: CategoryPageProps) => {
  const projects = getProjectsByCategory(category);
  const metadata = categoryMeta[category];
  const categorySettings = getCategorySettings(category);
  const { categoryPageShowOnlyFeatured } = siteConfig.options;

  let project: ProjectEntry[] = [];
  if (categoryPageShowOnlyFeatured) {
    project = getFeaturedProjectsByCategory(category, categorySettings.numProjects);
  } else {
    project = getRandomProjectsByCategory(category, categorySettings.numProjects);
  }

  return (
    <section className="grid gap-6" aria-labelledby="category-title">
      <header className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1 id="category-title">{metadata.title}</h1>
        <p className="whitespace-pre-line text-(--text-muted)">{metadata.description}</p>
      </header>

      {project && renderHero(project, category)}

      <div className={"p-6 lg:p-0"}>
        <h1 className={"mb-5"} id="category-title">
          {categorySettings.text}
        </h1>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
          {projects.map((project) => (
            <div key={project.slug} className="mb-4">
              <FullPictureCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;

interface CategoryPageProps {
  category: CategoryKey;
}

type CategorySettings = {
  numProjects: number;
  text: string;
};

const renderHero = (project: ProjectEntry[], category: CategoryKey) => {
  let masonary = false;
  let cardType: ReactNode;

  if (category === "simulations") {
    masonary = false;

    cardType = project.map((project) => {
      return <SimulationCard key={project.slug} project={project} />;
    });
  } else {
    masonary = true;

    cardType = project.map((project) => {
      return <FullPictureCard key={project.slug} project={project} />;
    });
  }

  return <HeroFeatured masonary={masonary}>{cardType}</HeroFeatured>;
};
