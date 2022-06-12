import React, { FC } from "react";
import styled from "@emotion/styled";
import { background } from "lib/colours";

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <SiteContainer>
        <Header>Header</Header>
        <Content>{children}</Content>
        {/* <Footer></Footer> */}
      </SiteContainer>
    </>
  );
};

export default Layout;

const SiteContainer = styled.div`
  border: 1px solid orange;
  width: 100vw;
  height: 100vh;

  background-color: ${background};

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: black;
  height: 4rem;
`;

const Content = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;
