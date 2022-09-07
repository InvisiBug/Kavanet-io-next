import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  const numRows = 20;
  const squareSize = p5.windowHeight / numRows;
  const numCols = Math.floor(p5.windowWidth / squareSize);

  const xstart = p5.windowWidth / 2 - (squareSize * numCols) / 2;
  // const ystart = p5.windowHeight / 2 - (squareSize * numRows) / 2;
  // const xstart = 0;
  const ystart = 0;

  // const colours = ["#302F2D", "#464543", "#274666", "#24829F", "#86A95B"];
  const colours = ["#59BA92", "#0E3556", "#1F5545", "#8284A4", "#F25E40"];
  // const colours = ["#86A95B"];
  let vertex: number[][] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noLoop();
  };

  p5.draw = () => {
    p5.background(50);
    // drawBackground();

    for (let x = 0; x < numCols; x++) {
      for (let y = 0; y < numRows; y++) {
        p5.noStroke();
        p5.fill(colours[0]);
        p5.fill(p5.random(colours));

        // pickColour(p5, colours);
        chooseWaitedColour(x, y);

        // Top
        p5.triangle(
          xstart + x * squareSize,
          ystart + y * squareSize,
          xstart + (x + 1) * squareSize,
          ystart + y * squareSize,
          xstart + x * squareSize,
          ystart + (y + 1) * squareSize
        );

        // pickColour(p5, colours);
        // chooseWaitedColour(x, y);

        // Bottom
        p5.triangle(
          xstart + (x + 1) * squareSize,
          ystart + y * squareSize,
          xstart + (x + 1) * squareSize,
          ystart + (y + 1) * squareSize,
          xstart + x * squareSize,
          ystart + (y + 1) * squareSize
        );
      }
    }
  };

  const drawBackground = () => {
    p5.noStroke();

    const backgroundColours = ["#13191B", "#F3F3F3"];

    p5.fill(backgroundColours[0]);
    p5.triangle(0, 0, p5.windowWidth, 0, 0, p5.windowHeight);

    p5.fill(backgroundColours[1]);
    p5.triangle(p5.windowWidth, p5.windowHeight, p5.windowWidth, 0, 0, p5.windowHeight);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};

  const chooseWaitedColour = (x: number, y: number) => {
    const xweight = p5.map(x, 0, numCols - 1, 0, 0.9);
    const yweight = p5.map(y, 0, numRows - 1, 0, 0.9);

    // if (p5.random() >= xweight * 0.1 && p5.random() >= yweight) {

    if (p5.random() >= xweight) {
      if (p5.random() >= yweight) {
        p5.fill(50);
      }
    }

    // if (p5.random() >= 1 - xweight / 0.75) {
    //   if (p5.random() >= 1 - yweight / 1) {
    //     p5.fill(50);
    //   }
    // }

    //? Need to figure out how to stop them appearing in top left and bottom right
    // https://stackoverflow.com/questions/13300904/determine-whether-point-lies-inside-triangle

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
