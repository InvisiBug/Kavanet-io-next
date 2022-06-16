import React, { FC } from "react";
import styled from "@emotion/styled";

const Info: FC = () => {
  return (
    <>
      <Container>
        <h1>Information</h1>
      </Container>
    </>
  );
};

export default Info;

const Container = styled.div`
  height: 20%;
  width: 95%;
  background-color: #1c64b8;
  display: flex;
  align-items: center;
  justify-content: center;
`;
