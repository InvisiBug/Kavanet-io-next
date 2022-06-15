import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

export const urlFor = (source: object | string) => {
  return imageUrlBuilder(client).image(source);
};

const projectCardFields = `
  Title,
  subTitle,
  "slug": slug.current,
  coverImage,
  thumnail,
  tags,
`;

const blogCardFields = `
  Title,
  subTitle,
  "slug": slug.current,
  coverImage,
  thumnail,
`;

const experimentCardFields = `
  Title,
  subTitle,
  "slug": slug.current,
  thumnail,
  `;

// Cheet sheet https://www.sanity.io/docs/query-cheat-sheet
export const getProjectCardData = async () => {
  const query = `*[_type == "projects"]{
    ${projectCardFields}
  }`;

  const results = await client.fetch(query);

  return results;
};

export const getExperimentCardData = async () => {
  const query = `*[_type == "experiments"]{
    ${experimentCardFields}
  }`;

  const results = await client.fetch(query);

  return results;
};

export const getProjectsBySlug = async (slug: string) => {
  const query = `*[_type == "projects" && slug.current == $slug]{
    ${blogCardFields}
    content[]{..., "asset": asset->}
  }`;

  const params = { slug };

  const results = await client.fetch(query, params).then((response) => response?.[0]);

  // console.log(results);
  return results;
};
