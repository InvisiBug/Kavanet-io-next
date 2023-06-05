import React, { FC } from "react";
import { Layout, Showcase } from "src/lib/components";
import { NotionResponse } from "src/lib/types";
import { projectsDbId, getDatabase } from "src/lib/api";

const ProjectsPage: FC<Props> = ({ projects }) => {
  return (
    <>
      <Layout footer={false}>
        <Showcase thingsToShowcase={projects} folder={"projects"} />
      </Layout>
    </>
  );
};

interface Props {
  projects: NotionResponse[]; // Not pageMetaData type at this point
}

export default ProjectsPage;

export const getServerSideProps = async () => {
  const projects = await getDatabase(projectsDbId);

  return {
    props: {
      projects,
    },
  };
};
