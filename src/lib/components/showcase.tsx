import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { capitalizeFirstLetter, getPageMetaData } from "src/lib/helpers";
import { NotionResponse } from "src/lib/types";
import { CardGenerator } from "./cardFactory";

const Showcase: FC<Props> = ({ thingsToShowcase }) => {
  if (!thingsToShowcase) return null;

  return (
    <>
      <Container>
        <Title>{`My ${capitalizeFirstLetter(thingsToShowcase[0].folder)}`}</Title>
        <CardHolder>
          {thingsToShowcase.map((showcaseItem, index: number) => {
            return <CardGenerator cardData={showcaseItem} folder={showcaseItem.folder} key={index} />;
          })}
        </CardHolder>
      </Container>
    </>
  );
};

export default Showcase;

interface Props {
  thingsToShowcase: NotionResponse[];
}

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid green" : "none"};
  /* width: ${px("xmedium")}px; */
  display: flex;
  align-items: center;
  flex-direction: column;

  padding-bottom: 1rem;
  ${mq("small")} {
    max-width: ${px("small")}px;
    /* background-color: purple; */
  }
  ${mq("medium")} {
    /* background-color: red; */
    max-width: ${px("medium")}px;
  }
  ${mq("large")} {
    /* max-width: 90vw; */

    /* background-color: orange; */
    max-width: ${px("xmedium")}px;
    /* height: 1000px; */
  }
`;

const CardHolder = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  /* transform-style: preserve-3d; */
  /* transform: rotate(10deg) skew(-45deg); */
`;

const Title = styled.h1`
  color: white;
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;
