import React, { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { background } from "src/lib/colours";
import { links } from "src/lib/constants";
import { HamburgerButton } from "src/lib/components";
import { useDeviceDimensions } from "src/lib/hooks";

const Header: FC<Props> = ({ background = true, setIsHamburgerMenuOpen, isHamburgerMenuOpen }) => {
  const { width, height } = useDeviceDimensions();
  console.log("🚀 ~ width:", width, "height:", height);

  console.log(px("small"));

  const isMobile = width < px("medium");
  console.log("🚀 ~ isMobile:", isMobile);

  return (
    <>
      <Container showBackground={background} isMobile={isMobile}>
        {isMobile ? (
          <HamburgerButton setIsHamburgerMenuOpen={setIsHamburgerMenuOpen} isHamburgerMenuOpen={isHamburgerMenuOpen} />
        ) : (
          <NavBar>
            <>
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
                <Github href="https://github.com/InvisiBug" target="_blank">
                  <Image src={"https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"} />
                </Github>
                <Insta href="https://www.instagram.com/invisibug/" target="_blank">
                  <Image src={"https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"} />
                </Insta>
              </Links>
            </>
          </NavBar>
        )}
      </Container>
    </>
  );
};

export default Header;

type Props = {
  background?: boolean;
  setIsHamburgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHamburgerMenuOpen: boolean;
};

const borders = false;

const Container = styled.div<NavbarProps>`
  border: ${borders ? "1px solid orange" : "none"};

  position: fixed;
  width: 100vw;
  height: 5rem;
  margin-top: 0px;

  /* background: ${background}; */

  background: ${({ showBackground }) => (showBackground ? background : null)};
  display: flex;
  color: white;

  /* justify-content: center; */
  justify-content: ${({ isMobile }) => (isMobile ? "left" : "center")};
  padding-left: ${({ isMobile }) => (isMobile ? "1rem" : "none")};
  border-bottom: ${({ showBackground }) => (showBackground ? "1px solid rgba(255, 255, 255, 0.1)" : null)};

  z-index: 100;
`;

type NavbarProps = {
  showBackground: boolean;
  isMobile: boolean;
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

const Insta = styled.a`
  border: ${borders ? "1px solid red" : "none"};
  height: 50%;
  margin-left: 2rem;
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
