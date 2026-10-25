import type { CategoryKey } from "@/lib/types";

export const categoryMeta: Record<CategoryKey, { title: string; description: string }> = {
  personal: {
    title: "Personal Projects",
    description: "Independent projects where I test ideas, build products, and sharpen my engineering craft.",
  },
  community: {
    title: "Community Projects",
    description: "Collaborative work with open-source groups, local communities, and shared initiatives.",
  },
  simulations: {
    title: "Simulation of natural system through code",
    description: 'A few years ago I came across "The Coding Train" on youTube and loved the logic behind simulations. \n This page showcases my experiments and models',
  },
};
