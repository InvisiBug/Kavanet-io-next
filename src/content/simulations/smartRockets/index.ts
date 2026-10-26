// Playground => https://editor.p5js.org/codingtrain/sketches/o5PwECj42
// Video => https://www.youtube.com/watch?v=bGz7mv2vD6g&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=36&t=2049s

import p5 from "p5";
import Salvo from "./salvo";
import Target from "./target";
import moonImg from "./pics/moon.gif";
import rocketImg from "./pics/rocket.gif";
import obstacleImg from "./pics/obstacle3.png";
import { getCanvasContainer, getCanvasSize, mouseInCanvas } from "../helpers";

export const sketch = (p5: p5) => {
  let salvo: Salvo;
  let target: Target;

  let simSettings: SimSettings;

  p5.setup = async () => {
    const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
    p5.createCanvas(canvasWidth, canvasHeight);

    simSettings = {
      p5,
      moonImg: await p5.loadImage(moonImg),
      rocketImg: await p5.loadImage(rocketImg),
      obstacleImg: await p5.loadImage(obstacleImg),
      lifespan: 400,
      speed: 0.5,
      totalRockets: 100,
      totalObstacles: 30,
    };

    target = new Target(simSettings, p5.width / 2, 50, 50);
    salvo = new Salvo(simSettings, target);
  };

  p5.draw = () => {
    drawBackground();
    salvo.run();
    target.run();

    if (salvo.count === simSettings.lifespan) {
      salvo.createNextGeneration();
    }
  };

  p5.mouseClicked = () => {
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;

    if (mouseInCanvas(mouseX, mouseY, p5.width, p5.height)) {
      target.move(mouseX, mouseY);
    }
  };

  p5.mouseDragged = () => {
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;

    if (mouseInCanvas(mouseX, mouseY, p5.width, p5.height)) {
      target.move(mouseX, mouseY);
    }
  };

  const drawBackground = () => {
    const c1 = p5.color(0);
    const c2 = p5.color("#87CEEB");

    for (let y = 0; y < p5.height; y++) {
      const n = p5.map(y, 0, p5.height, 0, 1);
      const newc = p5.lerpColor(c1, c2, n);
      p5.stroke(newc);
      p5.line(0, y, p5.width, y);
    }
  };
};

export interface SimSettings {
  p5: p5;
  moonImg: p5.Image;
  rocketImg: p5.Image;
  obstacleImg: p5.Image;
  totalRockets: number;
  lifespan: number;
  speed: number;
  totalObstacles: number;
}
