import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  const numRows = 10;
  const numCols = 10;
  const squareSize = 75;

  const xpoints = 10;
  const ypoints = 10;
  const margin = 200;

  const xstart = p5.windowWidth / 2 - (squareSize * numCols) / 2;
  const ystart = p5.windowHeight / 2 - (squareSize * numRows) / 2;

  const colours = ["#302F2D", "#464543", "#274666", "#24829F", "#86A95B"];
  let vertex: number[][] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(50);
    p5.noLoop();

    for (let x = 0; x < xpoints; x++) {
      for (let y = 0; y < ypoints; y++) {
        p5.noStroke();

        pickColour(p5, colours);

        p5.triangle(
          xstart + x * squareSize,
          ystart + y * squareSize,
          xstart + (x + 1) * squareSize,
          ystart + y * squareSize,
          xstart + x * squareSize,
          ystart + (y + 1) * squareSize
        );

        pickColour(p5, colours);

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

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

const pickColour = (p5: p5, colours: string[]) => {
  const randomVal = p5.random();

  console.log(randomVal);
  if (randomVal <= 0.9) {
    p5.fill(p5.random(colours));
  } else {
    p5.noFill();
  }
};

export interface Config {
  p5: p5;
}
