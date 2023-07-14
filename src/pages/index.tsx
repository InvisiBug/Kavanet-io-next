import React, { FC } from "react";
import { Layout, Showcase, LandingPage } from "src/lib/components";
import Card from "../lib/components/cardFactory/card";
import { generateTestCard, getPageMetaData } from "src/lib/helpers";
import { NotionResponse } from "src/lib/types";
import { projectsDbId, experimentsDbId, plotsDbId, getDatabase } from "src/lib/api";
import { links } from "src/lib/constants";

const IndexPage: FC<Props> = ({ dbItems }) => {
  console.log("🚀 ~ file: index.tsx:10 ~ dbItems:", dbItems);

  const landingPage = true;

  return <>{landingPage ? <LandingPage dbItems={dbItems} /> : null}</>;
  // return <h1>hello</h1>;
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
