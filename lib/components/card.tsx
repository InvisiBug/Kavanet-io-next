import React, { FC } from "react";
import styled from "@emotion/styled";
import { urlFor } from "lib/api";
import { cardBackground } from "lib/colours";
import { CardFields } from "lib/types";
import Link from "next/link";

const Card: FC<Props> = ({ project, folder }) => {
  const { Title: title, subTitle, thumnail, tags, slug } = project;

  return (
    <>
      <Link href={`${folder}/[slug]`} as={`${folder}/${slug}`}>
        <Container>
          {thumnail && <Thumnail src={urlFor(thumnail).url()} alt={"Add alt"} />}
          <Content>
            <Title>{title}</Title>
            <Subtitle>{subTitle}</Subtitle>
            <BottomRow>
              <Open>Open</Open>
              {/* <Tags>
              <Tag>{tags}</Tag>
              <Tag>LEDs</Tag>
            </Tags> */}
            </BottomRow>
          </Content>
        </Container>
      </Link>
    </>
  );
};

export default Card;

interface Props {
  project: CardFields;
  folder: string;
}

const borders = false;

const Container = styled.div`
  border: ${borders ? "2px solid pink" : "none"};
  width: 15rem;
  border-radius: 15px;
  margin-top: 1rem;
  color: white;

  background: ${cardBackground};

  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Thumnail = styled.img`
  width: 100%;
  border: ${borders ? "1px solid black" : "none"};

  overflow: hidden;
  object-fit: contain;
`;

// Content
const Content = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  margin: 0 1rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border: ${borders ? "1px solid black" : "none"};
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-weight: bold;
`;

const Subtitle = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  /* min-height: 50px; */
  width: 100%;
  font-weight: 400;
  font-size: 0.9rem;
  font-size: 1rem;
`;

// Bottom Row
const BottomRow = styled.div`
  border: ${borders ? "1px solid white" : "none"};
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
  border: ${borders ? "1px solid black" : "none"};

  background-color: #1f2937;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  outline: none;
  width: 5rem;
  height: 2rem;
  color: white;
  text-align: center;
  cursor: pointer;
`;
