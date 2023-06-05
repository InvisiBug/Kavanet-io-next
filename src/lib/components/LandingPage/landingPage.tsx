import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { globalStyles } from "../layout";
import NavBar from "./NavBar";
import { Header } from "src/lib/components";
import Projects from "./projects";

const LandingPage: FC<any> = ({ data }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Header background={false} />
      <Picture>
        <Image src="https://i.imgur.com/c6LKIfd.jpg"></Image>

        {/* <Image src="https://i.imgur.com/uBzjBrT.jpg"></Image> */}
      </Picture>
      <Projects data={data} />
    </>
  );
};

export default LandingPage;

const Picture = styled.div`
  /* width: 100vw; */
  max-height: 100vh;
  width: 100vw;
  position: relative;
  z-index: -1;
  display: flex;
  /* justify-content: spacebetween; */

  /* animation: image 5s infinite alternate; */

  @keyframes image {
    0% {
      /* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://i.imgur.com/c6LKIfd.jpg"); */
      /* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); */
      transform: translatex(100%);
    }
    100% {
      /* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://i.imgur.com/uBzjBrT.jpg"); */
      transform: translatex(0%);
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

const Pic = styled.div`
  height: 100vh;
  width: 100vw;

  /* background-position: center; */
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
`;

const Image = styled.img`
  z-index: 1;
  width: 100vw;
  /* align-self: flex-end; */
  /* width: 100%; */
  /* bottom: 0; */
  /* height: 100%; */
  /* object-fit: contain; */
  /* object-position: 0% 0%; */
  /* vertical-align: bottom; */
  /* margin-top: -200px; */
`;
