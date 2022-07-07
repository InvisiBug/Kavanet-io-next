// https://www.google.com/search?q=react+upload+image+and+read+file&oq=react+upload+image+and+read+file&aqs=chrome..69i57.4442j0j1&sourceid=chrome&ie=UTF-8
// https://blog.logrocket.com/using-filereader-api-preview-images-react/
import React, { FC, useState } from "react";
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
