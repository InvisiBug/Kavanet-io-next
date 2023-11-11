import React, { FC } from "react";
import { Layout, Showcase } from "src/lib/components";
import { NotionResponse, PageMetaData } from "src/lib/types";
import { projectsDbId, getDatabase } from "src/lib/api";
import { getPageMetaData } from "src/lib/helpers";

const ProjectsPage: FC<Props> = ({ projects }) => {
  const formattedExperiments: PageMetaData[] = [];

  projects.forEach((experiment) => {
    formattedExperiments.push(getPageMetaData(experiment));
  });

  const thingsToShowcase = formattedExperiments.filter((experiment) => experiment.folder === "projects");

  return (
    <>
      <Layout footer={false}>
        <Showcase thingsToShowcase={thingsToShowcase} />
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
