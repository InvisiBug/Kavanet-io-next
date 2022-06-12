import React, { FC } from "react";
import styled from "@emotion/styled";
import mushroom from "lib/components/mushroom.jpg";

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
            <Tags>tags</Tags>
          </BottomRow>
        </Content>
      </Conatiner>
    </>
  );
};

export default Card;

const borders = true;

const Conatiner = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  margin-left: 100px;
  margin-top: 200px;

  height: 25rem;
  width: 20rem;

  /* color: black; */
  display: flex;
  flex-direction: column;
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
`;

// Content
const Content = styled.div`
  border: ${borders ? "1px solid white" : "none"};
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
  text-align: right;
`;

const Open = styled.button`
  border: ${borders ? "1px solid black" : "none"};
`;
