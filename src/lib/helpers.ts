import type { CategoryKey, ProjectEntry } from "@/lib/types";
import { communityProjects, imageModules, markdownModules, personalProjects, projects, simulationProjects } from "@/lib/data/siteData";

export function getProjectsByCategory(category: CategoryKey): ProjectEntry[] {
  const filtered = category === "personal-projects" ? personalProjects : category === "community-projects" ? communityProjects : simulationProjects;

  if (category !== "community-projects") {
    return [...filtered];
  }

  return [...filtered].sort((left, right) => {
    const leftTime = left.date ? new Date(left.date).getTime() : 0;
    const rightTime = right.date ? new Date(right.date).getTime() : 0;
    return rightTime - leftTime;
  });
}

export function getFeaturedProjects(limit = 3): ProjectEntry[] {
  return projects.filter((project) => project.featured).slice(0, limit);
}

export function getProject(category: string, slug: string): ProjectEntry | undefined {
  return projects.find((project) => project.category === category && project.slug === slug);
}

export function getMarkdownContent(path: string): string | null {
  return markdownModules[path] ?? null;
}

export function getProjectImageSrc(path: string): string | null {
  return imageModules[path] ?? null;
}
