import { HeroFeatured } from "@/lib/components/HeroFeatured";
import { HomeBannerRotator } from "@/lib/components/HomeBannerRotator";
import { categoryMeta } from "@/lib/helpers";
import { getFeaturedProjects } from "@/lib/helpers";
import { Link } from "react-router-dom";

const categoryOrder = ["personal-projects", "community-projects", "system-simulations"] as const;

export function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="grid gap-6">
      <HomeBannerRotator />
      <HeroFeatured featured={featured} />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4" aria-label="Project categories">
        {categoryOrder.map((categoryKey) => {
          const category = categoryMeta[categoryKey];

          return (
            <article key={categoryKey} className="rounded-2xl border border-(--line) bg-(--surface) p-5">
              <h2 className="m-0">{category.title}</h2>
              <p className="mt-3 mb-0 text-(--text-muted)">{category.description}</p>
              <Link to={`/${categoryKey}`} className="mt-3 inline-block font-bold text-(--text) no-underline transition hover:text-(--accent)">
                Explore {category.title}
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
