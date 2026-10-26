import type { CategoryKey, ProjectEntry } from "@/lib/types";
import { communityProjects, personalProjects, simulationProjects, siteConfig } from "@/data";

export const allProjects: ProjectEntry[] = [...personalProjects, ...communityProjects, ...simulationProjects];

export const getProjectsByCategory = (category: CategoryKey): ProjectEntry[] => {
  const filtered = category === "personal" ? personalProjects : category === "community" ? communityProjects : simulationProjects;

  //* Dont think its needed
  // if (category !== "community") {
  //   return [...filtered];
  // }

  // Returns so oldest is last and newest is first
  return [...filtered].sort((left, right) => {
    const leftTime = left.date ? new Date(left.date).getTime() : 0;
    const rightTime = right.date ? new Date(right.date).getTime() : 0;
    return rightTime - leftTime;
  });
};

export const getFeaturedProjects = (limit = siteConfig.options.featuredProjectsLimit): ProjectEntry[] => {
  return allProjects.filter((project) => project.featured).slice(0, limit);
};

export const getRandomFeatured = (limit: number): ProjectEntry[] => {
  const featured = allProjects.filter((project) => project.featured);
  const shuffled = [...featured].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.max(1, limit));
};

export const getProject = (category: string, slug: string): ProjectEntry | undefined => {
  return allProjects.find((project) => project.category === category && project.slug === slug);
};

export const getRandomProjects = (limit: number): ProjectEntry[] => {
  const shuffled = [...allProjects].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.max(1, limit));
};

export const getRandomProjectsFromProjects = (projects: ProjectEntry[], limit: number): ProjectEntry[] => {
  const shuffled = [...projects].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.max(1, limit));
};

export const getRandomProject = (excludeSlug?: string): ProjectEntry | undefined => {
  const pool = excludeSlug ? allProjects.filter((project) => project.slug !== excludeSlug) : allProjects;

  if (pool.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
};

export const getProjectImageSrc = (path: string): string | null => {
  if (!imageModules[path]) {
    console.log("An image tried to show but failed:", path);
    return null;
  }

  return imageModules[path];
};

const imageModules = import.meta.glob("/src/lib/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  import: "default",
  eager: true,
}) as Record<string, string>;
