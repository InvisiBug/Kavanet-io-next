// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

// Method using a render buffer
import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { renderBlock, Header } from "src/lib/components/blogComponents";
import { getBlocks, getPage } from "src/lib/api";
import { Layout, BackArrow } from "src/lib/components";
import { getPageMetaData } from "src/lib/helpers";

import { mq, px } from "src/lib/mediaQueries";

const Experiments: FC<any> = ({ blocks, page }) => {
  // console.log("Prop blocks:", blocks);

  return (
    <>
      <Layout header={true} footer={false}>
        <BackArrow />
        <Header pageMetaData={getPageMetaData(page)} />
        <Content>
          {blocks.map((block: any) => {
            // console.log("Block", block);
            return <Fragment key={Math.random()}>{renderBlock(block)}</Fragment>;
          })}
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
  const blocks = await getBlocks(params.slug);
  const page = await getPage(params.slug);
  console.log("All blocks", blocks);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    const { type } = block;

    console.log(block);
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[type].children) {
      block[type]["children"] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    // console.log(block);
    return block;
  });

  console.log("\n");
  // console.log(blocksWithChildren[0]["column_list"]);
  console.log(blocksWithChildren);

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
  };
};

interface args {
  params: {
    slug: string;
  };
}
