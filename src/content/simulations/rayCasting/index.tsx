import { P5Canvas } from "@p5-wrapper/react";
import { sketch } from "./sketch";

const Experiment = () => {
  return <P5Canvas sketch={sketch} />;
};

export default Experiment;
