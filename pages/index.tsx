import React, { FC } from "react";
import { projectsDbId, experimentsDbId, getDatabase } from "lib/api";
import { Layout, Showcase, Card } from "lib/components";
import { CardFields } from "lib/types";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
  const testProject = {
    Title: "Image Converter",
    folder: "projects",
    subTitle: "Poi image converter",
    slug: "imageConverter",
  };

  return (
    <>
      <Layout>
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card items={testProject} folder={"experiments"} />}
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
