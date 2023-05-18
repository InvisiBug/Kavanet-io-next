import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { globalStyles } from "../layout";
import NavBar from "./NavBar";
import { Header } from "src/lib/components";

const LandingPage: FC<any> = () => {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <h1>Landing Page</h1> */}
      {/* <NavBar></NavBar> */}
      {/* <NavBar /> */}
      <Header background={false} />
      <Container />
    </>
  );
};

export default LandingPage;

const Container = styled.div`
  /* width: 100vw; */
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: -1;
  display: flex;
  justify-content: center;

  animation: image 5s infinite alternate;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  @keyframes image {
    0% {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://i.imgur.com/uBzjBrT.jpg");
    }
    100% {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://i.imgur.com/uBzjBrT.jpg");
    }
  }

  /* background-image: url(https://i.imgur.com/uBzjBrT.jpg); */

  /* border: 5px solid red; */
  /* display: flex; */
  /* overflow: hidden; */
  /* vertical-align: bottom; */
  /* position: relative; */
  /* object-fit: contain; */
`;

const Container2 = styled.div`
  height: 100vh;
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
