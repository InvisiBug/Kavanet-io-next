import React from "react";
import { getProjectsBySlug } from "lib/api";
import { Layout } from "lib/components";
import ProjectHeader from "lib/components/projectHeader";

import ProjectContent from "lib/components/projectContent";

const ProjectDetail = ({ projectDetails }: any) => {
  return (
    <>
      <Layout>
        <ProjectHeader projectDetails={projectDetails} />
        <h1>hello from ProjectDetail</h1>
        <ProjectContent projectDetails={projectDetails} />
      </Layout>
    </>
  );
};

export default ProjectDetail;

interface Params {
  params: {
    slug: string;
  };
}

export const getServerSideProps = async ({ params }: Params) => {
  const projectDetails: any = await getProjectsBySlug(params.slug);

  return {
    props: { projectDetails },
  };
};
