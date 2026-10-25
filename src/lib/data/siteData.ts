import type { ProjectEntry, CategoryKey } from "@/lib/types";

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
    title: "Simulation of natural system through code",
    description: 'A few years ago I came across "The Coding Train" on youTube and loved the logic behind simulations. \n This page showcases my experiments and models',
  },
};

export const personalProjects: ProjectEntry[] = [
  {
    slug: "led-columns",
    title: "LED Columns",
    summary: "A set of LED columns built for the BJC 2026 LED space.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/led-columns.svg",
    tags: ["LED", "Lighting", "Installation"],
    featured: true,
    contentPath: "/src/content/writeups/personal/ledColumns/led-columns.md",
  },
  {
    slug: "staff-bag",
    title: "Staff Bag",
    summary: "A durable carry system prototype for safely storing and transporting flow staffs and accessories.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/staff-bag.svg",
    tags: ["Design", "Fabrication", "Gear"],
    contentPath: "/src/content/writeups/personal/staffBag/staff-bag.md",
  },
  {
    slug: "jinx-flare",
    title: "Jinx Flare",
    summary: "A visual sequencing concept blending synchronized lighting cues and performance timing.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/jinx-flare.svg",
    tags: ["Visuals", "Sequencing", "Performance"],
    contentPath: "/src/content/writeups/personal/jinxFlare/jinx-flare.md",
  },
  {
    slug: "staffs",
    title: "Staffs",
    summary: "A family of custom staff builds exploring balance, grip styles, and interchangeable components.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/staffs.svg",
    tags: ["Prototyping", "Hardware", "Iteration"],
    contentPath: "/src/content/writeups/personal/staffs/staffs.md",
  },
  {
    slug: "home-automation-system",
    title: "Home Automation System",
    summary: "An evolving home setup for lighting, sensors, and routines with reliability and remote control in mind.",
    category: "personal-projects",
    imagePath: "/src/lib/images/personal/home-automation-system.svg",
    tags: ["Automation", "IoT", "Systems"],
    contentPath: "/src/content/writeups/personal/kavanest/home-automation-system.md",
  },
];

export const communityProjects: ProjectEntry[] = [
  {
    slug: "ejc-clubs-2024",
    title: "EJC Clubs 2024",
    summary: "Community club sessions and hands-on workshops delivered throughout the 2024 program.",
    category: "community-projects",
    date: "2024-06-01",
    imagePath: "/src/lib/images/community/ejc-clubs-2024.svg",
    tags: ["Community", "Workshops", "Education"],
    featured: true,
    contentPath: "/src/content/writeups/community/ejcClubs/ejc-clubs-2024.md",
  },
  {
    slug: "flowception-dome-slackfest-2025",
    title: "Flowception Dome Slackfest 2025",
    summary: "An interactive community installation combining visuals, sound, and collaborative live controls.",
    category: "community-projects",
    date: "2025-08-01",
    imagePath: "/src/lib/images/community/flowception-dome-slackfest-2025.svg",
    tags: ["Installation", "Community", "Creative Tech"],
    contentPath: "/src/content/writeups/community/slackfest2025/flowception-dome-slackfest-2025.md",
  },
  {
    slug: "bjc-2026-led-space",
    title: "BJC 2026 LED Space",
    summary: "A large-scale LED environment project for BJC 2026 with programmable zones and reactive patterns.",
    category: "community-projects",
    date: "2026-05-01",
    imagePath: "/src/lib/images/community/bjc-2026-led-space.svg",
    tags: ["LED", "Interactive", "Community"],
    contentPath: "/src/content/writeups/community/bjc2026/bjc-2026-led-space.md",
  },
];

export const simulationProjects: ProjectEntry[] = [
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

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export const projects: ProjectEntry[] = [...personalProjects, ...communityProjects, ...simulationProjects];

export const siteConfig = {
  name: "Kavanet.io",
  role: "Builder of projects, systems, and simulations",
  githubUrl: "https://github.com/invisibug",
  instagramUrl: "https://instagram.com/em.brrrr",
  etsyUrl: "https://www.etsy.com/shop/EmBrrrr",
  linkedinUrl: "https://www.linkedin.com/in/matthewjkavanagh/",
  otherSites: [
    {
      label: "Winter Flow Space",
      url: "https://winterflowspace.com",
    },
    {
      label: "Twiddlesticks",
      url: "https://twiddlesticks.co.uk",
    },
  ],
  headline: "A living portfolio of what I build and learn",
  subheadline: "Explore personal projects, community builds, and system simulations. Each project page is authored in markdown so it is easy to maintain and expand.",
  aboutSummary: "I design and build practical software, with a focus on dependable systems and clear user experiences.",
};
