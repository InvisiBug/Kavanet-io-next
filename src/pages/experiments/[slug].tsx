import React, { FC } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { Layout, BackArrow } from "src/lib/components";
import { getServerSideProps } from "./query";

const Experiments: FC<any> = ({ slug, description }) => {
  const Sketch = dynamic(() => import(`src/experiments/${slug}`), { ssr: false });

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
export { getServerSideProps };

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
