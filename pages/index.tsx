import React, { FC, Fragment } from "react";
import { Layout } from "lib/components";
import { getAllProjects, getAllExperiments } from "lib/api";
import { ProjectCardFields } from "lib/types";
import ProjectShowcase from "lib/components/projectShowcase";
import ExperimentShowcase from "lib/components/experimentShowcase";
import { useRouter } from "next/router";

const IndexPage: FC<Props> = ({ projects, experiments }) => {
  const router = useRouter();
  // router.reload();

  return (
    <>
      <Layout>
        <ProjectShowcase projects={projects} />
        <ExperimentShowcase projects={experiments} />
      </Layout>
    </>
  );
};

interface Props {
  projects: ProjectCardFields[];
  experiments: any;
}

export default IndexPage;

export const getServerSideProps = async () => {
  const projects: any = await getAllProjects();
  const experiments = await getAllExperiments();
  console.log("🚀 ~ file: index.tsx ~ line 29 ~ getServerSideProps ~ experiments", experiments);

  return {
    props: {
      projects,
      experiments,
    },
  };
};
