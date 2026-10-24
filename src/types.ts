export type CategoryKey = "personal-projects" | "community-projects" | "system-simulations";
export type SimulationKey = "project1" | "project2";

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  category: CategoryKey;
  simulationKey?: SimulationKey;
  date?: string;
  tags: string[];
  featured?: boolean;
  repositoryUrl?: string;
  demoUrl?: string;
  contentPath: string;
}
