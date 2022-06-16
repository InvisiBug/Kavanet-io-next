import React, { FC } from "react";
import { PortableText } from "@portabletext/react";
import styled from "@emotion/styled";
import { urlFor } from "lib/api";
import { mq, px } from "lib/mediaQueries";

const ProjectContent: FC<any> = ({ projectDetails }) => {
  const { content } = projectDetails;
  return (
    <>
      <Container>
        <PortableText value={content} components={myPortableTextComponents} />
      </Container>
    </>
  );
};

const myPortableTextComponents = {
  types: {
    image: ({ value }: ImageType) => {
      const { caption } = value;

      return (
        <>
          <ImageContainer>
            <Image src={urlFor(value).url()} />
            <Caption>{caption}</Caption>
          </ImageContainer>
        </>
      );
    },
  },
};

interface ImageType {
  value: {
    alt: string;
    asset: object;
    caption: string;
  };
}

export default ProjectContent;

const borders = false;

const Container = styled.div`
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

const ImageContainer = styled.div`
  border: ${borders ? "1px solid blue" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  /* width: 90%; */
  border: ${borders ? "1px solid green" : "none"};

  overflow: hidden;
  object-fit: contain;
  border-radius: 1.5rem;

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

const Caption = styled.p`
  margin-top: 0.5rem;
  color: grey;
`;
