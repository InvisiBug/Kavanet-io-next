import React, { FC, Fragment } from "react";
import { Layout } from "lib/components";
import styled from "@emotion/styled";
import { getProjectCardData, getExperimentCardData } from "lib/api";
import { CardFields } from "lib/types";
import ProjectShowcase from "lib/components/showcase";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
  return (
    <>
      <Layout>
        {/* <Layer> */}
        <ProjectShowcase projects={experiments} name={"experiments"} />
        <ProjectShowcase projects={projects} name={"projects"} />
        {/* </Layer> */}
      </Layout>
    </>
  );
};

interface Props {
  projects: CardFields[];
  experiments: any;
}

export default IndexPage;

const Pic = styled.img`
  /* position: absolute; */
  /* width: 100%; */
  /* height: 100%; */
  z-index: 1;
`;

const Layer = styled.div`
  z-index: 100;
`;

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
