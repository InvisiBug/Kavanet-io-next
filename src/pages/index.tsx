import React, { FC } from "react";
import { projectsDbId, experimentsDbId, getDatabase } from "src/lib/api";
import { Layout, Showcase, Card } from "src/lib/components";
import { CardFields } from "src/lib/types";
import { generateTestCard } from "src/lib/helpers";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
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
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card item={generateTestCard(testCard)} folder={"experiments"} />}
        <Showcase thingsToShowcase={projects} folder={"projects"} />
        <Showcase thingsToShowcase={experiments} folder={"experiments"} />
      </Layout>
    </>
  );
};

interface Props {
  experiments: any;
  projects: any;
}

export default IndexPage;

export const getServerSideProps = async () => {
  const online = true;
  let projects;
  let experiments;

  if (online) {
    try {
      projects = await getDatabase(projectsDbId);
    } catch {
      projects = null;
    }

    try {
      experiments = await getDatabase(experimentsDbId);
    } catch {
      experiments = null;
    }
  } else {
    projects = null;
    experiments = null;
  }

  return {
    props: {
      projects,
      experiments,
    },
  };
};
