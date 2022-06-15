import React, { FC, Fragment } from "react";
import { Layout } from "lib/components";
import { getProjectCardData, getExperimentCardData } from "lib/api";
import { CardFields } from "lib/types";
import ProjectShowcase from "lib/components/showcase";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
  return (
    <>
      <Layout>
        <ProjectShowcase projects={experiments} name={"experiments"} />
        <ProjectShowcase projects={projects} name={"projects"} />
      </Layout>
    </>
  );
};

interface Props {
  projects: CardFields[];
  experiments: any;
}

export default IndexPage;

export const getServerSideProps = async () => {
  const projects: any = await getProjectCardData();
  const experiments = await getExperimentCardData();
  console.log("🚀 ~ file: index.tsx ~ line 29 ~ getServerSideProps ~ experiments", experiments);

  return {
    props: {
      projects,
      experiments,
    },
  };
};
