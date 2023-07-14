import React, { FC } from "react";
import { Layout, Showcase } from "src/lib/components";
import { NotionResponse, PageMetaData } from "src/lib/types";
import { projectsDbId, getDatabase } from "src/lib/api";
import { getPageMetaData } from "src/lib/helpers";

const PlotsPage: FC<Props> = ({ plots }) => {
  const formattedExperiments: PageMetaData[] = [];

  plots.forEach((plot) => {
    formattedExperiments.push(getPageMetaData(plot));
  });

  const thingsToShowcase = formattedExperiments.filter((experiment: any) => experiment.folder === "plots");

  return (
    <>
      <Layout footer={false}>
        <Showcase thingsToShowcase={thingsToShowcase} />
      </Layout>
    </>
  );
};

interface Props {
  plots: NotionResponse[]; // Not pageMetaData type at this point
}

export default PlotsPage;

export const getServerSideProps = async () => {
  const plots = await getDatabase();

  return {
    props: {
      plots,
    },
  };
};
