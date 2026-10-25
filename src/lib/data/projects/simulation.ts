import type { ProjectEntry } from "@/lib/types";

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
