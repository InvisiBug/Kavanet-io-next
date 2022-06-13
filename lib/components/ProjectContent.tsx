import React, { FC } from "react";
import { PortableText } from "@portabletext/react";
import styled from "@emotion/styled";
import { urlFor } from "lib/api";
import { mq, px } from "lib/mediaQueries";

const ProjectContent: FC<any> = ({ projectDetails }) => {
  return (
    <>
      <Container>
        <PortableText
          value={projectDetails.content}
          // components={/* optional object of custom components to use */}
        />
      </Container>
    </>
  );
};

export default ProjectContent;

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
