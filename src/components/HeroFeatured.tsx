import { Link } from "react-router-dom";
import type { ProjectEntry } from "@/types";
import { siteConfig } from "@/siteConfig";

interface HeroFeaturedProps {
  featured: ProjectEntry[];
}

export function HeroFeatured({ featured }: HeroFeaturedProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero-kicker">Featured Work</p>
      <h1 id="hero-title">{siteConfig.headline}</h1>
      <p className="hero-subtitle">{siteConfig.subheadline}</p>

      <div className="hero-feature-grid">
        {featured.map((project) => (
          <Link key={project.slug} className="hero-feature-item" to={`/${project.category}/${project.slug}`}>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
