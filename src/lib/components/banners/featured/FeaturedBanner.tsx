import type { FC, ReactNode } from "react";
import FeaturedBannerContainer from "./Container";
import { FullPictureCard, SimulationCard } from "@/lib/components";
import type { CategoryKey, ProjectEntry } from "@/lib/types";

// Basically works as a factory.
// the correct card type is selected based on the category, and then the cards are rendered inside the FeaturedBannerContainer.
const FeaturedBanner: FC<Props> = ({ projects, category }) => {
  let masonary = false;
  let cardType: ReactNode;

  if (category === "simulations") {
    masonary = false;

    cardType = projects.map((project) => {
      return <SimulationCard key={project.slug} project={project} />;
    });
  } else {
    masonary = true;

    cardType = projects.map((project) => {
      return (
        <div className="mb-4" key={project.slug}>
          <FullPictureCard project={project} />
        </div>
      );
    });
  }

  return <FeaturedBannerContainer masonary={masonary}>{cardType}</FeaturedBannerContainer>;
};

export default FeaturedBanner;

interface Props {
  projects: ProjectEntry[];
  category: CategoryKey;
}
