import React, { FC } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { Layout, BackArrow } from "src/lib/components";
import { getDatabase, experimentsDbId } from "src/lib/api";

const Experiments: FC<any> = ({ slug, description }) => {
  const Sketch = dynamic(() => import(`src/plots/${slug}`), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
        <Description>{description}</Description>
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

  max-width: 15rem;
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  font-size: 1rem;
  text-align: justify;
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
