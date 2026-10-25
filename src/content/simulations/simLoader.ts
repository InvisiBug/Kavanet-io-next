import type { SketchFactory } from "@/lib/components/P5Canvas";
import type { SimulationKey } from "@/lib/types";
import { project1Sketch } from "@/content/simulations/project1/sketch";
import { sketch as lisajous } from "@/content/simulations/lisajous/";
import { sketch as dots } from "@/content/simulations/dots";
import { sketch as rayCasting } from "@/content/simulations/rayCasting";
import { sketch as circlePacking } from "@/content/simulations/circlePacking";
import { sketch as zombies } from "@/content/simulations/zombies";

//* Dont forget to update the SimulationKey type when adding new simulations
export const simLoader: Record<SimulationKey, SketchFactory> = {
  project1: project1Sketch,
  lisajous,
  dots,
  rayCasting,
  circlePacking,
  zombies,
};
