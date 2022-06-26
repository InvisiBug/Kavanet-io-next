import React, { FC } from "react";
import styled from "@emotion/styled";
import { renderBlock } from "lib/components/blogComponents";
import { Layout, BackArrow } from "lib/components";
import { mq, px } from "lib/mediaQueries";
import { getBlocks } from "lib/notion";

const Experiments: FC<any> = ({ blocks }) => {
  return (
    <>
      <Layout header={true} footer={false}>
        <BackArrow />
        <Content>
          {blocks.map((block: any) => {
            return renderBlock(block);
          })}
        </Content>
      </Layout>
    </>
  );
};

// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
export const getServerSideProps = async ({ params }: args) => {
  const blocks = await getBlocks(params.slug);
  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren: any = blocks.map((block: any) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    return block;
  });

  return {
    props: {
      blocks: blocksWithChildren,
    },
  };
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

interface args {
  params: {
    slug: string;
  };
}
