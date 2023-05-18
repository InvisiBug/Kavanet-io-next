import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { background } from "src/lib/colours";
import Link from "next/link";
import { links } from "src/lib/constants";

const Header: FC<Props> = ({ background = true }) => {
  return (
    <>
      <Container showBackground={background}>
        <NavBar>
          <Link href={"/"} as={"/"}>
            <Title>
              <div>Kavanet.io</div>
            </Title>
          </Link>

          <Links>
            {links.map((link, index) => {
              return (
                <Link href={link.toLocaleLowerCase()} as={`/${link.toLocaleLowerCase()}`} key={index}>
                  <LinkItem>
                    <div>{link}</div>
                  </LinkItem>
                </Link>
              );
            })}
            <Github href="https://github.com/InvisiBug" target="_blank">
              <Image src={"https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"} />
            </Github>
          </Links>
        </NavBar>
      </Container>
    </>
  );
};

export default Header;

type Props = {
  background?: boolean;
};

const borders = false;

const Container = styled.div<NavbarProps>`
  border: ${borders ? "1px solid orange" : "none"};

  position: fixed;
  width: 100vw;

  /* background: ${background}; */

  background: ${({ showBackground }) => (showBackground ? background : null)};
  display: flex;
  color: white;

  justify-content: center;
  border-bottom: ${({ showBackground }) => (showBackground ? "1px solid rgba(255, 255, 255, 0.1)" : null)};

  height: 5rem;
`;

type NavbarProps = {
  showBackground: boolean;
};

const NavBar = styled.div`
  border: ${borders ? "1px solid limegreen" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  ${mq("medium")} {
    width: ${px("medium")}px;
  }
  ${mq("large")} {
    width: ${px("large")}px;
  }
`;

const Links = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  height: 100%;
  display: flex;
  align-items: center;
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
  height: 100%;
`;

const Title = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  font-weight: bold;
  font-size: 2rem;

  cursor: pointer;

  display: none;
  ${mq("small")} {
    display: block;
  }
`;
