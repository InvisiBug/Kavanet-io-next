import React from "react";
import { Layout, BackArrow } from "src/lib/components";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const WIPpage = () => {
  const folder = "experiments";
  const name = "repulser";

  const Sketch = dynamic(() => import(`src/content/${folder}/${name}`), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
        <BackArrow />
        <Sketch />
      </Layout>
    </>
  );
};

export default WIPpage;

const borders = false;

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
