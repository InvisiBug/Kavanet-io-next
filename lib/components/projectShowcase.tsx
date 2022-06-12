import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { ProjectCardFields } from "lib/types";
import { Card } from "lib/components";

const ProjectShowcase: FC<Props> = ({ projects }) => {
  return (
    <>
      <Container>
        {/* <Title>project showcase</Title> */}
        {projects.map((project: ProjectCardFields, index: number) => {
          return (
            <Fragment key={index}>
              <Card project={project} />
            </Fragment>
          );
        })}
      </Container>
    </>
  );
};
export default ProjectShowcase;

interface Props {
  projects?: ProjectCardFields[];
}

const borders = true;

const Container = styled.div`
  border: ${borders ? "1px solid green" : "none"};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: red;
`;
