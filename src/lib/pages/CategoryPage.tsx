import { RegularCard, HeroFeatured, FullPictureCard } from "@/lib/components";
import { categoryMeta, siteConfig } from "@/data";
import { getFeaturedProjects, getProjectsByCategory, getFeaturedProjectsByCategory, getRandomProjectsByCategory } from "@/lib/helpers";
import type { CategoryKey, ProjectEntry } from "@/lib/types";

const CategoryPage = ({ category }: CategoryPageProps) => {
  const projects = getProjectsByCategory(category);

  const showOnlyFeatured = siteConfig.options.categoryPageShowOnlyFeatured;

  const metadata = categoryMeta[category];
  let project: ProjectEntry[] = [];

  let text: string;

  if (category == "simulations") {
    if (showOnlyFeatured) {
      project = getFeaturedProjectsByCategory(category, 1);
    } else {
      project = getRandomProjectsByCategory(category, 1);
    }

    text = "Other Simulations";
  } else {
    project = getRandomProjectsByCategory(category, 2);
    text = "Other Projects";
  }

  return (
    <section className="grid gap-6" aria-labelledby="category-title">
      <header className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1 id="category-title">{metadata.title}</h1>
        <p className="whitespace-pre-line text-(--text-muted)">{metadata.description}</p>
      </header>

      {project ? <HeroFeatured featured={project} showSimulationPreview={category === "simulations"} /> : null}

      <h1 id="category-title">{text}</h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-4">
        {projects.map((project) => (
          <RegularCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;

interface CategoryPageProps {
  category: CategoryKey;
}
