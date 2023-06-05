import React, { FC } from "react";
import styled from "@emotion/styled";
import ProjectCard from "./projectCard";
import Card from "../cardFactory/card";
import { getPageMetaData } from "src/lib/helpers";
import { CardGenerator } from "../cardFactory";

const Projects: FC<Props> = ({ data }) => {
  return (
    <>
      <OuterContainer>
        <InnerContainer>
          {data.map((card: any, index: number) => {
            //? Override the card type to be a clean card
            // if (card?.properties?.cardType?.select?.name) {
            //   card.properties.cardType.select.name = "clean";
            // }
            const cardData = getPageMetaData(card);

            return <CardGenerator cardData={cardData} folder={cardData.folder} key={index} />;
          })}
        </InnerContainer>
      </OuterContainer>
    </>
  );
};

export default Projects;

type Props = {
  data: any;
};

const OuterContainer = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: space-around;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: 1rem 5rem 1rem 5rem;
  padding: 5rem;

  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;