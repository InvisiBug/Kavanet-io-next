import React, { FC, useRef } from "react";
import styled from "@emotion/styled";
import Input from "./Components/Input";
import Preview from "./Components/Preview";
import Info from "./Components/Info";
import Instructions from "./Components/Instructions";

const PoiImageConverter: FC = () => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const calculationImageCanvas = useRef<HTMLCanvasElement>(null);
  const upsidedownImageCanvas = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Instructions />
      <Input />
      <Preview canvasRef={previewCanvasRef} />
      <Info />
      <CalculationImageCanvas ref={calculationImageCanvas} />
      <UpsidedownCanvas ref={upsidedownImageCanvas} />
    </>
  );
};

export default PoiImageConverter;

const CalculationImageCanvas = styled.canvas`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
`;

const UpsidedownCanvas = styled.canvas`
  display: none;
  position: absolute;
  top: 100;
  left: 0;
  background: white;
`;
