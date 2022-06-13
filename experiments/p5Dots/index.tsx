import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from "experiments/p5Dots/sketch";

const App = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};

export default App;
