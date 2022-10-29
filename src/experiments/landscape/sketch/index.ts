// Reacreating this cool thing => https://old.reddit.com/r/generative/comments/yfl5ph/breathing_terrain_code_in_comments/
// Code => https://editor.p5js.org/BarneyCodes/sketches/DVkfceuPZ

import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  const environment = {
    sea: {
      val: 0.3,
      colour: "#1098A688",
    },
    sand: {
      val: 0.5,
      colour: "#D4A463",
    },
    grass: {
      val: 0.7,
      colour: "#90A944",
    },
    rock: {
      colour: "#62718E",
    },
  };

  const xSquares = 50;
  const ySquares = 50;
  const size = 15;

  const noiseZoom = 0.1;
  const boxMultiplier = 100;

  let xOffset = 0;
  let yOffset = 0;

  let freeMove = false;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
  };

  p5.draw = () => {
    p5.background(50);
    p5.orbitControl(10, 10, 0.015);
    p5.lights();
    p5.directionalLight(200, 200, 200, -1, 0.75, -1);

    p5.translate(-(xSquares * size) / 2, -(ySquares * size) / 2);
    p5.rotateX(p5.radians(45));

    for (let x = 0; x < xSquares; x++) {
      for (let y = 0; y < ySquares; y++) {
        p5.push();

        const noise = p5.noise((x + xOffset) * noiseZoom, (y + yOffset) * noiseZoom);
        p5.fill(getColour(noise));
        p5.noStroke();

        p5.translate(x * size, y * size, (noise / 2) * boxMultiplier);

        p5.box(size, size, noise * boxMultiplier - 20);
        p5.pop();
      }
    }

    const movementVal = 1;

    if (p5.keyIsDown(87)) {
      freeMove = true;
      yOffset -= movementVal;
    } else if (p5.keyIsDown(83)) {
      freeMove = true;
      yOffset += movementVal;
    } else if (p5.keyIsDown(68)) {
      freeMove = true;
      xOffset += movementVal;
    } else if (p5.keyIsDown(65)) {
      freeMove = true;
      xOffset -= movementVal;
    }

    if (!freeMove) {
      yOffset -= p5.noise(yOffset);
      xOffset += p5.noise(xOffset);
    }
  };

  const getColour = (noiseValue: number) => {
    if (noiseValue <= environment.sea.val) {
      return environment.sea.colour;
    } else if (noiseValue > environment.sea.val && noiseValue <= environment.sand.val) {
      return environment.sand.colour;
    } else if (noiseValue > environment.sand.val && noiseValue <= environment.grass.val) {
      return environment.grass.colour;
    } else if (noiseValue > environment.grass.val) {
      return environment.rock.colour;
    } else {
      return "";
    }
  };

  p5.mouseClicked = () => {
    freeMove = false;
  };

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
}
