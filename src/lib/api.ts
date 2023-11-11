import { Client } from "@notionhq/client";

export const projectsDbId = "cb41f95f1ee848959683500a3bb8ff44";
export const experimentsDbId = "23cd889925e44059a5b60eaa2934a4a0";
export const plotsDbId = "eadffbb27aa14e0eab863654fb03c791";

const notion = new Client({
  auth: "secret_WqHz8aDusPmGu1CvlPfyFB7qPGWewnT4x0cNtzjfqK9", // save this in the env
});

export const getDatabase = async (database_id = "cb41f95f1ee848959683500a3bb8ff44") => {
  const response = await notion.databases.query({
    database_id,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};
