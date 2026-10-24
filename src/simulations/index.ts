import type { SketchFactory } from "@/components/P5Canvas";
import type { SimulationKey } from "@/types";
import { project1Sketch } from "@/simulations/project1/sketch";
import { project2Sketch } from "@/simulations/project2/sketch";

export const simulationSketches: Record<SimulationKey, SketchFactory> = {
  project1: project1Sketch,
  project2: project2Sketch,
};
