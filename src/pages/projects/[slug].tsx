// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

// Method using a render buffer
import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { Layout, BackArrow } from "src/lib/components";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { mq, px } from "src/lib/mediaQueries";
import { NotionRenderer } from "react-notion-x";

const Experiments: FC<Props> = ({ recordMap }) => {
  return (
    <>
      <Layout header={true} footer={false}>
        <BackArrow />

        {/* <Content> */}
        <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={true} />
        {/* </Content> */}
      </Layout>
    </>
  );
};

type Props = {
  recordMap: ExtendedRecordMap;
};

export default Experiments;

const Content = styled.div`
  margin-bottom: 2rem;
  background: pink;
  /* max-width: 50%; */

  ${mq("small")} {
    max-width: ${px("small")}px;
    /* border: 1px solid green; */
    background: red;
  }
  ${mq("medium")} {
    max-width: ${px("medium")}px;
    background: green;
  }
  ${mq("large")} {
    max-width: ${px("large")}px;
    background: purple;
  }
`;

export const getServerSideProps = async ({ params }: args) => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(params.slug);

  return {
    props: {
      recordMap,
    },
  };
};

interface args {
  params: {
    slug: string;
  };
}
