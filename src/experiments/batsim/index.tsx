import React, { useEffect, useRef, FC } from "react";
import Sim from "./sim";

const Batsim: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Sim(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default Batsim;
