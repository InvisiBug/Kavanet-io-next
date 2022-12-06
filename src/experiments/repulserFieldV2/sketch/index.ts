// Ball collision explination https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
// Bouncy Ball Example https://p5js.org/examples/motion-bouncy-bubbles.html

import p5, { Vector } from "p5";
import Walker from "./walker";
import Point from "./point";
import colours from "nice-color-palettes";
import { showFPS } from "src/plots/helpers";
import Points from "./points";
import sharkImg from "./shark.gif";

export const sketch = (p5: p5) => {
  const numColours = 5; // Max 5

  const config: Config = {
    p5,
    speed: 10,
    colours: p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours),
    //
    walkers: 10,
    //
    xpoints: 75,
    ypoints: 50,
    margin: 10,
    pointSize: 10,
    returnStrength: 0.05,
    //
    "3D": false,
    sharkImg: p5.loadImage(sharkImg.src),
    sharks: false,
  };
  let cameraSensitivity = 10;

  const walkers: Walker[] = [];
  let points: Points;

  p5.setup = () => {
    if (config["3D"]) {
      p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
      p5.directionalLight(200, 200, 200, -1, 0.75, -1);
    } else {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
    }

    points = new Points(config);

    for (let i = 0; i < config.walkers; i++) {
      walkers.push(new Walker(config, walkers, i));
    }
  };

  p5.draw = () => {
    p5.background(50);

    if (config["3D"]) {
      p5.orbitControl(cameraSensitivity, cameraSensitivity, 0.5);
      p5.translate(-p5.width / 2, -p5.height / 2);
      p5.lights();
    }

    points.update(walkers);
    points.show();

    if (walkers.length > 0) {
      walkers.forEach((walker) => {
        walker.update(walkers);
        walker.show();
      });
    }

    showFPS(p5);
  };
};

export interface Config {
  p5: p5;
  speed: number;
  walkers: number;
  colours: string[];
  "3D": boolean;
  xpoints: number;
  ypoints: number;
  margin: number;
  pointSize: number;
  returnStrength: number;
  sharkImg: p5.Image;
  sharks: boolean;
}
