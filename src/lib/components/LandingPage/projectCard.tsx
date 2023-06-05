import React, { FC } from "react";
import styled from "@emotion/styled";

const ProjectCard: FC<Props> = ({ cardData }) => {
  return (
    <>
      <Container>{cardData}</Container>
    </>
  );
};

export default ProjectCard;

type Props = {
  cardData: string;
};

const Container = styled.div`
  border: 1px solid red;
  width: 5rem;
  height: 5rem;
`;
