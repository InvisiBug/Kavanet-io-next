export type CategoryKey = "personal-projects" | "community-projects" | "system-simulations";

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  category: CategoryKey;
  tags: string[];
  featured?: boolean;
  repositoryUrl?: string;
  demoUrl?: string;
  contentPath: string;
}
