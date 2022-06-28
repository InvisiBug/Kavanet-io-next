import React, { FC } from "react";
import { projectsDbId, experimentsDbId, getDatabase } from "lib/api";
import { Layout, Showcase, Card } from "lib/components";
import { CardFields } from "lib/types";
import { generateTestCard } from "lib/helpers";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
  const testCard = {
    title: "Poi Image Converter",
    subTitle: "Poi Image Converter that im currently working on",
    status: "Live",
    slug: "imageConverter",
  };

  return (
    <>
      <Layout footer={false}>
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card items={generateTestCard(testCard)} folder={"experiments"} />}
        <Showcase items={projects} name={"projects"} />
        <Showcase items={experiments} name={"experiments"} />
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
  const projects = await getDatabase(projectsDbId);
  const experiments = await getDatabase(experimentsDbId);

  return {
    props: {
      projects,
      experiments,
    },
  };
};
