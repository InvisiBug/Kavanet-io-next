import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { globalStyles } from "../layout";
import NavBar from "./NavBar";

const LandingPage: FC<any> = () => {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <h1>Landing Page</h1> */}
      {/* <NavBar></NavBar> */}
      <NavBar />
      <Container>
        <Image src="https://i.imgur.com/uBzjBrT.jpg" />
      </Container>
    </>
  );
};

export default LandingPage;

const Container = styled.div`
  /* width: 100vw; */
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  /* border: 5px solid red; */
  /* display: flex; */
  /* overflow: hidden; */
  /* vertical-align: bottom; */
  /* position: relative; */
  /* object-fit: contain; */
`;

const Image = styled.img`
  z-index: 1;
  width: 100vw;
  align-self: flex-end;
  /* width: 100%; */
  /* bottom: 0; */
  /* height: 100%; */
  /* object-fit: contain; */
  /* object-position: 0% 0%; */
  /* vertical-align: bottom; */
  /* margin-top: -200px; */
`;
