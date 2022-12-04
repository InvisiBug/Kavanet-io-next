// Ball collision explination https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
// Bouncy Ball Example https://p5js.org/examples/motion-bouncy-bubbles.html

import p5, { Vector } from "p5";
import Walker from "./walker";
import Point from "./point";
import colours from "nice-color-palettes";
import { showFPS } from "src/plots/helpers";
import Points from "./points";

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
  };
  let cameraSensitivity = 10;

  const walkers: Walker[] = [];
  let points: Points;

  p5.setup = () => {
    config["3D"] ? p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL) : p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    // p5.createCanvas(500, 500);
    // p5.createCanvas(500, 500, p5.WEBGL);

    points = new Points(config);

    for (let i = 0; i < config.walkers; i++) {
      walkers.push(new Walker(config, walkers, i));
    }
  };

  p5.draw = () => {
    // p5.background(50, 50);
    p5.background(50);

    if (config["3D"]) {
      p5.orbitControl(cameraSensitivity, cameraSensitivity, 0.5);
      p5.translate(-p5.width / 2, -p5.height / 2);
    }

    points.show();
    points.update(walkers);

    if (walkers.length > 0) {
      walkers.forEach((walker) => {
        walker.update(walkers);
        walker.show();

        // points.forEach((point) => {
        //   point.avoid(walkers);
        //   point.spring();
        // });
      });
    }

    // if (points.length > 0) {
    //   points.forEach((point) => {
    //     point.show();
    //   });
    // }
    showFPS(p5);
  };

  p5.mouseClicked = () => {};

  // p5.mouseDragged = () => {
  //   points.forEach((point) => {
  //     point.distort(p5.createVector(p5.mouseX, p5.mouseY));
  //   });
  // };
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
}
