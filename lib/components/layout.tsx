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
      <Pic src="https://i.imgur.com/XJSPI8o.png"></Pic>
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
  z-index: -50;
`;

const Layer = styled.div`
  z-index: 100;
`;

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
  width: 100vw;
  min-height: 100vh;

  background-color: ${background};

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: black;
  text-align: center;
  border: 1px solid orange;

  height: 4rem;
  ${mq("small")} {
    height: 4rem;
  }
`;

const Title = styled.h1`
  color: white;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  /* flex-wrap: wrap; */
  flex-grow: 1;
  margin-bottom: 0px;
`;
// background-image: url("${"https://i.imgur.com/XJSPI8o.png"}");
//   background-position: center center;
//   background-size: cover;

//   transition: opacity 0.4s linear;

const Footer = styled.div`
  background: purple;
  margin-top: 0px;
  /* height: 4rem; */
`;
