// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { renderBlock, Header } from "lib/components/blogComponents";
import { Layout, BackArrow } from "lib/components";
import { getBlocks, getPage } from "lib/api";
import { mq, px } from "lib/mediaQueries";

const Experiments: FC<any> = ({ blocks, page }) => {
  const { properties: pageData } = page;

  const pageMetaData = {
    title: pageData?.title.title[0]?.text?.content,
    subTitle: pageData?.["Sub title"]?.rich_text[0]?.text.content,
    description: pageData?.["Description"]?.rich_text[0]?.text.content,
    coverImage: pageData?.["Cover Image"]?.files[0]?.file?.url,
  };

  return (
    <>
      <Layout header={true} footer={false}>
        <BackArrow />
        <Header pageMetaData={pageMetaData} />
        <Content>
          {blocks.map((block: any) => {
            return <Fragment key={Math.random()}>{renderBlock(block)}</Fragment>;
          })}
        </Content>
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({ params }: args) => {
  const blocks = await getBlocks(params.slug);
  const page = await getPage(params.slug);

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
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    return block;
  });

  return {
    props: {
      page,
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
