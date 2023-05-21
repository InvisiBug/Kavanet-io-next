import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { Card, CardLarge } from "src/lib/components";
import { mq, px } from "src/lib/mediaQueries";
import { capitalizeFirstLetter, getPageMetaData } from "src/lib/helpers";
import { NotionResponse } from "src/lib/types";

const Showcase: FC<Props> = ({ thingsToShowcase, folder }) => {
  if (!thingsToShowcase) return null;

  return (
    <>
      <Container>
        <Title>{`My ${capitalizeFirstLetter(folder)}`}</Title>
        <CardHolder>
          {thingsToShowcase.map((showcaseItem: NotionResponse, index: number) => {
            const pageData = getPageMetaData(showcaseItem);

            switch (pageData.cardType) {
              case "small":
                return (
                  <Fragment key={index}>
                    <Card pageData={pageData} folder={folder} />
                  </Fragment>
                );

              case "large":
                return <Fragment key={index}>{<CardLarge pageData={pageData} folder={folder} />}</Fragment>;
            }
          })}
        </CardHolder>
      </Container>
    </>
  );
};
export default Showcase;

interface Props {
  thingsToShowcase: NotionResponse[];
  folder: string;
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
