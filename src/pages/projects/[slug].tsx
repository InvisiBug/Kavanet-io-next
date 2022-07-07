// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { renderBlock, Header } from "src/lib/components/blogComponents";
import { Layout, BackArrow } from "src/lib/components";
import { getServerSideProps } from "./query";
import { getPageMetaData } from "src/lib/helpers";

import { mq, px } from "src/lib/mediaQueries";

const Experiments: FC<any> = ({ blocks, page }) => {
  return (
    <>
      <Layout header={true} footer={false}>
        <BackArrow />
        <Header pageMetaData={getPageMetaData(page)} />
        <Content>
          {blocks.map((block: any) => {
            return <Fragment key={Math.random()}>{renderBlock(block)}</Fragment>;
          })}
        </Content>
      </Layout>
    </>
  );
};

export default Experiments;
export { getServerSideProps };

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  color: #cecdcd;
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
