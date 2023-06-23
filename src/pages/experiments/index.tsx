import React, { FC } from "react";
import { Layout, Showcase } from "src/lib/components";
import { NotionResponse } from "src/lib/types";
import { projectsDbId, getDatabase } from "src/lib/api";
import { getPageMetaData } from "src/lib/helpers";

const ExperimentsPage: FC<Props> = ({ experiments }) => {
  const formattedExperiments: NotionResponse = [];

  experiments.forEach((experiment) => {
    formattedExperiments.push(getPageMetaData(experiment));
  });

  const thingsToShowcase = formattedExperiments.filter((experiment: any) => experiment.folder === "experiments");

  return (
    <>
      <Layout footer={false}>
        <Showcase thingsToShowcase={thingsToShowcase} />
      </Layout>
    </>
  );
};

interface Props {
  experiments: NotionResponse[]; // Not pageMetaData type at this point
}

export default ExperimentsPage;

export const getServerSideProps = async () => {
  const experiments = await getDatabase(projectsDbId);

  return {
    props: {
      experiments,
    },
  };
};
