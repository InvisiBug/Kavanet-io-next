import { Client } from "@notionhq/client";

const notion = new Client({
  auth: "secret_WqHz8aDusPmGu1CvlPfyFB7qPGWewnT4x0cNtzjfqK9", // save this in the env
});

export const getDatabase = async (databaseId = "cb41f95f1ee848959683500a3bb8ff44") => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getMyDatabase = async (databaseId = "cb41f95f1ee848959683500a3bb8ff44") => {
  // const response = await notion.databases.query({
  //   database_id: databaseId,
  // });

  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });
  console.log(response);
  return response;
  // return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

const options = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Notion-Version": "2022-02-22",
    Authorization: "Bearer secret_WqHz8aDusPmGu1CvlPfyFB7qPGWewnT4x0cNtzjfqK9",
  },
};

export const test = async () => {
  const response = fetch("https://api.notion.com/v1/databases/database_id", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  console.log(response);
};

export const getBlocks = async (blockId: any) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks?.children?.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }

  console.log(blocks);
  return blocks;
};
