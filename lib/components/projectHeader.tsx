import React, { FC } from "react";
import styled from "@emotion/styled";
import { urlFor } from "lib/api";
import { mq, px } from "lib/mediaQueries";

const ProjectHeader: FC<any> = ({ projectDetails }) => {
  const { Title: title, subTitle, coverImage } = projectDetails;

  console.log(projectDetails);
  return (
    <>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      {coverImage && <CoverImage src={urlFor(coverImage).url()} alt={"Add alt"} />}
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
    background-color: purple;
  }
  ${mq("medium")} {
    max-width: ${px("medium")}px;
  }
  ${mq("large")} {
    /* max-width: 90vw; */

    max-width: ${px("large")}px;
    /* height: 1000px; */
  }
`;
