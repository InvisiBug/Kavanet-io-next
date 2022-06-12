import React, { FC, Fragment } from "react";
import { Layout } from "lib/components";
import { getAllProjects } from "lib/api";
import { ProjectCardFields } from "lib/types";
import ProjectShowcase from "lib/components/projectShowcase";

const IndexPage: FC<Props> = ({ projects }) => {
  return (
    <>
      <Layout>
        <ProjectShowcase projects={projects} />
      </Layout>
    </>
  );
};

interface Props {
  projects: ProjectCardFields[];
}

export default IndexPage;

export const getServerSideProps = async () => {
  const projects: any = await getAllProjects();

  return {
    props: {
      projects,
    },
  };
};
