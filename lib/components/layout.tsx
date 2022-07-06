import React, { FC } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { Global, css } from "@emotion/react";
import { background } from "lib/colours";
import { mq, px } from "lib/mediaQueries";

const Layout: FC<any> = ({ header = true, footer = true, children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <SiteContainer>
        {header && (
          <Header>
            <Title>Kavanet.io</Title>
          </Header>
        )}

        <Content>{children}</Content>
        {footer && <Footer>Footer</Footer>}
      </SiteContainer>
    </>
  );
};

const Pic = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -50;
`;

const Layer = styled.div`
  z-index: 100;
`;

export default Layout;

const borders = false;

const globalStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: black;
    font-family: "Nunito", sans-serif;
    user-select: none;
    overflow: scroll;
  }
`;

const SiteContainer = styled.div`
  width: 100vw;
  min-height: 100vh;

  background-color: ${background};

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  border: ${borders ? "2px solid orange" : "none"};
  background: none;
  display: flex;
  align-items: center;
  /* flex: 1 0 10%; */

  height: 4rem;
  ${mq("small")} {
    height: 4rem;
  }
`;

const Content = styled.div`
  border: ${borders ? "2px solid green" : "none"};
  flex: auto;
  overflow-y: auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  /* flex-wrap: wrap; */
  /* flex-grow: 1; */
  /* margin-bottom: 0px; */
`;

const Footer = styled.div`
  background: purple;
  margin-top: 0px;
  /* height: 4rem; */
`;

const Title = styled.h1`
  color: white;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  margin-left: 2rem;
`;
