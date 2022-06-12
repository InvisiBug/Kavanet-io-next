import React, { FC } from "react";
import styled from "@emotion/styled";
import { Tag } from "lib/components";
import { urlFor } from "lib/api";
import { cardBackground } from "lib/colours";
import { ProjectCardFields } from "lib/types";

const Card: FC<Props> = ({ project }) => {
  const { Title: title, subTitle, thumnail, tags } = project;

  return (
    <>
      <Conatiner>
        <Thumnail src={urlFor(thumnail).url()} alt={"mushroom"} />
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
      </Conatiner>
    </>
  );
};

export default Card;

interface Props {
  project: ProjectCardFields;
}

const borders = false;

const Conatiner = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  width: 20rem;
  border-radius: 15px;
  margin-top: 1rem;

  background: ${cardBackground};

  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Thumnail = styled.img`
  width: 100%;
  border: ${borders ? "1px solid green" : "none"};

  overflow: hidden;
  object-fit: contain;
`;

// Content
const Content = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  margin: 0 1rem 0 1rem;
`;

const Title = styled.div`
  border: ${borders ? "1px solid black" : "none"};
  font-size: 2rem;
  font-weight: bold;
`;

const Subtitle = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  min-height: 50px;
  width: 100%;
  font-weight: 400;
  font-size: 1.2rem;
`;

// Bottom Row
const BottomRow = styled.div`
  display: flex;
  margin: 1rem 0 1rem 1rem;
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
