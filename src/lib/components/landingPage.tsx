import React, { FC } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { globalStyles } from "./layout";

const LandingPage: FC<any> = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <h1>Landing Page</h1>
    </>
  );
};

export default LandingPage;
