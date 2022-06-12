import React, { FC } from "react";
import styled from "@emotion/styled";
import { background } from "lib/colours";

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <SiteContainer>{children}</SiteContainer>
    </>
  );
};

export default Layout;

const SiteContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${background};
`;
