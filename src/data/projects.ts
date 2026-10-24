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
    slug: "homelab-observability-stack",
    title: "Homelab Observability Stack",
    summary: "A self-hosted monitoring stack for tracing uptime, logs, and service health in my lab.",
    category: "personal-projects",
    tags: ["Docker", "Grafana", "Observability"],
    contentPath: "/src/content/personal/homelab-observability-stack.md",
  },
  {
    slug: "weekly-writing-publisher",
    title: "Weekly Writing Publisher",
    summary: "A small publishing pipeline that turns markdown drafts into a searchable static archive.",
    category: "personal-projects",
    tags: ["Markdown", "Static Site", "Automation"],
    contentPath: "/src/content/personal/weekly-writing-publisher.md",
  },
  {
    slug: "soundscape-sequencer",
    title: "Soundscape Sequencer",
    summary: "An interactive browser sequencer for layering ambient loops and generative rhythms.",
    category: "personal-projects",
    tags: ["Web Audio", "Creative Coding", "React"],
    contentPath: "/src/content/personal/soundscape-sequencer.md",
  },
  {
    slug: "local-recipe-engine",
    title: "Local Recipe Engine",
    summary: "A personal recipe app with ingredient scaling, shopping lists, and seasonal suggestions.",
    category: "personal-projects",
    tags: ["TypeScript", "PWA", "Data Modeling"],
    contentPath: "/src/content/personal/local-recipe-engine.md",
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
    slug: "accessibility-audit-clinic",
    title: "Accessibility Audit Clinic",
    summary: "A volunteer clinic model for rapid accessibility reviews and actionable fixes for local organizations.",
    category: "community-projects",
    tags: ["Accessibility", "Community", "Frontend"],
    contentPath: "/src/content/community/accessibility-audit-clinic.md",
  },
  {
    slug: "open-data-map-nights",
    title: "Open Data Map Nights",
    summary: "Recurring meetups where contributors clean, enrich, and visualize neighborhood open datasets.",
    category: "community-projects",
    tags: ["Open Data", "GIS", "Collaboration"],
    contentPath: "/src/content/community/open-data-map-nights.md",
  },
  {
    slug: "community-job-board-api",
    title: "Community Job Board API",
    summary: "A shared API service that powers a local jobs board with moderation and lightweight analytics.",
    category: "community-projects",
    tags: ["API", "Node.js", "Open Source"],
    contentPath: "/src/content/community/community-job-board-api.md",
  },
  {
    slug: "onboarding-playbook-library",
    title: "Onboarding Playbook Library",
    summary: "A repository of onboarding playbooks to help new volunteers contribute quickly to active projects.",
    category: "community-projects",
    tags: ["Documentation", "Process", "Mentoring"],
    contentPath: "/src/content/community/onboarding-playbook-library.md",
  },
  {
    slug: "distributed-cache-simulator",
    title: "Distributed Cache Simulator",
    summary: "Simulation environment for cache hit rates, key skew, and replication tradeoffs.",
    category: "system-simulations",
    simulationKey: "project1",
    tags: ["Distributed Systems", "Simulation", "Performance"],
    featured: true,
    contentPath: "/src/content/simulations/distributed-cache-simulator.md",
  },
  {
    slug: "grid-load-balancer-model",
    title: "Grid Load Balancer Model",
    summary: "A model for balancing requests across regions with latency and failure constraints.",
    category: "system-simulations",
    simulationKey: "project2",
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
