import React, { FC } from "react";
import styled from "@emotion/styled";
import ImageConverter from "./ImageConverter";

const PoiImageConverter: FC = () => {
  return (
    <>
      <Layout>
        <Container>
          <ImageConverter />
        </Container>
      </Layout>
    </>
  );
};

export default PoiImageConverter;

const Layout = styled.div`
  background-color: #2c2c2c;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Container = styled.div`
  height: 75vh;
  width: 50vw;
  margin: auto;
  border: 1px solid orange;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
