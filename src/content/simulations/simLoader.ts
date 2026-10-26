import type { SketchFactory } from "@/lib/components/P5Canvas";
import type { SimulationKey } from "@/lib/types";

import { sketch as lisajous } from "@/content/simulations/lisajous/";
import { sketch as dots } from "@/content/simulations/dots";
import { sketch as rayCasting } from "@/content/simulations/rayCasting";
import { sketch as circlePacking } from "@/content/simulations/circlePacking";
import { sketch as zombies } from "@/content/simulations/zombies";
import { sketch as smartRockets } from "@/content/simulations/smartRockets";
import { sketch as triangleMural } from "@/content/simulations/triangleMural";
import { sketch as landscape } from "@/content/simulations/3dLandscape";
import { sketch as rotatingSquares } from "@/content/simulations/rotatingSquares";
import { sketch as repulser } from "@/content/simulations/repulser";

//* Dont forget to update the SimulationKey type when adding new items
export const simLoader: Record<SimulationKey, SketchFactory> = {
  lisajous,
  dots,
  rayCasting,
  circlePacking,
  zombies,
  landscape,
  smartRockets,
  repulser,
  triangleMural,
  rotatingSquares,
};
