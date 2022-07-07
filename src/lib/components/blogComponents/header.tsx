import React, { FC } from "react";
import styled from "@emotion/styled";

import { mq, px } from "src/lib/mediaQueries";

const ProjectHeader: FC<any> = ({ pageMetaData }) => {
  const { title, subTitle, coverImage, description } = pageMetaData;

  return (
    <>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      {coverImage && <CoverImage src={coverImage} alt={"Add alt"} />}
      <p>{description}</p>
      <br />
    </>
  );
};

export default ProjectHeader;

const borders = false;

const Title = styled.h1`
  color: black;
`;

const SubTitle = styled.h2`
  color: black;
`;

const CoverImage = styled.img`
  max-height: 50rem;
  border: ${borders ? "1px solid green" : "none"};

  overflow: hidden;
  object-fit: contain;

  ${mq("small")} {
    max-width: ${px("small")}px;
  }
  ${mq("medium")} {
    max-width: ${px("medium")}px;
  }
  ${mq("large")} {
    max-width: ${px("large")}px;
  }
`;
