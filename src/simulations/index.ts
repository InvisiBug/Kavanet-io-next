import type { SketchFactory } from "@/components/P5Canvas";
import { project1Sketch } from "@/simulations/project1/sketch";
import { project2Sketch } from "@/simulations/project2/sketch";

export const simulationSketches: Record<string, SketchFactory> = {
  "distributed-cache-simulator": project1Sketch,
  "grid-load-balancer-model": project2Sketch,
};
