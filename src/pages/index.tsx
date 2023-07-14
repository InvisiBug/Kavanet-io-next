import React, { FC } from "react";
import { Layout, Showcase, LandingPage } from "src/lib/components";
import Card from "../lib/components/cardFactory/card";
import { generateTestCard, getPageMetaData } from "src/lib/helpers";
import { NotionResponse } from "src/lib/types";
import { projectsDbId, experimentsDbId, plotsDbId, getDatabase } from "src/lib/api";
import { links } from "src/lib/constants";

const IndexPage: FC<Props> = ({ experiments }) => {
  // console.log("Projects:", projects.properties);
  // const testCard = {
  //   title: "Poi Image Converter",
  //   subTitle: "Poi Image Converter that im currently working on",
  //   status: "Live",
  //   slug: "imageConverter",
  // };

  // const testCard = {
  //   title: "Blank Default p5 experiment",
  //   subTitle: "This is a blank P5js sketch template",
  //   status: "Live",
  //   slug: "blankSlate",
  //   // types: ["Test", "Experiment"], //* Not implemented yet
  // };

  // const testCard = {
  //   title: "Swing gems",
  //   subTitle: "My attempt at the swing gems game",
  //   status: "Live",
  //   slug: "swingGems",
  //   // types: ["Test", "Experiment"], //* Not implemented yet
  // };

  const testCard = {
    title: "Landscape",
    subTitle: "",
    status: "Dev",
    slug: "landscape",
    folder: "experiments",
  };

  const landingPage = true;

  return (
    <>
      {landingPage ? (
        <LandingPage data={experiments} />
      ) : (
        <Layout footer={false}>
          {/* {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card pageData={generateTestCard(testCard)} folder={testCard.folder} />} */}
          {/* {links.includes("Projects") ? <Showcase thingsToShowcase={projects} folder={"projects"} /> : null} */}
          {/* {links.includes("Plots") ? <Showcase thingsToShowcase={plots} folder={"plots"} /> : null} */}
          {links.includes("Experiments") ? (
            <Showcase thingsToShowcase={experiments.filter((experiment) => experiment.folder === "experiments")} />
          ) : null}
          {/* {links.includes("Recipes") ? <div>hello from recipes</div> : null} */}
        </Layout>
      )}
    </>
  );
};

interface Props {
  experiments: NotionResponse[]; // Not pageMetaData type at this point
}

export default IndexPage;

export const getServerSideProps = async () => {
  try {
    const data = await getDatabase(projectsDbId);
    // console.log(data.length);

    // @ts-ignore
    const test = data.filter((item) => item.properties.status.select.name === "Live");

    const shuffledArray = test.sort(() => 0.5 - Math.random()).slice(0, 10);
    // console.log(shuffledArray.length);

    const experiments: typeof data = [];

    while (experiments.length > 10) {
      experiments.splice(Math.random() / experiments.length, 1);
    }

    return {
      props: {
        experiments: shuffledArray,
      },
    };
  } catch (error) {
    return {
      props: {
        experiments: [],
      },
    };
  }
};
