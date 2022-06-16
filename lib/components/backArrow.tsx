import React, { FC } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const BackArrow: FC = () => {
  const router = useRouter();

  return (
    <>
      <Arrow onClick={() => router.back()}>&#171;</Arrow>
    </>
  );
};

export default BackArrow;

const Arrow = styled.div`
  position: absolute;
  /* border: 1px solid green; */

  top: 0rem;
  left: 2rem;
  /* height: 100px; */
  /* width: 100px; */
  /* font-size: 900; */
  font-size: 6rem;
  color: white;
  cursor: pointer;
`;
