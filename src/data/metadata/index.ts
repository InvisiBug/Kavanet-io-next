import type { ProjectEntry } from "@/lib/types";
import { personalProjects } from "./personal";
import { communityProjects } from "./community";
import { simulationProjects } from "./simulation";

export { simulationProjects, personalProjects, communityProjects };

export const projects: ProjectEntry[] = [...personalProjects, ...communityProjects, ...simulationProjects];

export * from "./categories";
