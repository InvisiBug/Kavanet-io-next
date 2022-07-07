import React, { FC } from "react";
import { Layout, Showcase, Card } from "src/lib/components";
import { generateTestCard } from "src/lib/helpers";
import { getServerSideProps } from "./query";
import { NotionResponse } from "src/lib/types";

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
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card pageData={generateTestCard(testCard)} folder={"experiments"} />}
        <Showcase thingsToShowcase={experiments} folder={"experiments"} />
        <Showcase thingsToShowcase={projects} folder={"projects"} />
      </Layout>
    </>
  );
};

interface Props {
  experiments: NotionResponse[]; // Not pageMetaData type at this point
  projects: NotionResponse[];
}

export default IndexPage;
export { getServerSideProps };
