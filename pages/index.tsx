import React, { FC } from "react";
import { Layout, Showcase, Card, NotionShowcase } from "lib/components";
import { getDatabase } from "lib/notion";
import { getProjectCardData, getExperimentCardData, getNotionPosts } from "lib/api";
import { CardFields } from "lib/types";
import { test } from "lib/notion";
// import "dotenv/config";

const IndexPage: FC<Props> = ({ projects, experiments, notionPosts }) => {
  const testProject = {
    Title: "Image Converter",
    folder: "projects",
    subTitle: "Poi image converter",
    slug: "imageConverter",
  };

  return (
    <>
      <Layout>
        {process.env.NEXT_PUBLIC_LOCAL === "true" && <Card project={testProject} folder={"experiments"} />}
        <Showcase projects={experiments} name={"experiments"} />
        <Showcase projects={projects} name={"projects"} />
        <NotionShowcase projects={notionPosts} name={"notion"} />
      </Layout>
    </>
  );
};

interface Props {
  projects: CardFields[];
  experiments: any;
  notionPosts: any;
}

export default IndexPage;

export const getServerSideProps = async () => {
  const projects: any = await getProjectCardData();
  const experiments = await getExperimentCardData();
  const notionPosts = await getDatabase();

  return {
    props: {
      projects,
      experiments,
      notionPosts,
    },
  };
};
