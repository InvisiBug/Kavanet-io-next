import { useMemo } from "react";
import { Link } from "react-router-dom";
import { HeroFeatured, HomeBannerRotator, RegularCard, FullPictureCard } from "@/lib/components";
import { categoryMeta, siteConfig } from "@/data";
import { getFeaturedProjects, getProjectsByCategory, getRandomProjects } from "@/lib/helpers";

const categoryOrder = ["personal", "community", "simulations"] as const;

const HomePage = () => {
  const random = siteConfig.options.homeScreenFeaturedRandom;
  const featured = random ? getRandomProjects(siteConfig.options.featuredProjectsLimit) : getFeaturedProjects();

  const randomProjectsByCategory = useMemo(() => {
    return Object.fromEntries(
      categoryOrder.map((category) => {
        const categoryProjects = getProjectsByCategory(category);
        const randomProject = categoryProjects[Math.floor(Math.random() * categoryProjects.length)];
        return [category, randomProject];
      }),
    );
  }, []);

  return (
    <div className="grid gap-6">
      <HomeBannerRotator />
      <HeroFeatured featured={featured} />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-4" aria-label="Project categories">
        {categoryOrder.map((categoryKey) => {
          const category = categoryMeta[categoryKey];

          return (
            <article key={categoryKey} className="rounded-2xl inline-block border border-(--line) bg-(--surface) p-5">
              <Link to={`/${categoryKey}`} key={categoryKey} className="mt-3 inline-block font-bold text-(--text) no-underline transition hover:text-(--accent) ">
                <h2 className="m-0">{category.title}</h2>
                <p className="mt-3 mb-0 text-(--text-muted)">{category.description}</p>
                <h2 className="mt-5 mb-5 text-(--text)">Explore {category.title}</h2>
              </Link>

              {randomProjectsByCategory[categoryKey] ? <FullPictureCard project={randomProjectsByCategory[categoryKey]} /> : null}
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
