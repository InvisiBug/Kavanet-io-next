import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { background } from "src/lib/colours";
import Link from "next/link";
import { links } from "src/lib/constants";
import { textSize } from "src/lib/textSize";

const Header: FC = () => {
  return (
    <>
      <NavBar>
        <Container>
          <Link href={"/"} as={"/"}>
            <Title>Kavanet.io</Title>
          </Link>

          <Links>
            {links.map((link, index) => {
              return (
                <Link href={link.toLocaleLowerCase()} as={`/${link.toLocaleLowerCase()}`} key={index}>
                  <LinkItem>{link}</LinkItem>
                </Link>
              );
            })}
          </Links>
          <Github href="https://github.com/InvisiBug" target="_blank">
            <Image src={"https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"} />
          </Github>
        </Container>
      </NavBar>
    </>
  );
};

export default Header;

const borders = false;

// const NavBar = styled.div`
//   border: ${borders ? "1px solid orange" : "none"};

//   position: fixed;
//   width: 100vw;

//   background: ${background};
//   display: flex;
//   color: white;

//   justify-content: center;
//   /* align-items: center; */
//   /* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */

//   height: 5rem;
// `;

const NavBar = styled.div`
  position: absolute;
  width: 100vw;
  z-index: 5;
`;

const Container = styled.div`
  /* position: absolute; */
  border: ${borders ? "1px solid limegreen" : "none"};
  display: flex;
  /* height: 5rem; */

  align-items: center;

  margin: auto;
  padding-top: 2rem;
  /* padding-bottom: 3rem; */

  /* display: grid; */
  /* grid-template-columns: repeat(4, 1fr); */
  /* grid-template-rows: 1fr; */
  /* grid-column-gap: 40px; */
  /* grid-row-gap: 0px; */
  /* flex-direction: column; */
  justify-content: space-between;

  /* height: 100%; */
  ${mq("small")} {
    /* width: ${px("small")}px; */
  }
  ${mq("xlarge")} {
    width: ${px("xlarge")}px;
    /* margin: 2rem 5rem 0 5rem; */
    /* width: 100%; */
  }
`;

const Title = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  font-size: ${textSize("xl")}rem;
  width: 15%;

  cursor: pointer;
`;

const LinksContainer = styled.div`
  border: ${borders ? "1px solid white" : "none"};
`;

const Links = styled.div`
  border: ${borders ? "1px solid orange" : "none"};

  display: flex;
  position: relative;

  justify-content: space-between;

  & > *:last-of-type {
    margin-right: 0;
  }
`;

const LinkItem = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  font-size: ${textSize("large")}rem;
  color: #acacac;

  cursor: pointer;
  margin-right: 2rem;
`;

const Github = styled.a`
  border: ${borders ? "1px solid red" : "none"};
  width: 15%;
  display: flex;
  justify-content: flex-end;
  cursor: default;

  /* margin-left: auto; */
`;

const Image = styled.img`
  /* height: 100%; */
  max-height: 3rem;
  cursor: pointer;
`;
