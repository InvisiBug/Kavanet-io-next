import React, { FC } from "react";
import { Layout, Showcase } from "src/lib/components";
import { NotionResponse } from "src/lib/types";
import { plotsDbId, getDatabase } from "src/lib/api";

const PlotsPage: FC<Props> = ({ plots }) => {
  console.log(plots);
  return (
    <>
      <Layout footer={false}>
        <Showcase thingsToShowcase={plots} folder={"plots"} />
      </Layout>
    </>
  );
};

interface Props {
  plots: NotionResponse[]; // Not pageMetaData type at this point
}

export default PlotsPage;

export const getServerSideProps = async () => {
  const plots = await getDatabase(plotsDbId);

  return {
    props: {
      plots,
    },
  };
};
