import { Client } from "@notionhq/client";

export const projectsDbId = "cb41f95f1ee848959683500a3bb8ff44";
export const experimentsDbId = "23cd889925e44059a5b60eaa2934a4a0";
export const plotsDbId = "eadffbb27aa14e0eab863654fb03c791";

const notion = new Client({
  auth: "secret_WqHz8aDusPmGu1CvlPfyFB7qPGWewnT4x0cNtzjfqK9", // save this in the env
});

export const getDatabase = async (databaseId = "cb41f95f1ee848959683500a3bb8ff44") => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: any) => {
  const blocks = [];
  let cursor;

  while (true) {
    const { results, next_cursor }: { results: any; next_cursor: any } = await notion.blocks?.children?.list({
      start_cursor: cursor,
      block_id: blockId,
    });

    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }

  return blocks;
};
