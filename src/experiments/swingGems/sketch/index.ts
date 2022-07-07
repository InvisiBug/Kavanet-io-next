import p5, { Vector } from "p5";
import Gem from "./gem";
import Walls from "./walls";
import colours from "nice-color-palettes";

export const sketch = (p5: p5) => {
  const numColours = 3;
  const availableColours = p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours);

  const config = {
    p5: p5,
    speed: 5,
    gravity: 1,
    availableColours,
    jumpStrength: 20,
    board: {
      width: 800,
      height: 800,
    },
  };

  let playerGem: Gem;

  const walls = new Walls(config);

  p5.setup = () => {
    // p5.noLoop();
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.cursor(p5.CROSS);
    // p5.angleMode(p5.DEGREES);

    playerGem = new Gem(config, p5.width / 2, p5.height / 2, 20);
    // playerGem = new Gem(config, 100, 100, 20);
  };

  p5.draw = () => {
    p5.background(50);

    // walls.update();
    walls.show();

    //* Update the ray direction when the mouse is clicked
    p5.mousePressed = () => {
      playerGem.updateRay();
    };

    //* Grapple so long as mouse is held
    if (p5.mouseIsPressed === true) {
      playerGem.grapple(walls);
    } else {
      playerGem.anchorPoint = p5.createVector();
      // playerGem.update();
    }

    // playerGem.pendulum();

    playerGem.show();
  };
};

export interface Config {
  p5: p5;
  speed: number;
  gravity: number;
  jumpStrength: number;
  availableColours: any[];
  board: {
    width: number;
    height: number;
  };
}
