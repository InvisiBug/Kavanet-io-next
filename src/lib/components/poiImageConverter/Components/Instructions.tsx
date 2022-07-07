import React, { FC } from "react";
import styled from "@emotion/styled";

const Instructions: FC = () => {
  return (
    <>
      <Container>
        <Title>Instructions</Title>
        <p>
          Choose a file <br />
        </p>
      </Container>
    </>
  );
};

export default Instructions;

const Container = styled.div`
  height: 20%;
  width: 95%;
  background-color: #b81ca3;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`;

const Title = styled.h1`
  border: 1px solid white;
  /* width: 100%; */
`;
