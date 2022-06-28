export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateTestCard = ({ title, subTitle, status, slug }: { title: string; subTitle: string; status: string; slug: string }) => {
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
