import React, { FC } from "react";
import styled from "@emotion/styled";

const Heading2: FC<any> = ({ children }) => {
  return (
    <>
      <H2>{children}</H2>
    </>
  );
};

export default Heading2;

const borders = false;

const H2 = styled.h2`
  border: ${borders ? "1px solid red" : "none"};
  text-align: left;
`;
