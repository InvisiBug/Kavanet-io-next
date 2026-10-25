import { siteConfig } from "@/data";

export type Theme = "light" | "dark";

export type CategoryKey = "personal" | "community" | "simulations";

export type SimulationKey = "project1" | "project2" | "dots";

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
  writeUpPath?: string;
}

export interface LightboxImage {
  src: string;
  alt: string;
}

export type SiteConfig = typeof siteConfig;
