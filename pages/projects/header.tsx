import React, { FC } from "react";
import styled from "@emotion/styled";

import { mq, px } from "lib/mediaQueries";

const ProjectHeader: FC<any> = ({ pageMetaData }) => {
  const { title, subTitle, coverImage } = pageMetaData;

  return (
    <>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      {coverImage && <CoverImage src={coverImage} alt={"Add alt"} />}
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
  width: 90%;
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
