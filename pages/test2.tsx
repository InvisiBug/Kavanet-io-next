// @ts-ignore
import React, { useEffect, useLayoutEffect, useRef } from "react";
import P5js from "./test";

const Test: React.FC = () => {
  return (
    <>
      <div></div>
      {typeof window !== "undefined" && <P5js />}
    </>
  );
};

export default Test;
