import React, { FC } from "react";
import { Layout, Showcase, Card } from "lib/components";
import { getProjectCardData, getExperimentCardData } from "lib/api";
import { CardFields } from "lib/types";
// import "dotenv/config";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
  const testProject = {
    Title: "Lisajouis Curve Table",
    folder: "projects",
    subTitle: "The cool table thing",
    slug: "lisajous",
  };

  console.log();

  return (
    <>
      <Layout>
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card project={testProject} folder={"experiments"} />}
        <Showcase projects={experiments} name={"experiments"} />
        <Showcase projects={projects} name={"projects"} />
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
  // console.log("🚀 ~ file: index.tsx ~ line 29 ~ getServerSideProps ~ experiments", experiments);

  return {
    props: {
      projects,
      experiments,
    },
  };
};
