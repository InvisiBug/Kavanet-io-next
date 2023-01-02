import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { background } from "src/lib/colours";
import { mq, px } from "src/lib/mediaQueries";
import { Header } from "src/lib/components";

const Layout: FC<any> = ({ header = true, footer = true, children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <SiteContainer>
        {header && <Header />}
        <Content header={header}>{children}</Content>
        {footer && <Footer>Footer</Footer>}
      </SiteContainer>
    </>
  );
};

const borders = false;

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

export const globalStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: white;
    font-family: "Nunito", sans-serif;
    user-select: none;
    /* overflow: none; */
    /* overscroll-behavior: none; */
    background-color: ${background};
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SiteContainer = styled.div`
  width: 100vw;
  min-height: 100vh;

  /* background-color: ${background}; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  border: ${borders ? "2px solid green" : "none"};
  ${mq("large")} {
    width: ${px("large")}px;
  }

  /* flex: auto; */
  /* overflow-y: auto; */

  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${(props: { header: boolean }) => (props.header ? "6rem" : "0")};

  /* flex-wrap: wrap; */
  /* flex-grow: 1; */
  /* margin-bottom: 0px; */
`;

const Footer = styled.div`
  background: purple;
  margin-top: 0px;
  /* height: 4rem; */
`;
