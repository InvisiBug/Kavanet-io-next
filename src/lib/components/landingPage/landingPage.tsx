import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { globalStyles } from "../layout";
import { Header, Carousel, Item } from "src/lib/components";
import Projects from "./projects";
import one from "./pics/1.jpg";
import two from "./pics/2.jpg";
import three from "./pics/3.jpg";

const LandingPage: FC<any> = ({ dbItems }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Header background={false} />
      <Carousel includeControls={false} pausable={false} height={"100vh"} slideTimer={5000}>
        <Item width={"100vw"}>
          <ImageContainer>
            <Image src={one.src} height="900px" />
          </ImageContainer>
        </Item>
        <Item width={"100vw"}>
          <ImageContainer>
            <Image src={two.src} height="600px" />
          </ImageContainer>
        </Item>
        <Item width={"100vw"}>
          <ImageContainer>
            <Image src={three.src} height="600px" />
          </ImageContainer>
        </Item>
      </Carousel>
      {/* <Picture> */}
      {/* <Image src="https://i.imgur.com/c6LKIfd.jpg"></Image> */}
      {/* <Image src={Pic.src}></Image> */}
      {/* <Image src={Pic.src}></Image> */}
      {/* <Image src="https://lh3.googleusercontent.com/pw/AJFCJaXF6u37enhP_zY_VUBoWxp8K5mhPYqcv2FxNYjqcpUGdbP2_O9wLGiD5b7M7Uzm6K6rvZMbRVi-h9gVKYavyx3HvnGm5CHJUHORlTBv9_j9E4v7Q9I-qMFBMEXfJO1MJnAiE84VJ2SvfnMxydYQq3ytfA=w2952-h1968-s-no?authuser=0"></Image> */}

      {/* <Image src="https://i.imgur.com/uBzjBrT.jpg"></Image> */}
      {/* </Picture> */}
      <Projects dbItems={dbItems} />
    </>
  );
};

export default LandingPage;

const borders = false;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Picture = styled.div`
  border: ${borders ? "2px solid green" : "none"};
  /* width: 100vw; */
  max-height: 100vh;
  width: 100vw;
  position: relative;
  z-index: -1;
  object-fit: contain;
  display: flex;
  /* justify-content: spacebetween; */

  animation: image 5s infinite alternate;

  @keyframes image {
    0% {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://i.imgur.com/c6LKIfd.jpg");
      /* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); */
      /* transform: translatex(100%); */
    }
    100% {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://i.imgur.com/uBzjBrT.jpg");
      /* transform: translatex(0%); */
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

// const Pic = styled.div`
//   height: 100vh;
//   width: 100vw;

//   /* background-position: center; */
//   /* background-repeat: no-repeat; */
//   /* background-size: cover; */
// `;

// const Image = styled.img`
//   z-index: 1;
//   width: 100vw;
//   /* align-self: flex-end; */
//   width: 100%;
//   bottom: 0;
//   /* height: 100%; */
//   /* object-fit: contain; */
//   /* object-position: 0% 0%; */
//   /* vertical-align: bottom; */
//   /* margin-top: -200px; */
// `;

export const Image = styled.img`
  flex-shrink: 0;
  min-height: 100%;
  min-width: 100vw;
`;
