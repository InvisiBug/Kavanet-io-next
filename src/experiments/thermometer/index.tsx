import React, { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from "./sketch";

const Experiment = () => {
  const [currentTemp, setCurrentTemp] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTemp((currentTemp) => currentTemp + 0.5), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <ReactP5Wrapper sketch={sketch} currentTemp={currentTemp} target={10} deadzone={2} />;
};

export default Experiment;
