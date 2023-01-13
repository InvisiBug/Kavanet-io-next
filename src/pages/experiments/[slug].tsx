import React, { FC, useState } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { Layout, BackArrow } from "src/lib/components";
import { getDatabase, experimentsDbId } from "src/lib/api";

const Experiments: FC<any> = ({ slug, description }) => {
  const [showDetails, setShowDetails] = useState(true);
  const Sketch = dynamic(() => import(`src/content/experiments/${slug}`), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
        {showDetails ? (
          description ? (
            <Description>
              <Close
                onClick={() => {
                  setShowDetails(false);
                }}
              />
              {description}
            </Description>
          ) : null
        ) : null}
        <BackArrow />
        <Sketch />
      </Layout>
    </>
  );
};

export default Experiments;

const borders = false;

const Close = styled.div`
  width: 10px;
  height: 10px;
  margin-left: auto;
  margin-right: 0;
  background: white;
  display: show;
`;

const Description = styled.div`
  border: ${borders ? "2px solid red" : "none"};
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
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
