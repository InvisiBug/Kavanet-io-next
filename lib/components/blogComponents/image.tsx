import React, { FC } from "react";
import styled from "@emotion/styled";

import { mq, px } from "lib/mediaQueries";

const Image: FC<any> = ({ src }) => {
  return (
    <>
      <ImageContainer>
        <Img src={src} />
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
