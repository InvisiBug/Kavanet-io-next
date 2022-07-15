import React, { FC } from "react";
import { Layout, Showcase, Card } from "src/lib/components";
import { NotionResponse } from "src/lib/types";
import { experimentsDbId, getDatabase } from "src/lib/api";

const ExperimentsPage: FC<Props> = ({ experiments }) => {
  return (
    <>
      <Layout footer={false}>
        <Showcase thingsToShowcase={experiments} folder={"experiments"} />
      </Layout>
    </>
  );
};

interface Props {
  experiments: NotionResponse[]; // Not pageMetaData type at this point
}

export default ExperimentsPage;

export const getServerSideProps = async () => {
  const experiments = await getDatabase(experimentsDbId);

  return {
    props: {
      experiments,
    },
  };
};
