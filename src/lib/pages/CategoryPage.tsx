import { HeroFeatured, ProjectCard } from "@/lib/components";
import { categoryMeta } from "@/data";
import { getProjectsByCategory, getRandomProjectsFromProjects } from "@/lib/helpers";
import type { CategoryKey, ProjectEntry } from "@/lib/types";

const CategoryPage = ({ category }: CategoryPageProps) => {
  const projects = getProjectsByCategory(category);

  const metadata = categoryMeta[category];
  let randomProject: ProjectEntry[] = [];

  let text: string;

  if (category !== "simulations") {
    randomProject = getRandomProjectsFromProjects(projects, 2);
    text = "Other Projects";
  } else {
    randomProject = getRandomProjectsFromProjects(projects, 1);
    text = "Other Simulations";
  }

  return (
    <section className="grid gap-6" aria-labelledby="category-title">
      <header className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1 id="category-title">{metadata.title}</h1>
        <p className="whitespace-pre-line text-(--text-muted)">{metadata.description}</p>
      </header>

      {randomProject ? <HeroFeatured featured={randomProject} showSimulationPreview={category === "simulations"} /> : null}

      <h1 id="category-title">{text}</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;

interface CategoryPageProps {
  category: CategoryKey;
}
