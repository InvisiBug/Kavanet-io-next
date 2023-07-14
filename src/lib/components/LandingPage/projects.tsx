import React, { FC } from "react";
import styled from "@emotion/styled";
import { getPageMetaData } from "src/lib/helpers";
import { CardGenerator } from "../cardFactory";

const Projects: FC<Props> = ({ data }) => {
  return (
    <>
      <OuterContainer>
        <InnerContainer>
          {data.map((card: any, index: number) => {
            const cardData = getPageMetaData(card);

            if (cardData.folder === undefined) return null;

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

const borders = false;

const OuterContainer = styled.div`
  border: ${borders ? "1px solid orange" : "none"};
  width: 100vw;
  min-height: 100vh;

  /* display: flex; */
  /* justify-content: space-around; */
`;

const InnerContainer = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  padding: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  /* width: 600px; */
  /* display: grid;
  align-items: center;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 15%); */
`;
