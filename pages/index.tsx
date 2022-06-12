import React, { FC } from "react";

import { Layout, Card } from "lib/components";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import Head from "next/head";

const IndexPage: FC<any> = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <Title>hello</Title>
        <Card />
      </Layout>
    </>
  );
};

export default IndexPage;

const Title = styled.div`
  color: green;
`;

const globalStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: yellow;
    /* font-family: Arial, Helvetica, sans-serif; */
    /* font-family: Nunito; */
    font-family: 'Nunito', sans-serif;
    user-select: none;
    /* font-weight: normal; */
    /* font-size: 1.5rem; */
    scroll;
  }
`;
