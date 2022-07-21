import React, { FC } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { Layout, BackArrow } from "src/lib/components";
import { getDatabase, experimentsDbId } from "src/lib/api";

const Experiments: FC<any> = ({ slug, description }) => {
  const Sketch = dynamic(() => import(`src/experiments/${slug}`), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
        {description ? <Description>{description}</Description> : null}
        <BackArrow />
        <Sketch />
      </Layout>
    </>
  );
};

export default Experiments;

const borders = false;

const Description = styled.div`
  border: ${borders ? "2px solid red" : "none"};
  position: absolute;
  top: 10rem;
  left: 5rem;

  min-width: 0px;
  max-width: 15rem;
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  font-size: 1rem;
  text-align: justify;
  padding: 1rem;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5%;
`;

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
