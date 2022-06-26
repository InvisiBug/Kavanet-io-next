import React, { FC } from "react";
import dynamic from "next/dynamic";
import { Layout, BackArrow } from "lib/components";
import { getPage, getBlocks } from "lib/notion";
import styled from "@emotion/styled";
import { mq, px } from "lib/mediaQueries";

const renderBlock = (block: any) => {
  const { type, id } = block;
  let value;
  console.log(block);
  // const value = block[type].rich_text[0].text.content;

  // console.log(value);

  // if (type === "heading_1") {
  //   const value = block[type].rich_text[0].text.content;
  //   return <h1>{value}</h1>;
  // }

  switch (type) {
    case "heading_1":
      value = block[type].rich_text[0].text.content;
      return <h1>{value}</h1>;

    case "paragraph":
      value = block[type].rich_text[0].text.content;
      return <h1>{value}</h1>;

    case "image":
      value = block[type].file.url;
      return (
        <>
          <ImageContainer>
            <Image src={block[type].file.url} />
          </ImageContainer>
        </>
      );
  }
};

const borders = false;

const ImageContainer = styled.div`
  border: ${borders ? "1px solid blue" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  /* width: 90%; */
  border: ${borders ? "1px solid green" : "none"};

  overflow: hidden;
  object-fit: contain;
  border-radius: 1.5rem;

  ${mq("small")} {
    max-width: ${px("small")}px;
  }
  ${mq("medium")} {
    max-height: 15rem;
  }
  ${mq("large")} {
    max-height: 15rem;
  }
`;

const Experiments: FC<any> = ({ blocks }) => {
  console.log(blocks);

  return (
    <>
      <Layout header={false} footer={false}>
        {/* <BackArrow /> */}
        {blocks.map((block: any) => {
          return renderBlock(block);
        })}
        {/* <h1> test</h1> */}
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({ params }: args) => {
  console.log(params);

  const blocks = await getBlocks(params.slug);

  // console.log(page);

  // https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
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

interface args {
  params: {
    slug: string;
  };
}
