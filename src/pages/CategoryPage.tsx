import { ProjectCard } from "@/components/ProjectCard";
import { categoryMeta, getProjectsByCategory } from "@/data/projects";
import type { CategoryKey } from "@/types";

interface CategoryPageProps {
  category: CategoryKey;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const projects = getProjectsByCategory(category);
  const metadata = categoryMeta[category];

  return (
    <section className="content-stack" aria-labelledby="category-title">
      <header className="section-header">
        <h1 id="category-title">{metadata.title}</h1>
        <p>{metadata.description}</p>
      </header>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
