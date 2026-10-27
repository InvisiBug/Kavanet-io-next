import p5 from "p5";
import { generateColours, getCanvasContainer, getCanvasSize, mouseInCanvas } from "../helpers";
import Tower from "./objects/tower";
import Foundation from "./objects/foundation";
import Background from "./objects/background";
import Tree from "./objects/tree";
import Turnbine from "./objects/turbine";

export const sketch = (p5: p5) => {
  const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
  const config = {
    p5,
    colours: generateColours(p5, 5),
    svgMode: false,
  };

  const objects: Objects = {
    towers: [],
    trees: [],
    turbines: [],
    foundation: {} as Foundation,
    background: {} as Background,
  };

  p5.setup = () => {
    // p5.createCanvas(500, 600);

    p5.createCanvas(canvasWidth, canvasHeight);

    objects.foundation = new Foundation(config, objects);
    objects.background = new Background(config, objects);
  };

  p5.draw = () => {
    // p5.background("#F2E4C4");

    if (config.svgMode) {
      p5.background(255);
    } else {
      p5.background(50);
      // p5.background("#FAEBD7");
    }

    p5.translate(0, p5.height);
    p5.scale(1, -1);

    objects.background.show();
    objects.foundation.show();

    for (const tree of objects.trees) {
      tree.show();
    }

    for (const turbine of objects.turbines) {
      turbine.show();
    }

    // Towers
    [...Array(4)].forEach(() => {
      if (!objects.foundation) return;

      objects.towers.push(
        new Tower(config, {
          width: p5.random(20, 50),
          height: p5.random(50, 150),
          foundation: objects.foundation,
        }),
      );
    });

    for (const tower of objects.towers) {
      if (!objects.foundation) return;

      const possibleLocation = {
        start: objects.foundation.start,
        end: objects.foundation.end - tower.width - 10 || 0,
      };

      tower.show(p5.random(possibleLocation.start, possibleLocation.end), objects.foundation.y);
    }

    drawCrinkles();

    p5.noLoop();
  };

  const drawCrinkles = () => {
    const colour = p5.color("#F4F1DD");
    // colour.setAlpha(p5.random(5));
    colour.setAlpha(3);

    p5.noFill();
    p5.stroke(colour);
    p5.strokeWeight(1);

    for (let i = 0; i < 3000; i++) {
      const xmin = 0;
      const xmax = p5.width;

      const ymin = -p5.height;
      const ymax = p5.height * 2;

      // const ymin = -p5.height;
      // const ymax = p5.height;

      const pt1 = p5.createVector(xmin, p5.random(ymin, ymax));
      const pt2 = p5.createVector(p5.random(xmax), p5.random(ymin, ymax));
      const pt3 = p5.createVector(p5.random(xmax), p5.random(ymin, ymax));
      const pt4 = p5.createVector(xmax, p5.random(ymin, ymax));

      p5.bezier(pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y, pt4.x, pt4.y);
    }
  };

  p5.mouseClicked = () => {
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;

    if (mouseInCanvas(mouseX, mouseY, p5.width, p5.height)) {
      restart();
    }
  };

  p5.keyPressed = (event?: KeyboardEvent) => {
    const key = event?.key ?? "";

    switch (key) {
      case "s":
        p5.save("Drawing.svg");
        break;

      case "r":
        restart();
        break;

      case "c":
        config.colours = generateColours(p5, 5);
        restart();
        break;

      case "x":
        console.log(config.colours);
        break;
    }
  };

  const restart = () => {
    objects.towers = [];
    objects.trees = [];
    objects.turbines = [];
    p5.loop();
  };

  p5.mouseDragged = () => {
    console.log(p5.mouseX, p5.mouseY);
  };
};

export interface Config {
  p5: p5;
  colours: string[];
  svgMode: boolean;
}

export interface Objects {
  towers: Tower[];
  trees: Tree[];
  turbines: Turnbine[];
  foundation: Foundation;
  background: Background;
}
