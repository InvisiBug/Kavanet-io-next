export type Theme = "light" | "dark";

export type CategoryKey = "personal" | "community" | "simulations";

export type SimulationKey = "lisajous" | "dots" | "rayCasting" | "circlePacking" | "zombies" | "smartRockets" | "repulser" | "triangleMural" | "landscape" | "rotatingSquares" | "castles";

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  category: CategoryKey;
  simulationKey?: SimulationKey;
  date?: string;
  imagePath: string;
  tags?: string[];
  featured?: boolean;
  repositoryUrl?: string;
  demoUrl?: string;
  writeUpPath?: string;
}

export interface LightboxImage {
  src: string;
  alt: string;
}
