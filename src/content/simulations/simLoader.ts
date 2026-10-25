import type { SketchFactory } from "@/lib/components/P5Canvas";
import type { SimulationKey } from "@/lib/types";
import { project1Sketch } from "@/content/simulations/project1/sketch";
import { sketch as project2Sketch } from "@/content/simulations/lisajous/sketch";
import { sketch as dots } from "@/content/simulations/dots/sketch";

//* Dont forget to update the SimulationKey type when adding new simulations
export const simLoader: Record<SimulationKey, SketchFactory> = {
  project1: project1Sketch,
  project2: project2Sketch,
  dots,
};
