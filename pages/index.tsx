import React, { FC, Fragment } from "react";
import { Layout } from "lib/components";
import { Global, css } from "@emotion/react";
import { getAllProjects } from "lib/api";
import { ProjectCardFields } from "lib/types";
import Head from "next/head";
import ProjectShowcase from "lib/components/projectShowcase";

const IndexPage: FC<Props> = ({ projects }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <ProjectShowcase projects={projects} />
      </Layout>
    </>
  );
};

interface Props {
  projects: ProjectCardFields[];
}

export default IndexPage;

export const getServerSideProps = async () => {
  console.log("Calling server side props");
  const projects: any = await getAllProjects();
  console.log(projects);

  return {
    props: {
      projects,
    },
  };
};

const globalStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: white;
    font-family: 'Nunito', sans-serif;
    user-select: none;
    scroll;
  }
`;
