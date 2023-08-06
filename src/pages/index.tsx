import React, { FC } from "react";
import { LandingPage } from "src/lib/components";
import { NotionResponse } from "src/lib/types";
import { getDatabase } from "src/lib/api";

const IndexPage: FC<Props> = ({ dbItems }) => {
  const landingPage = true;

  return <>{landingPage ? <LandingPage dbItems={dbItems} /> : null}</>;
};

interface Props {
  dbItems: NotionResponse[]; // Not pageMetaData type at this point
}

export default IndexPage;

/**
 * Gets all elements in database and returns 10 random ones
 */
export const getServerSideProps = async () => {
  try {
    const allDbItems = await getDatabase();

    // @ts-ignore
    const liveDbItems = allDbItems.filter((item) => item.properties.status.select.name === "Live");

    const randomDbItems = liveDbItems.sort(() => 0.5 - Math.random()).slice(0, 10);

    return {
      props: {
        dbItems: randomDbItems,
      },
    };
  } catch (error) {
    return {
      props: {
        experiments: [],
      },
    };
  }
};
