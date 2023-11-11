import React, { FC, Fragment, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Tag } from "src/lib/components";
import { PageMetaData } from "src/lib/types";
import { cardBackground, devBackground } from "src/lib/colours";

//* Live pages are allways shown
//* Dev pages are only shown when running locally
const CardClean: FC<Props> = ({ pageData, folder }) => {
  const { title, subTitle, thumbnail, slug, status, categories } = pageData;

  const [isShown, setIsShown] = useState(false);

  if (status === "Hidden") {
    return null;
  }

  const local = process.env.NEXT_PUBLIC_LOCAL;

  if (!local && status !== "Live") {
    return null;
  }

  return (
    <OuterContainer>
      <Link href={`${folder}/[slug]`} as={`${folder}/${slug}`}>
        <Container onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
          {thumbnail && <Thumnail src={thumbnail} alt={"Add alt"} />}
          {isShown && (
            <Content>
              <Title>{title}</Title>
              <Subtitle>{subTitle}</Subtitle>

              <BottomRow>
                <Tags>
                  {categories?.map((category) => {
                    return (
                      <Fragment key={category}>
                        <Tag>{category}</Tag>
                      </Fragment>
                    );
                  })}
                </Tags>

                {status === "Dev" ? <Dev>Work In Progres</Dev> : null}
              </BottomRow>
            </Content>
          )}
        </Container>
      </Link>
    </OuterContainer>
  );
};

export default CardClean;

interface Props {
  pageData: PageMetaData;
  folder: string;
}

const borders = false;

const OuterContainer = styled.div`
  border: ${borders ? "2px solid red" : "none"};
`;

const Container = styled.div`
  border: ${borders ? "2px solid black" : "none"};
  width: 15rem;
  /* height: 15rem; */
  border-radius: 15px;
  margin-top: 1rem;
  color: white;

  /* min-height: 20rem; */

  background: ${cardBackground};
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  /* display: flex; */
  /* flex-direction: column; */

  display: grid;

  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* From https://css.glass */
  /* background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.2px);
  -webkit-backdrop-filter: blur(9.2px);
  border: 1px solid rgba(255, 255, 255, 0.58); */
`;

const Thumnail = styled.img`
  width: 100%;
  border: ${borders ? "1px solid white" : "none"};

  overflow: hidden;
  object-fit: scale-down;
  grid-area: 1/1;
`;

// Content
const Content = styled.div`
  background: linear-gradient(0deg, #0000003c 10%, #2b2c2bc9 100%);
  z-index: 10;
  grid-area: 1/1;

  animation: slide-in 500ms;

  @keyframes slide-in {
    from {
      transform: translatey(+100%);
    }
    to {
      transform: translatey(0%);
    }
  }

  /* width: 100%; */

  /* top: 0;
  left: 0;
  width: 15rem;
height: 15rem; */
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  border: ${borders ? "1px solid orange" : "none"};
  /* padding: 0 1rem 0 1rem; */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-weight: bold;
`;

const Subtitle = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  /* min-height: 50px; */
  width: 100%;
  font-weight: 400;
  font-size: 0.9rem;
  font-size: 1rem;
  flex-grow: 1;
`;

// Bottom Row
const BottomRow = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  margin: 1rem 0 1rem 0rem;
`;

const Tags = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Open = styled.button`
  border: ${borders ? "1px solid yellow" : "1px solid transparent"};

  background-color: #1f2937;
  border-radius: 0.5rem;

  outline: none;
  width: 5rem;
  height: 2rem;
  color: white;
  text-align: center;
  cursor: pointer;
`;

const Dev = styled.div`
  background: ${devBackground};
  border-radius: 0.5rem;
  font-size: 0.75rem;
  display: grid;
  padding: 0 1rem 0 1rem;
  align-content: center;
  color: white;
`;
