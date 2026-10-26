// Ball collision explination https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
// Bouncy Ball Example https://p5js.org/examples/motion-bouncy-bubbles.html

import p5 from "p5";
import Walker from "./walker";
import Point from "./point";
import colours from "nice-color-palettes";
import { showFPS } from "../helpers";
import Points from "./points";
import sharkImg from "./shark.gif";
import { getCanvasSize, getCanvasContainer } from "../helpers";

export const sketch = (p5: p5) => {
  const numColours = 5; // Max 5

  let config: Config;
  const cameraSensitivity = 10;

  const walkers: Walker[] = [];
  let points: Points;

  p5.setup = async () => {
    config = {
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
      sharks: false,
    };

    if (config["3D"]) {
      const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
      p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
      p5.directionalLight(200, 200, 200, -1, 0.75, -1);
    } else {
      const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
      p5.createCanvas(canvasWidth, canvasHeight);
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
  sharks: boolean;
}
