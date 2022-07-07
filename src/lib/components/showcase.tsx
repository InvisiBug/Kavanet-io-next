import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { CardFields } from "src/lib/types";
import { Card } from "src/lib/components";
import { mq, px } from "src/lib/mediaQueries";
import { capitalizeFirstLetter } from "src/lib/helpers";

const Showcase: FC<Props> = ({ thingsToShowcase, folder }) => {
  if (!thingsToShowcase) return <></>;

  return (
    <>
      <Container>
        <Title>{`My ${capitalizeFirstLetter(folder)}`}</Title>
        <CardHolder>
          {thingsToShowcase.map((item: CardFields, index: number) => {
            return (
              <Fragment key={index}>
                <Card item={item} folder={folder} />
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
  thingsToShowcase: CardFields[];
  folder: string;
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
