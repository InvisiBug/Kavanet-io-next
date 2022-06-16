import React from "react";
import { Layout, PoiImageConverter } from "lib/components";
import styled from "@emotion/styled";

const ImageConverter = () => {
  return (
    <>
      <Layout>
        <Container>
          <PoiImageConverter />
        </Container>
      </Layout>
    </>
  );
};

export default ImageConverter;

const Container = styled.div`
  /* height: 75vh; */

  width: 50vw;
  margin: auto;
  border: 1px solid orange;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
