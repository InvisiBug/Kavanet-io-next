import React, { FC } from "react";
import Card from "./card";
import CardClean from "./cleanCard";
import CardLarge from "./cardLarge";
import { NotionResponse } from "src/lib/types";

import { getPageMetaData } from "src/lib/helpers";

const CardGenerator: FC<Props> = ({ cardData, folder }) => {
  const pageData = getPageMetaData(cardData);

  switch (pageData.cardType) {
    case "small":
      return <Card pageData={pageData} folder={folder} />;

    case "large":
      return <CardLarge pageData={pageData} folder={folder} />;

    case "clean":
      return <CardClean pageData={pageData} folder={folder} />;
  }

  return null;
};

type Props = {
  cardData: NotionResponse;
  folder: string;
};

export default CardGenerator;
