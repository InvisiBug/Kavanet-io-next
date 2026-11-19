import type { CategoryKey } from "@/lib/types";

export const categoryMeta: Record<CategoryKey, CategoryMeta> = {
  personal: {
    title: "Personal Projects",
    subTitle: "Projects and things I've built myself",
    description: "These are my small scale personal projects",
  },
  community: {
    title: "Community Projects",
    subTitle: "Projects for my wider community like The Dome and LED Space",
    description: "These are my big projects that I've made for the community including Fire Jams, and the LED Space at BJC",
  },
  simulations: {
    title: "Simulations",
    subTitle: "My simulations of natural systems through code",
    description: 'A few years ago I came across "The Coding Train" on youTube and loved the logic behind simulations. \n This page showcases my experiments and models',
  },
};

type CategoryMeta = {
  title: string;
  subTitle: string;
  description?: string;
};
