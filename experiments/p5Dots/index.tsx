import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { sketch } from "./sketch";

const P5js: React.FC = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref && ref.current) {
      new p5(sketch, ref.current);
    }
  }, []);

  if (!ref) {
    return <></>;
  }

  return <div ref={ref}></div>;
};

export default P5js;
