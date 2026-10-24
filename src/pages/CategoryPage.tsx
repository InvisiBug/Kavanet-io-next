import { ProjectCard } from "@/lib/components/ProjectCard";
import { categoryMeta } from "@/lib/helpers";
import { getProjectsByCategory } from "@/lib/helpers";
import type { CategoryKey } from "@/lib/types";

interface CategoryPageProps {
  category: CategoryKey;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const projects = getProjectsByCategory(category);
  const metadata = categoryMeta[category];

  return (
    <section className="grid gap-6" aria-labelledby="category-title">
      <header className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1 id="category-title">{metadata.title}</h1>
        <p className="text-(--text-muted)">{metadata.description}</p>
      </header>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
