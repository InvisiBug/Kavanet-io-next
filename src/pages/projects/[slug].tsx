// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

// Method using a render buffer
import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { Layout, BackArrow } from "src/lib/components";
import { NotionAPI } from "notion-client";

import { mq, px } from "src/lib/mediaQueries";

import { NotionRenderer } from "react-notion-x";

const Experiments: FC<any> = ({ recordMap }) => {
  return (
    <>
      <Layout header={true} footer={false}>
        <BackArrow />

        <Content>
          <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={true} />
        </Content>
      </Layout>
    </>
  );
};

export default Experiments;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  color: #cecdcd;
  margin-bottom: 2rem;

  ${mq("small")} {
    max-width: ${px("small")}px;
  }
  ${mq("medium")} {
    max-width: ${px("medium")}px;
  }
  ${mq("large")} {
    max-width: ${px("large")}px;
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
