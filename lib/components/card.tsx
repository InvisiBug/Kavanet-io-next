import React, { FC } from "react";
import styled from "@emotion/styled";
import mushroom from "lib/components/mushroom.jpg";
import { cardBackground } from "lib/colours";
import { Tag } from "lib/components";

const Card: FC<any> = () => {
  return (
    <>
      <Conatiner>
        {/* <Picture> */}
        <Icon src={mushroom.src} alt={"mushroom"} />
        {/* </Picture> */}
        <Content>
          <Title>Glow Shroom</Title>
          <Subtitle>My 3D printed glowing mushroom that runs of a drill battery</Subtitle>
          <BottomRow>
            <Open>Open</Open>
            <Tags>
              <Tag>Glowy</Tag>
              <Tag>LEDs</Tag>
            </Tags>
          </BottomRow>
        </Content>
      </Conatiner>
    </>
  );
};

export default Card;

const borders = false;

const Conatiner = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  margin-left: 100px;
  margin-top: 200px;

  width: 20rem;
  border-radius: 15px;

  background: ${cardBackground};

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Picture = styled.div`
  border: ${borders ? "1px solid green" : "none"};
  height: 100px;
  width: 100%;
  flex-grow: 1;
`;

const Icon = styled.img`
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

// const Open = styled.button`
//   border: ${borders ? "1px solid black" : "none"};
// `;

const Open = styled.button`
  border: ${borders ? "1px solid black" : "none"};
  /* margin: 1rem 0 1rem 1.25rem; */
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
