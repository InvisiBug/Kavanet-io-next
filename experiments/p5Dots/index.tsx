import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { sketch } from "./sketch";
import styled from "@emotion/styled";

const P5js: React.FC = () => {
  let ref = useRef<HTMLInputElement | null>(null);
  let canvas = null;

  useEffect(() => {
    if (ref && ref.current) {
      canvas = new p5(sketch, ref.current);
    }
    return () => {
      console.log("returned");
      canvas = null;
      ref = null;
    };
  }, []);

  if (!ref) {
    return <></>;
  }

  return <Container ref={ref}></Container>;
};

export default P5js;

const Container = styled.div`
  margin-bottom: 0px;
`;
