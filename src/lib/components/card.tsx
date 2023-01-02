import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Tag } from "src/lib/components";
import { NotionResponse } from "src/lib/types";
import { getPageMetaData } from "src/lib/helpers";
import { cardBackground, devBackground } from "src/lib/colours";

//* Live pages are allways shown
//* Dev pages are only shown when running locally
const Card: FC<Props> = ({ pageData, folder }) => {
  const { title, subTitle, thumbnail, slug, status, tags } = getPageMetaData(pageData);

  return (
    <>
      {status === "Live" || (process.env.NEXT_PUBLIC_LOCAL === "true" && status === "Dev") ? (
        <Link href={`${folder}/[slug]`} as={`${folder}/${slug}`}>
          <Container>
            {thumbnail && <Thumnail src={thumbnail} alt={"Add alt"} />}
            <Content>
              <Title>{title}</Title>
              <Subtitle>{subTitle}</Subtitle>
              <BottomRow>
                <Open>Open</Open>
                <Tags>
                  {tags?.map((tag) => {
                    return (
                      <Fragment key={tag}>
                        <Tag>{tag}</Tag>
                      </Fragment>
                    );
                  })}
                </Tags>
                {status === "Dev" ? <Dev>Work In Progres</Dev> : null}
              </BottomRow>
            </Content>
          </Container>
        </Link>
      ) : null}
    </>
  );
};

export default Card;

interface Props {
  pageData: NotionResponse;
  folder: string;
}

const borders = false;

const Container = styled.div`
  border: ${borders ? "2px solid black" : "none"};
  width: 15rem;
  border-radius: 15px;
  margin-top: 1rem;
  color: white;

  /* min-height: 20rem; */

  background: ${cardBackground};
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  display: flex;
  flex-direction: column;
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
  object-fit: contain;
`;

// Content
const Content = styled.div`
  border: ${borders ? "1px solid orange" : "none"};
  padding: 0 1rem 0 1rem;
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
