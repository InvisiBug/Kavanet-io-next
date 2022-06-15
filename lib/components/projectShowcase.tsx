import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { ProjectCardFields } from "lib/types";
import { Card } from "lib/components";
import { mq, px } from "lib/mediaQueries";

const ProjectShowcase: FC<Props> = ({ projects }) => {
  return (
    <>
      <Container>
        <Title>My Projects</Title>
        <CardHolder>
          {projects.map((project: ProjectCardFields, index: number) => {
            return (
              <Fragment key={index}>
                <Card project={project} />
              </Fragment>
            );
          })}
        </CardHolder>
      </Container>
    </>
  );
};
export default ProjectShowcase;

interface Props {
  projects?: ProjectCardFields[];
}

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid green" : "none"};
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding-bottom: 1rem;
  ${mq("small")} {
    /* background-color: purple; */
  }
  ${mq("medium")} {
    /* background-color: red; */
  }
  ${mq("large")} {
    /* max-width: 90vw; */

    /* background-color: orange; */
    max-width: ${px("large")}px;
    /* height: 1000px; */
  }
`;

const CardHolder = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: black;
`;
