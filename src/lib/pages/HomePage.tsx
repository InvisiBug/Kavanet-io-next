import { Link } from "react-router-dom";
import { HeroFeatured, HomeBannerRotator } from "@/lib/components";
import { categoryMeta, siteConfig } from "@/data";
import { getFeaturedProjects, getRandomProjects } from "@/lib/helpers";

const categoryOrder = ["personal", "community", "simulations"] as const;

const HomePage = () => {
  const random = siteConfig.options.homeScreenFeaturedRandom;
  const featured = random ? getRandomProjects(3) : getFeaturedProjects();

  console.log("🚀 ~ HomePage ~ featured:", featured);

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
};

export default HomePage;
