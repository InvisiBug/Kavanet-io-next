import React, { useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from "./sketch";
// @ts-ignore
import init from "p5.js-svg";
import p5 from "p5";

const Experiment = () => {
  useEffect(() => {
    init(p5);
  }, []);
  return <ReactP5Wrapper sketch={sketch} />;
};

export default Experiment;
