import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";

const Paragraph: FC<any> = ({ children }) => {
  return (
    <>
      <Container>
        {children.map((child: any) => {
          return <div key={child?.text.content}>{child?.text.content}</div>;
        })}
      </Container>
    </>
  );
};

export default Paragraph;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid blue" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;
