import React, { FC } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { mq, px } from "src/lib/mediaQueries";
import { background } from "src/lib/colours";
import Link from "next/link";
import { links } from "src/lib/constants";

const HamburgerMenu: FC<Props> = ({ isHamburgerMenuOpen }) => {
  console.log("🚀 ~ isHamburgerMenuOpen:", isHamburgerMenuOpen);
  console.log("HEre");
  return (
    <>
      <Container>
        {/* <NavBar> */}

        <Link href={"/"} as={"/"}>
          <Title>
            <div>Kavanet.io</div>
          </Title>
        </Link>

        <Links>
          <Link href={"https://winterflowspace.com/"} as={"https://winterflowspace.com/"}>
            <LinkItem>
              <a target="_blank">Winter Flow Space</a>
            </LinkItem>
          </Link>
          {links.map((link, index) => {
            return (
              <Link href={link.toLocaleLowerCase()} as={`/${link.toLocaleLowerCase()}`} key={index}>
                <LinkItem>
                  <div>{link}</div>
                </LinkItem>
              </Link>
            );
          })}

          <Socials>
            <Github href="https://github.com/InvisiBug" target="_blank">
              <Image src={"https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"} />
            </Github>
            <Insta href="https://www.instagram.com/invisibug/" target="_blank">
              <Image src={"https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"} />
            </Insta>
          </Socials>
        </Links>

        {/* </NavBar> */}
      </Container>
    </>
  );
};

export default HamburgerMenu;

type Props = {
  isHamburgerMenuOpen: boolean;
};

const slide = keyframes`
  from {
    width: translateX(-50vw);
  }

  to {
    transform: translateX(50vw);
  }
`;
const borders = true;

const Container = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  left: -50vw;
  width: 50vw;
  height: 100vh;
  z-index: 10;
  background: rgba(50, 50, 50, 0.5);
  padding-top: 5rem;
  /* padding-left: 1rem; */
  /* margin-left: 1rem; */

  animation: ${slide} 0.5s forwards;

  display: flex;
  flex-direction: column;
`;

const Links = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};

  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const LinkItem = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  min-width: 100px;
  margin-bottom: 0.5rem;

  font-weight: bold;
  text-align: left;
  font-size: large;
  cursor: pointer;
`;

const Github = styled.a`
  border: ${borders ? "1px solid red" : "none"};
  height: 50%;
`;

const Insta = styled.a`
  border: ${borders ? "1px solid red" : "none"};
  height: 50%;
  margin-left: 2rem;
`;

const Image = styled.img`
  height: 100%;
`;

const Socials = styled.div`
  border: ${borders ? "1px solid green" : "none"};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

const Title = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 2rem;

  cursor: pointer;

  display: none;
  ${mq("small")} {
    display: block;
  }
`;

const NavBar = styled.div`
  border: ${borders ? "1px solid limegreen" : "none"};
  display: flex;
  flex-direction: row;
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
