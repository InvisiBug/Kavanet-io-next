import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { background } from "src/lib/colours";
import Link from "next/link";
import { links } from "src/lib/constants";
import { textSize } from "src/lib/textSize";

// const links = ["Experiments", "Plots", "Projects"];

const Header: FC = () => {
  return (
    <>
      {/* <Container> */}
      <NavBar>
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
          <Github href="https://github.com/InvisiBug" target="_blank">
            <Image src={"https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"} />
          </Github>
        </Links>
      </NavBar>
      {/* </Container> */}
    </>
  );
};

export default Header;

const borders = true;

const Container = styled.div`
  border: ${borders ? "1px solid orange" : "none"};

  position: fixed;
  width: 100vw;

  background: ${background};
  display: flex;
  color: white;

  justify-content: center;
  /* align-items: center; */
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */

  height: 5rem;
`;

const NavBar = styled.div`
  border: ${borders ? "1px solid limegreen" : "none"};
  display: flex;
  /* height: 5rem; */
  justify-content: space-between;
  align-items: center;
  margin: auto;

  /* height: 100%; */
  ${mq("small")} {
    /* width: ${px("small")}px; */
  }
  ${mq("large")} {
    width: ${px("large")}px;
    /* margin: 2rem 5rem 0 5rem; */
    /* width: 100%; */
  }
`;

const Links = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  height: 100%;
  display: flex;
  align-items: center;
  /* margin-right: 4rem; */
`;

const LinkItem = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  min-width: 100px;
  margin-right: 2rem;

  font-weight: bold;
  text-align: center;
  font-size: large;
  cursor: pointer;
`;

const Github = styled.a`
  border: ${borders ? "1px solid red" : "none"};
  height: 50%;
`;

const Image = styled.img`
  /* height: 100%; */
  max-height: 3rem;
`;

const Title = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  /* height: 100%; */
  cursor: pointer;
  /* margin-bottom: 0; */
  /* margin-left: 1rem; */

  font-weight: bold;
  /* text-align: center; */
  /* font-size: 2rem; */
  font-size: ${textSize("large")}rem;
  margin-top: 5rem;
  /* margin-bottom: 0; */
  /* padding-top: 0; */
`;
