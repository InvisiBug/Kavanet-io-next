import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";
import { cardBackground } from "src/lib/colours";
import Link from "next/link";
import { getPageMetaData } from "src/lib/helpers";
import { Tag } from "src/lib/components";
import { PageMetaData, NotionResponse } from "src/lib/types";

const Card: FC<Props> = ({ pageData, folder }) => {
  const { title, subTitle, thumbnail, slug, status, tags } = getPageMetaData(pageData);

  return (
    <>
      {status === "Live" || (process.env.NEXT_PUBLIC_LOCAL === "true" && status === "Dev") ? (
        <Link href={`${folder}/[slug]`} as={`${folder}/${slug}`}>
          <Container>
            {thumbnail && <Thumnail src={thumbnail} alt={"Add alt"} />}
            <Content>
              <Title>{title}</Title>
              <Subtitle>{subTitle}</Subtitle>
              <BottomRow>
                <Open>Open</Open>
                <Tags>
                  {tags?.map((tag) => {
                    return (
                      <Fragment key={tag}>
                        <Tag>{tag}</Tag>
                      </Fragment>
                    );
                  })}
                </Tags>
                {status === "Dev" ? <div>dev</div> : null}
              </BottomRow>
            </Content>
          </Container>
        </Link>
      ) : null}
    </>
  );
};

export default Card;

interface Props {
  pageData: NotionResponse;
  folder: string;
}

const borders = false;

const Container = styled.div`
  border: ${borders ? "2px solid pink" : "none"};
  width: 15rem;
  border-radius: 15px;
  margin-top: 1rem;
  color: white;

  background: ${cardBackground};
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Thumnail = styled.img`
  width: 100%;
  border: ${borders ? "1px solid black" : "none"};

  overflow: hidden;
  object-fit: contain;
`;

// Content
const Content = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  margin: 0 1rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border: ${borders ? "1px solid black" : "none"};
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-weight: bold;
`;

const Subtitle = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  /* min-height: 50px; */
  width: 100%;
  font-weight: 400;
  font-size: 0.9rem;
  font-size: 1rem;
`;

// Bottom Row
const BottomRow = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  margin: 1rem 0 1rem 0rem;
`;

const Tags = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Open = styled.button`
  border: ${borders ? "1px solid black" : "none"};

  background-color: #1f2937;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  outline: none;
  width: 5rem;
  height: 2rem;
  color: white;
  text-align: center;
  cursor: pointer;
`;
