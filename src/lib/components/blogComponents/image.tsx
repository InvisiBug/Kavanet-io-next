import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { getImageBlockUrl } from "src/lib/helpers";

const Image: FC<any> = ({ data }) => {
  return (
    <>
      <ImageContainer>
        <Img src={getImageBlockUrl(data)} />
      </ImageContainer>
    </>
  );
};

export default Image;

const borders = false;

const ImageContainer = styled.div`
  border: ${borders ? "1px solid blue" : "none"};
  display: flex;
  justify-content: stretch;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  /* width: 90%; */
  border: ${borders ? "1px solid green" : "none"};

  overflow: hidden;
  object-fit: contain;
  border-radius: 1.5rem;
  margin-bottom: 1rem;

  ${mq("small")} {
    max-width: ${px("small")}px;
  }
  ${mq("medium")} {
    max-height: 15rem;
  }
  ${mq("large")} {
    max-height: 15rem;
  }
`;
