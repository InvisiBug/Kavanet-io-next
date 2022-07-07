import { getBlocks, getPage } from "src/lib/api";

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

interface args {
  params: {
    slug: string;
  };
}
