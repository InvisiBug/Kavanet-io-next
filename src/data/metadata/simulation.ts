import type { ProjectEntry } from "@/lib/types";

export const simulationProjects: ProjectEntry[] = [
  {
    slug: "sin-wave",
    title: "Sin Wave Sim",
    summary: "Simulation environment for cache hit rates, key skew, and replication tradeoffs.",
    category: "simulations",
    simulationKey: "project1",
    tags: ["Distributed Systems", "Simulation", "Performance"],
    imagePath: "/src/lib/images/simulations/sinWave.jpg",
    featured: true,
  },
  {
    slug: "lisajous",
    title: "Lisajous Table",
    summary: "This thing is pretty cool and speaks for itself",
    category: "simulations",
    simulationKey: "project2",
    imagePath: "/src/lib/images/simulations/lisajous.png",
    tags: ["Reliability", "Routing", "Modeling"],
  },
  {
    slug: "dots",
    title: "Dots Simulation",
    summary: "Flying dots field",
    category: "simulations",
    simulationKey: "dots",
    imagePath: "/src/lib/images/simulations/dots.png",
    tags: ["Reliability", "Routing", "Modeling"],
  },
  {
    slug: "zombies",
    title: "Zombie Simulation",
    summary: "This was my attempt at making a live lockscreen wallpaper I had years ago",
    category: "simulations",
    simulationKey: "dots",
    imagePath: "/src/lib/images/simulations/dots.png",
    tags: ["Reliability", "Routing", "Modeling"],
  },
];
