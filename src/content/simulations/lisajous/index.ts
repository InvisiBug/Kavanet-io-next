// https://youtu.be/--6eyLO78CY
import p5 from "p5";
import Curve from "./curve";
import { getCanvasSize, getCanvasContainer } from "../helpers/index.ts";

export const sketch = (p5: p5) => {
  let angle = 0;
  const cellSize = 80;
  let cols: number;
  let rows: number;
  const curves: Curve[][] = [];

  const config = {
    p5,
  };

  p5.setup = () => {
    const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
    p5.createCanvas(canvasWidth, canvasHeight);
    // p5.noStroke();

    // p5.windowResized = () => {
    //   const { width, height } = getCanvasSize(getCanvasContainer(p5));
    //   p5.resizeCanvas(width, height);
    // };

    // p5.createCanvas(800, 800);
    // p5.pixelDensity(2);
    cols = Math.floor(p5.width / cellSize - 1);
    rows = Math.floor(p5.height / cellSize - 1);
    // curves = Vector.make

    for (let j = 0; j < rows; j++) {
      curves[j] = [];
      for (let i = 0; i < cols; i++) {
        curves[j].push(new Curve(config));
      }
    }
  };

  p5.draw = () => {
    const diameter = cellSize - 10;
    const radius = diameter / 2;
    p5.background(50);

    p5.stroke(255);
    p5.noFill();

    //* X points
    for (let i = 0; i < cols; i++) {
      const circlex = cellSize + (i * cellSize + cellSize / 2);
      const circley = cellSize / 2;

      p5.strokeWeight(1);
      p5.stroke(255);
      p5.ellipse(circlex, circley, diameter, diameter);

      const pointx = radius * p5.cos(angle * (i + 1) - p5.PI / 2);
      const pointy = radius * p5.sin(angle * (i + 1) - p5.PI / 2);

      //? Point
      p5.strokeWeight(8);
      p5.point(circlex + pointx, circley + pointy);

      //? Vertical Line
      p5.stroke(255, 50);
      p5.strokeWeight(1);
      p5.line(circlex + pointx, 0, circlex + pointx, p5.height);

      for (let j = 0; j < rows; j++) {
        curves[j][i].setX(circlex + pointx);
      }
    }

    //* Y points
    for (let j = 0; j < rows; j++) {
      const circlex = cellSize / 2;
      const circley = cellSize + (j * cellSize + cellSize / 2);

      p5.strokeWeight(1);
      p5.stroke(255);
      p5.ellipse(circlex, circley, diameter, diameter);

      const pointx = radius * p5.cos(angle * (j + 1) - p5.PI / 2);
      const pointy = radius * p5.sin(angle * (j + 1) - p5.PI / 2);

      //? Point
      p5.strokeWeight(8);
      p5.point(circlex + pointx, circley + pointy);

      //? Vertical Line
      p5.stroke(255, 50);
      p5.strokeWeight(1);
      p5.line(0, circley + pointy, p5.width, circley + pointy);

      for (let i = 0; i < cols; i++) {
        curves[j][i].setY(circley + pointy);
      }
    }

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].addPoint();
        curves[j][i].show();
      }
    }
    angle += 0.01;
    console.log(angle > p5.PI * 2);
    if (angle > p5.PI * 2) {
      p5.noLoop();
      // p5.saveCanvas("test", "png");
    }
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface SimSettings {
  p5: p5;
}
