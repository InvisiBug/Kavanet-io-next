import type { CategoryKey, ProjectEntry } from "@/lib/types";
import { communityProjects, personalProjects, projects, simulationProjects } from "@/lib/data/siteData";

export const getProjectsByCategory = (category: CategoryKey): ProjectEntry[] => {
  const filtered = category === "personal-projects" ? personalProjects : category === "community-projects" ? communityProjects : simulationProjects;

  if (category !== "community-projects") {
    return [...filtered];
  }

  return [...filtered].sort((left, right) => {
    const leftTime = left.date ? new Date(left.date).getTime() : 0;
    const rightTime = right.date ? new Date(right.date).getTime() : 0;
    return rightTime - leftTime;
  });
};

export const getFeaturedProjects = (limit = 3): ProjectEntry[] => {
  return projects.filter((project) => project.featured).slice(0, limit);
};

export const getProject = (category: string, slug: string): ProjectEntry | undefined => {
  return projects.find((project) => project.category === category && project.slug === slug);
};

export const getMarkdownContent = (path: string): string | null => {
  return markdownModules[path] ?? null;
};

export const getProjectImageSrc = (path: string): string | null => {
  return imageModules[path] ?? null;
};

export const getRandomProjects = (limit: number): ProjectEntry[] => {
  const shuffled = [...projects].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.max(1, limit));
};

export const getRandomProject = (excludeSlug?: string): ProjectEntry | undefined => {
  const pool = excludeSlug ? projects.filter((project) => project.slug !== excludeSlug) : projects;

  if (pool.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
};

const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const imageModules = import.meta.glob("/src/lib/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  import: "default",
  eager: true,
}) as Record<string, string>;
