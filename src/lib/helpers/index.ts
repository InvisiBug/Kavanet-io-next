export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateTestCard = ({ title, subTitle, status, slug }: Args) => {
  return {
    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      "Sub title": {
        rich_text: [
          {
            text: { content: subTitle },
          },
        ],
      },
      Status: {
        select: { name: status },
      },
      slug: {
        rich_text: [
          {
            text: { content: slug },
          },
        ],
      },
    },
  };
};

export const getCardFields = (rawCardInfo: any) => {
  const { properties } = rawCardInfo;

  let data: {
    title?: string;
    slug?: string;
    subTitle?: string;
    thumbnail?: string;
    tags?: string[];
    status?: string;
  } = {};

  for (const property in properties) {
    switch (property) {
      case "title":
        data.title = properties[property]?.title[0]?.text?.content;
        break;

      case "slug":
        data.slug = properties[property]?.rich_text[0]?.text.content;
        break;

      case "subTitle":
        data.subTitle = properties[property]?.rich_text[0]?.text.content;
        break;

      case "thumbnail":
        const uploadedImage = properties[property]?.files[0]?.file?.url;
        const linkedImage = properties[property]?.files[0]?.external?.url;

        data.thumbnail = uploadedImage ? uploadedImage : linkedImage;
        break;

      case "tags":
        const tags: string[] = [];

        properties[property].multi_select.forEach((element: any) => {
          tags.push(element.name);
        });

        if (tags.length > 0) {
          data.tags = tags;
        }
        break;

      case "status":
        data.status = properties[property].select?.name;
        break;
    }
  }

  return data;
};

interface Args {
  title: string;
  subTitle: string;
  status: string;
  slug: string;
}
