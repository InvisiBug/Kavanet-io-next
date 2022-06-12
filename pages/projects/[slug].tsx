import React from "react";
import { getProjectsBySlug } from "lib/api";
import { Layout } from "lib/components";
import ProjectHeader from "lib/components/projectHeader";

const ProjectDetail = ({ projectDetails }) => {
  console.log(projectDetails);
  return (
    <>
      <Layout>
        <ProjectHeader projectDetails={projectDetails} />
        <h1>hello from ProjectDetail</h1>
      </Layout>
    </>
  );
};

export default ProjectDetail;

export const getServerSideProps = async ({ params }) => {
  const projectDetails: any = await getProjectsBySlug(params.slug);

  return {
    props: { projectDetails },
  };
};
