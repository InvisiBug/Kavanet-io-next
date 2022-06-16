import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { CardFields } from "lib/types";
import { Card } from "lib/components";
import { mq, px } from "lib/mediaQueries";
import { capitalizeFirstLetter } from "lib/helpers";

const Showcase: FC<Props> = ({ projects, name }) => {
  return (
    <>
      <Container>
        <Title>{`My ${capitalizeFirstLetter(name)}`}</Title>
        <CardHolder>
          {projects.map((project: CardFields, index: number) => {
            return (
              <Fragment key={index}>
                <Card project={project} folder={name} />
              </Fragment>
            );
          })}
        </CardHolder>
      </Container>
    </>
  );
};
export default Showcase;

interface Props {
  projects: CardFields[];
  name: string;
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
  color: white;
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;
