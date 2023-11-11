import React, { FC } from "react";
import Card from "./card";
import CardClean from "./cleanCard";
import CardLarge from "./cardLarge";
import { NotionResponse } from "src/lib/types";

const CardGenerator: FC<Props> = ({ cardData, folder }) => {
  switch (cardData.cardType) {
    case "small":
      return <Card pageData={cardData} folder={folder} />;

    case "large":
      return <CardLarge pageData={cardData} folder={folder} />;

    case "clean":
      return <CardClean pageData={cardData} folder={folder} />;
  }

  return null;
};

type Props = {
  cardData: NotionResponse;
  folder: string;
};

export default CardGenerator;
