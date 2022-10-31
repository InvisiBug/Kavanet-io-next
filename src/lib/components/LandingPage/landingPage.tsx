import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { globalStyles } from "../layout";
import Header from "./NavBar";

const LandingPage: FC<any> = () => {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <h1>Landing Page</h1> */}
      <Container>
        {/* <NavBar></NavBar> */}
        <Header />
        {/* <Image src="https://i.imgur.com/uBzjBrT.jpg" /> */}
      </Container>
    </>
  );
};

export default LandingPage;

const NavBar = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid green;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* border: 5px solid red; */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0% 0%;
  /* height: 100%; */
`;
