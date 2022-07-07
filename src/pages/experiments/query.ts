import { getDatabase, experimentsDbId } from "src/lib/api";
export const getServerSideProps = async ({ params }: args) => {
  const projects: any = await getDatabase(experimentsDbId);

  let description = null;

  try {
    projects.forEach((project: any) => {
      if (project?.properties?.slug?.rich_text[0]?.plain_text === params.slug) {
        description = project?.properties?.description?.rich_text[0]?.plain_text || null;
      }
    });
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      slug: params.slug,
      description,
    },
  };
};

interface args {
  params: {
    slug: string;
  };
}
