import React, { FC } from "react";
import { Layout, Showcase, Card } from "src/lib/components";
import { generateTestCard } from "src/lib/helpers";

import { NotionResponse } from "src/lib/types";
import { projectsDbId, experimentsDbId, plotsDbId, getDatabase } from "src/lib/api";

const IndexPage: FC<Props> = ({ projects, experiments, plots }) => {
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

  const testCard = {
    title: "Swing gems",
    subTitle: "My attempt at the swing gems game",
    status: "Live",
    slug: "swingGems",
    // types: ["Test", "Experiment"], //* Not implemented yet
  };

  return (
    <>
      <Layout footer={false}>
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card pageData={generateTestCard(testCard)} folder={"experiments"} />}
        <Showcase thingsToShowcase={plots} folder={"plots"} />
        <Showcase thingsToShowcase={experiments} folder={"experiments"} />
        <Showcase thingsToShowcase={projects} folder={"projects"} />
      </Layout>
    </>
  );
};

interface Props {
  experiments: NotionResponse[]; // Not pageMetaData type at this point
  projects: NotionResponse[];
  plots: NotionResponse[];
}

export default IndexPage;

export const getServerSideProps = async () => {
  const online = true;
  // let projects;
  // let experiments;

  // if (online) {
  //   try {
  //     projects = await getDatabase(projectsDbId);
  //   } catch {
  //     projects = null;
  //   }

  //   try {
  //     experiments = await getDatabase(experimentsDbId);
  //   } catch {
  //     experiments = null;
  //   }
  // } else {
  //   projects = null;
  //   experiments = null;
  // }

  const experiments = await getDatabase(experimentsDbId);
  const projects = await getDatabase(projectsDbId);
  const plots = await getDatabase(plotsDbId);

  return {
    props: {
      projects,
      experiments,
      plots,
    },
  };
};