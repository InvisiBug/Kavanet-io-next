import { HeroFeatured } from "@/components/HeroFeatured";
import { HomeBannerRotator } from "@/components/HomeBannerRotator";
import { categoryMeta, getFeaturedProjects } from "@/data/projects";
import { Link } from "react-router-dom";

const categoryOrder = ["personal-projects", "community-projects", "system-simulations"] as const;

export function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="content-stack">
      <HomeBannerRotator />
      <HeroFeatured featured={featured} />

      <section className="category-overview" aria-label="Project categories">
        {categoryOrder.map((categoryKey) => {
          const category = categoryMeta[categoryKey];

          return (
            <article key={categoryKey} className="overview-card">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <Link to={`/${categoryKey}`} className="inline-link">
                Explore {category.title}
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
