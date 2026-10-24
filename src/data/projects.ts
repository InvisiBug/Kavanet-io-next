import type { CategoryKey, ProjectEntry } from "@/types";

const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const categoryMeta: Record<CategoryKey, { title: string; description: string }> = {
  "personal-projects": {
    title: "Personal Projects",
    description: "Independent projects where I test ideas, build products, and sharpen my engineering craft.",
  },
  "community-projects": {
    title: "Community Projects",
    description: "Collaborative work with open-source groups, local communities, and shared initiatives.",
  },
  "system-simulations": {
    title: "System Simulations",
    description: "Experiments and models that explore behavior of systems under load, failures, and scaling events.",
  },
};

export const projects: ProjectEntry[] = [
  {
    slug: "generative-art-lab",
    title: "Generative Art Lab",
    summary: "A browser-based sketchbook for procedural visuals and animation loops.",
    category: "personal-projects",
    tags: ["TypeScript", "Canvas", "Creative Coding"],
    featured: true,
    repositoryUrl: "https://github.com/your-handle/generative-art-lab",
    contentPath: "/src/content/personal/generative-art-lab.md",
  },
  {
    slug: "focus-cli-time-tracker",
    title: "Focus CLI Time Tracker",
    summary: "A local-first command line tracker for focused work sessions and progress reports.",
    category: "personal-projects",
    tags: ["Node.js", "CLI", "Productivity"],
    contentPath: "/src/content/personal/focus-cli-time-tracker.md",
  },
  {
    slug: "docs-sprint-kit",
    title: "Docs Sprint Kit",
    summary: "Templates and tooling to run community documentation sprints with less overhead.",
    category: "community-projects",
    tags: ["Open Source", "Documentation", "Workflows"],
    featured: true,
    repositoryUrl: "https://github.com/your-handle/docs-sprint-kit",
    contentPath: "/src/content/community/docs-sprint-kit.md",
  },
  {
    slug: "local-stem-workshops",
    title: "Local STEM Workshops",
    summary: "Project curriculum and session guides for practical coding and electronics events.",
    category: "community-projects",
    tags: ["Education", "Community", "Mentoring"],
    contentPath: "/src/content/community/local-stem-workshops.md",
  },
  {
    slug: "distributed-cache-simulator",
    title: "Distributed Cache Simulator",
    summary: "Simulation environment for cache hit rates, key skew, and replication tradeoffs.",
    category: "system-simulations",
    tags: ["Distributed Systems", "Simulation", "Performance"],
    featured: true,
    contentPath: "/src/content/simulations/distributed-cache-simulator.md",
  },
  {
    slug: "grid-load-balancer-model",
    title: "Grid Load Balancer Model",
    summary: "A model for balancing requests across regions with latency and failure constraints.",
    category: "system-simulations",
    tags: ["Reliability", "Routing", "Modeling"],
    contentPath: "/src/content/simulations/grid-load-balancer-model.md",
  },
];

export function getProjectsByCategory(category: CategoryKey): ProjectEntry[] {
  return projects.filter((project) => project.category === category);
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
