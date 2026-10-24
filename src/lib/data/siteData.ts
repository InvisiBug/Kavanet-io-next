import type { CategoryKey, ProjectEntry } from "@/lib/types";

const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const imageModules = import.meta.glob("/src/lib/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
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
    imagePath: "/src/lib/images/personal/generative-art-lab.svg",
    tags: ["TypeScript", "Canvas", "Creative Coding"],
    featured: true,
    repositoryUrl: "https://github.com/your-handle/generative-art-lab",
    contentPath: "/src/content/writeups/personal/generative-art-lab.md",
  },
  {
    slug: "focus-cli-time-tracker",
    title: "Focus CLI Time Tracker",
    summary: "A local-first command line tracker for focused work sessions and progress reports.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/focus-cli-time-tracker.svg",
    tags: ["Node.js", "CLI", "Productivity"],
    contentPath: "/src/content/writeups/personal/focus-cli-time-tracker.md",
  },
  {
    slug: "homelab-observability-stack",
    title: "Homelab Observability Stack",
    summary: "A self-hosted monitoring stack for tracing uptime, logs, and service health in my lab.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/homelab-observability-stack.svg",
    tags: ["Docker", "Grafana", "Observability"],
    contentPath: "/src/content/writeups/personal/homelab-observability-stack.md",
  },
  {
    slug: "weekly-writing-publisher",
    title: "Weekly Writing Publisher",
    summary: "A small publishing pipeline that turns markdown drafts into a searchable static archive.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/weekly-writing-publisher.svg",
    tags: ["Markdown", "Static Site", "Automation"],
    contentPath: "/src/content/writeups/personal/weekly-writing-publisher.md",
  },
  {
    slug: "soundscape-sequencer",
    title: "Soundscape Sequencer",
    summary: "An interactive browser sequencer for layering ambient loops and generative rhythms.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/soundscape-sequencer.svg",
    tags: ["Web Audio", "Creative Coding", "React"],
    contentPath: "/src/content/writeups/personal/soundscape-sequencer.md",
  },
  {
    slug: "local-recipe-engine",
    title: "Local Recipe Engine",
    summary: "A personal recipe app with ingredient scaling, shopping lists, and seasonal suggestions.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/local-recipe-engine.svg",
    tags: ["TypeScript", "PWA", "Data Modeling"],
    contentPath: "/src/content/writeups/personal/local-recipe-engine.md",
  },
  {
    slug: "ejc-clubs-2024",
    title: "EJC Clubs 2024",
    summary: "Community club sessions and hands-on workshops delivered throughout the 2024 program.",
    category: "community-projects",
    date: "2024-06-01",
    imagePath: "/src/lib/images/community/ejc-clubs-2024.svg",
    tags: ["Community", "Workshops", "Education"],
    featured: true,
    contentPath: "/src/content/writeups/community/ejc-clubs-2024.md",
  },
  {
    slug: "flowception-dome-slackfest-2025",
    title: "Flowception Dome Slackfest 2025",
    summary: "An interactive community installation combining visuals, sound, and collaborative live controls.",
    category: "community-projects",
    date: "2025-08-01",
    imagePath: "/src/lib/images/community/flowception-dome-slackfest-2025.svg",
    tags: ["Installation", "Community", "Creative Tech"],
    contentPath: "/src/content/writeups/community/flowception-dome-slackfest-2025.md",
  },
  {
    slug: "bjc-2026-led-space",
    title: "BJC 2026 LED Space",
    summary: "A large-scale LED environment project for BJC 2026 with programmable zones and reactive patterns.",
    category: "community-projects",
    date: "2026-05-01",
    imagePath: "/src/lib/images/community/bjc-2026-led-space.svg",
    tags: ["LED", "Interactive", "Community"],
    contentPath: "/src/content/writeups/community/bjc-2026-led-space.md",
  },
  {
    slug: "distributed-cache-simulator",
    title: "Distributed Cache Simulator",
    summary: "Simulation environment for cache hit rates, key skew, and replication tradeoffs.",
    category: "system-simulations",
    simulationKey: "project1",
    imagePath: "/src/lib/images/simulations/distributed-cache-simulator.svg",
    tags: ["Distributed Systems", "Simulation", "Performance"],
    featured: true,
    contentPath: "/src/content/writeups/simulations/distributed-cache-simulator.md",
  },
  {
    slug: "grid-load-balancer-model",
    title: "Grid Load Balancer Model",
    summary: "A model for balancing requests across regions with latency and failure constraints.",
    category: "system-simulations",
    simulationKey: "project2",
    imagePath: "/src/lib/images/simulations/grid-load-balancer-model.svg",
    tags: ["Reliability", "Routing", "Modeling"],
    contentPath: "/src/content/writeups/simulations/grid-load-balancer-model.md",
  },
];

export function getProjectsByCategory(category: CategoryKey): ProjectEntry[] {
  const filtered = projects.filter((project) => project.category === category);

  if (category !== "community-projects") {
    return filtered;
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

export const siteConfig = {
  name: "Your Name",
  role: "Builder of projects, systems, and simulations",
  githubUrl: "https://github.com/your-handle",
  instagramUrl: "https://instagram.com/your-handle",
  etsyUrl: "https://www.etsy.com/shop/your-shop",
  otherSites: [
    {
      label: "Project Alpha",
      url: "https://example.com/project-alpha",
    },
    {
      label: "Studio Site",
      url: "https://example.com/studio",
    },
    {
      label: "Old Portfolio",
      url: "https://example.com/old-portfolio",
    },
  ],
  headline: "A living portfolio of what I build and learn",
  subheadline: "Explore personal projects, community builds, and system simulations. Each project page is authored in markdown so it is easy to maintain and expand.",
  aboutSummary: "I design and build practical software, with a focus on dependable systems and clear user experiences.",
};
