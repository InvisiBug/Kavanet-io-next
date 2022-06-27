import React, { FC } from "react";
import styled from "@emotion/styled";

const Heading1: FC<any> = ({ children }) => {
  return (
    <>
      <H1>{children}</H1>
    </>
  );
};

export default Heading1;

const borders = true;

const H1 = styled.h1`
  border: ${borders ? "1px solid red" : "none"};
  text-align: center;
`;
