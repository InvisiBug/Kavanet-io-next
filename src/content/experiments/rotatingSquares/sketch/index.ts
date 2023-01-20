import p5 from "p5";
import { generateColours } from "src/lib/helpers";
import Square from "./square";

export const sketch = (p5: p5) => {
  const config = {
    p5: p5,
    colours: generateColours(p5, 5),
  };

  const squares: Square[] = [];

  const numSquares = 50;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    [...Array(numSquares)].forEach(() => {
      squares.push(new Square(config));
    });
  };

  p5.draw = () => {
    if (p5.frameCount % (1 * 60 * 60) === 0) {
      const colours = generateColours(p5, 5);
      for (const square of squares) {
        square.updateColours(colours);
      }
    }
    p5.background(0);

    // Circles
    p5.translate(p5.width / 2, p5.height / 2);

    for (const square of squares) {
      square.update();
      square.show();
    }

    // Rectangles
    // [...Array(numRectangles)].forEach((_, index) => {
    //   const colour = p5.color(p5.random(availableColours));

    //   p5.noFill();
    //   p5.stroke(colour);
    //   p5.strokeWeight(2);

    //   const x = p5.map(p5.noise(index * 0.1), 0, 1, 0, p5.height - 300);
    //   const y = 0;
    //   const thickness = p5.random(20);
    //   const length = p5.random(100);

    //   p5.rectMode(p5.CENTER);
    //   p5.rect(x, y, thickness, length);

    //   p5.rotate(p5.radians(p5.random(360)));
    // });
  };
};

export interface Config {
  p5: p5;
  colours: string[];
}
