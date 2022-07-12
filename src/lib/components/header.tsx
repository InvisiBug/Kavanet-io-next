import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { background } from "src/lib/colours";
import Link from "next/link";

const Header: FC = () => {
  return (
    <>
      <Container>
        <Link href={"/"} as={"/"}>
          <Title>Kavanet.io</Title>
        </Link>

        <Links>
          <Github href="https://github.com/InvisiBug" target="_blank">
            <Image src={"https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"} />
          </Github>
        </Links>
      </Container>
    </>
  );
};

export default Header;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid orange" : "none"};

  position: fixed;
  width: 100vw;

  background: ${background};
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  height: 4rem;
  ${mq("small")} {
    height: 4rem;
  }
`;

const Links = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 4rem;
`;

const Github = styled.a`
  border: ${borders ? "1px solid red" : "none"};
  height: 50%;
`;

const Image = styled.img`
  height: 100%;
`;

const Title = styled.h1`
  border: ${borders ? "1px solid pink" : "none"};
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  /* margin-top: 0; */
  /* margin-bottom: 0; */
  /* padding-top: 0; */
`;
