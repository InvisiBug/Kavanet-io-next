import React, { FC, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const Preview: FC<Props> = ({ canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("Could not get canvas ref");

    var ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create context");

    canvas.width = 100;
    canvas.height = 100;

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  return (
    <>
      <PreviewContainer>
        <Title>Image Preview</Title>
        <CanvasContainer>
          <Canvas ref={canvasRef} />
        </CanvasContainer>
      </PreviewContainer>
    </>
  );
};
export default Preview;

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const PreviewContainer = styled.div`
  height: 45%;
  width: 45%;
  background-color: #887508;

  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;

const Title = styled.h1`
  border: 1px solid red;
  /* flex-grow: 1; */
  margin: 2rem 0 0 0;
  padding: 0;
`;

const CanvasContainer = styled.div`
  width: 100%;
  border: 1px solid green;
  /* margin: auto; */
  flex-grow: 1;

  display: grid;
  /* align-items: center; */
  /* margin: auto; */
`;

const Canvas = styled.canvas`
  /* width: 100%; */
  border: 1px solid yellow;
  place-self: center;
  /* margin-top: 2rem; */

  /* flex-grow: 1; */
`;
