import type { SketchFactory } from "@/lib/components/P5Canvas";
import type { SimulationKey } from "@/lib/types";
import { project1Sketch } from "@/content/simulations/project1/sketch";
import { project2Sketch } from "@/content/simulations/project2/sketch";

export const simulationSketches: Record<SimulationKey, SketchFactory> = {
  project1: project1Sketch,
  project2: project2Sketch,
};
