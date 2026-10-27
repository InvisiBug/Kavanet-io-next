import p5 from "p5";
import { getCanvasContainer, getCanvasSize, mouseInCanvas } from "../helpers";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
  const numRows = 20;
  const squareSize = canvasHeight / numRows;
  const numCols = Math.floor(canvasWidth / squareSize);

  const xstart = canvasWidth / 2 - (squareSize * numCols) / 2;
  const ystart = 0;

  // const colours = ["#302F2D", "#464543", "#274666", "#24829F", "#86A95B"];
  const colours = ["#59BA92", "#0E3556", "#1F5545", "#8284A4", "#F25E40"];

  const vertex: number[][] = [];

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);

    // p5.createCanvas(p5.windowWidth, canvasHeight);
    p5.noLoop();
  };

  p5.draw = () => {
    drawBackground(18);

    for (let x = 0; x < numCols; x++) {
      for (let y = 0; y < numRows; y++) {
        p5.noStroke();
        p5.fill(colours[0]);

        p5.fill(p5.random(colours));
        chooseWaitedColour(xstart + x * squareSize, ystart + y * squareSize);

        // Top
        p5.triangle(xstart + x * squareSize, ystart + y * squareSize, xstart + (x + 1) * squareSize, ystart + y * squareSize, xstart + x * squareSize, ystart + (y + 1) * squareSize);

        pickColour(p5, colours);
        chooseWaitedColour(xstart + (x + 1) * squareSize, ystart + (y + 1) * squareSize);

        // Bottom
        p5.triangle(xstart + (x + 1) * squareSize, ystart + y * squareSize, xstart + (x + 1) * squareSize, ystart + (y + 1) * squareSize, xstart + x * squareSize, ystart + (y + 1) * squareSize);
      }
    }
  };

  const drawBackground = (position: number) => {
    p5.noStroke();

    const backgroundColours = ["#13191B", "#F3F3F3"];

    const bottom = position * squareSize;
    const top = (position + 20) * squareSize;

    // p5.fill(backgroundColours[0]);
    // p5.triangle(0, 0, top, 0, 0, canvasHeight);

    p5.fill(backgroundColours[0]);

    const p1left = p5.createVector(bottom + xstart, 0); // Top left point
    const p2left = p5.createVector(bottom + xstart, canvasHeight); // Bottom left point
    const p3left = p5.createVector(top + xstart, 0); // Top right point

    p5.rect(bottom + xstart - 1000, p1left.y, 1000, canvasHeight);

    p5.triangle(p1left.x, p1left.y, p2left.x, p2left.y, p3left.x, p3left.y);

    p5.fill(backgroundColours[1]);

    const p1right = p5.createVector(top + xstart, 0); // Top right point
    const p2right = p5.createVector(bottom + xstart, canvasHeight); // Bottom left point
    const p3right = p5.createVector(top + xstart, canvasHeight); // Bottom right point

    p5.rect(p1right.x - 1, p1right.y, 1000, canvasHeight);

    p5.triangle(p1right.x, p1right.y, p2right.x, p2right.y, p3right.x, p3right.y);
  };

  p5.mouseClicked = () => {
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;

    if (mouseInCanvas(mouseX, mouseY, p5.width, p5.height)) {
      p5.redraw();
    }
  };

  p5.mouseDragged = () => {};

  const chooseWaitedColour = (x: number, y: number) => {
    // if (p5.random() >= 1 - xweight / 0.75) {
    //   if (p5.random() >= 1 - yweight / 1) {
    //     p5.fill(50);
    //   }
    // }

    //? Need to figure out how to stop them appearing in top left and bottom right
    // https://stackoverflow.com/questions/13300904/determine-whether-point-lies-inside-triangle

    // * Check if triangle is in the top left "No Go Zone"
    const p1Left = p5.createVector(-10, -10); // Top left point
    const p2Left = p5.createVector(p5.windowWidth / 2, 0); // Top right point
    const p3Left = p5.createVector(0, canvasHeight); // Bottom left point
    const p = p5.createVector(x, y);

    const alphaLeft = ((p2Left.y - p3Left.y) * (p.x - p3Left.x) + (p3Left.x - p2Left.x) * (p.y - p3Left.y)) / ((p2Left.y - p3Left.y) * (p1Left.x - p3Left.x) + (p3Left.x - p2Left.x) * (p1Left.y - p3Left.y));
    const betaLeft = ((p3Left.y - p1Left.y) * (p.x - p3Left.x) + (p1Left.x - p3Left.x) * (p.y - p3Left.y)) / ((p2Left.y - p3Left.y) * (p1Left.x - p3Left.x) + (p3Left.x - p2Left.x) * (p1Left.y - p3Left.y));
    const gammaLeft = 1 - alphaLeft - betaLeft;

    // * Check if triangle is in the bottom right "No Go Zone"
    const p1right = p5.createVector(p5.windowWidth, 0); // Top right point
    const p2right = p5.createVector(p5.windowWidth / 3, canvasHeight); // Bottom left point
    const p3right = p5.createVector(p5.windowWidth, canvasHeight); // Bottom right point
    const pr = p5.createVector(x, y);

    const alpharight = ((p2right.y - p3right.y) * (pr.x - p3right.x) + (p3right.x - p2right.x) * (pr.y - p3right.y)) / ((p2right.y - p3right.y) * (p1right.x - p3right.x) + (p3right.x - p2right.x) * (p1right.y - p3right.y));
    const betaright = ((p3right.y - p1right.y) * (pr.x - p3right.x) + (p1right.x - p3right.x) * (pr.y - p3right.y)) / ((p2right.y - p3right.y) * (p1right.x - p3right.x) + (p3right.x - p2right.x) * (p1right.y - p3right.y));
    const gammaright = 1 - alpharight - betaright;

    if ((alphaLeft >= 0 && betaLeft >= 0 && gammaLeft >= 0) || (alpharight >= 0 && betaright >= 0 && gammaright >= 0)) {
      // if (alpharight >= 0 && betaright >= 0 && gammaright >= 0) {
      // p5.fill(50);
      p5.noFill();
      // return;
    }

    // const xweight = p5.map(x, 0, numCols - 1, 0, 0.9);
    const yweight = p5.map(y, 0, canvasHeight, 0, 0.9);

    const xweight = p5.map(x, 0, canvasWidth, 0, 0.9);
    // if (p5.random() >= xweight && p5.random() >= yweight) {
    if (p5.random() < 0.5) {
      // if (p5.random() >= xweight) {
      // if (p5.random() >= yweight) {
      // p5.fill(50);
      p5.noFill();
      // }
      // }
    }

    // if (alpharight >= 0 && betaright >= 0 && gammaright >= 0) {
    //   p5.fill(50);
    // }

    console.log(`Alpha: ${alphaLeft}\tBeta: ${betaLeft}\tGamma: ${gammaLeft}\t${alphaLeft >= 0 && betaLeft >= 0 && gammaLeft >= 0}`);

    // console.log(`x ${xweight.toFixed(2)}\ty ${yweight.toFixed(2)}`);
  };
};

const pickColour = (p5: p5, colours: string[]) => {
  const randomVal = p5.random();

  if (randomVal <= 0.9) {
    p5.fill(p5.random(colours));
  } else {
    p5.noFill();
  }
};

export interface Config {
  p5: p5;
}
