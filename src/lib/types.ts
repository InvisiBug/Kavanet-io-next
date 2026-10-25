import { siteConfig } from "@/lib/data";

export type CategoryKey = "personal-projects" | "community-projects" | "system-simulations";
export type SimulationKey = "project1" | "project2";
export type Theme = "light" | "dark";

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  category: CategoryKey;
  simulationKey?: SimulationKey;
  date?: string;
  imagePath: string;
  tags: string[];
  featured?: boolean;
  repositoryUrl?: string;
  demoUrl?: string;
  contentPath: string;
}

export interface LightboxImage {
  src: string;
  alt: string;
}

export type SiteConfig = typeof siteConfig;
