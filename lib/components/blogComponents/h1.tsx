import React, { FC } from "react";

const Heading1: FC<any> = ({ children }) => {
  return (
    <>
      <h1>{children}</h1>
    </>
  );
};

export default Heading1;
