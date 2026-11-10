import { Link } from "react-router-dom";
import { HomeBannerRotator, FullPictureCard, AboutMeCard, ErrorPage } from "@/lib/components";
import { categoryMeta, workExperienceImageSrc, workExperienceSummary } from "@/data";
import { getRandomProjectsByCategory } from "@/lib/helpers";
import type { CategoryKey } from "@/lib/types";

const categories = Object.keys(categoryMeta) as CategoryKey[];

const HomePage = () => {
  return (
    <div className="grid gap-6">
      <HomeBannerRotator />
      <AboutMeCard imageSrc={workExperienceImageSrc} blurb={workExperienceSummary} />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-4" aria-label="Project categories">
        {categories.map((category) => {
          const project = getRandomProjectsByCategory(category, 1);
          const categoryMetaData = categoryMeta[category];

          return (
            <article key={category} className="rounded-2xl inline-block border border-(--line) bg-(--surface) p-5">
              <Link to={`/${category}`} key={category} className="mt-3 inline-block font-bold text-(--text) no-underline transition hover:text-(--accent) ">
                <h2 className="m-0">{categoryMetaData.title}</h2>
                <p className="mt-3 mb-0 text-(--text-muted)">{categoryMetaData.description}</p>
                <h2 className="mt-5 mb-5 text-(--text)">Explore {categoryMetaData.title}</h2>
              </Link>

              {project ? <FullPictureCard project={project[0]} /> : <ErrorPage />}
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
