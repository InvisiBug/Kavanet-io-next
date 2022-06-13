import React, { FC } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { Global, css } from "@emotion/react";
import { background } from "lib/colours";
import { mq, px } from "lib/mediaQueries";

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <SiteContainer>
        <Header>Header</Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </SiteContainer>
    </>
  );
};

export default Layout;

const globalStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: black;
    font-family: 'Nunito', sans-serif;
    user-select: none;
    scroll;
  }
`;

const SiteContainer = styled.div`
  border: 1px solid orange;
  width: 100vw;
  min-height: 100vh;

  background-color: ${background};

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: black;
  height: 4rem;
  ${mq("small")} {
    height: 4rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  flex-wrap: wrap;
  flex-grow: 1;
`;

const Footer = styled.div`
  background: black;
  height: 4rem;
`;
