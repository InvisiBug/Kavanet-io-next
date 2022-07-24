// C++ Ant sim => https://www.youtube.com/watch?v=81GQNPJip2Y
// Pheromone Sim => https://openprocessing.org/sketch/15109/

import p5, { Element, Vector } from "p5";
import colours from "nice-color-palettes";
import { showFPS } from "src/experiments/helpers";
// Characters
import Zombie from "./components/characters/zombie";
import Human from "./components/characters/human";
import Hunter from "./components/characters/hunter";
// Others
import Sliders from "./components/others/sliders";
import TrailMap from "./components/others/trailMap";
import TestMap from "./components/others/testMap";
import Food from "./components/others/food";
// Zones
import Darkzone from "./components/zones/darkzone";
import Safezone from "./components/zones/safezone";
// Images
import zombieImg from "./components/sprites/zombie.gif";
import humanImg from "./components/sprites/human.gif";
import hunterImg from "./components/sprites/hunter.gif";

export const sketch = (p5: p5) => {
  const numColours = 5; // Max 5

  const config: Config = {
    p5: p5,
    colours: p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours),
    //
    showFood: true,
    //
    zombies: 0,
    humans: 5,
    hunters: 5,
    //
    safezones: 1,
    darkzones: 2,
    //
    imageSize: 15,
    zombieImg: p5.loadImage(zombieImg.src),
    humanImg: p5.loadImage(humanImg.src),
    hunterImg: p5.loadImage(hunterImg.src),
    //
    speed: 1,
    avoidanceDistance: 50,
    // foodDeclineRate: p5.floor(p5.random(500, 600)),
    foodDeclineRate: 10, // Higher is slower
  };

  const zombies: Zombie[] = [];
  const humans: Human[] = [];
  const hunters: Hunter[] = [];
  const safezones: Safezone[] = [];
  const darkzones: Darkzone[] = [];
  const sliders = new Sliders(config);
  let food: Food[] = [];

  const toFoodMap = new TrailMap(config, p5.color("#73f974"));
  const toHomeMap = new TrailMap(config, p5.color("#ff2f7f"));

  const testMap = new TestMap(config, p5.color("#73f974"));

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.createCanvas(500, 500);
    // console.log("Canvas Size,", p5.windowWidth, p5.windowHeight);
    p5.background(50);

    // trailMap.generateNewMap();
    toFoodMap.init();
    toHomeMap.init();

    sliders.create();

    testMap.createTestPoints(100);

    // p5.noLoop();
    // p5.frameRate(3);

    // for (let i = 0; i < config.zombies; i++) {
    //   zombies.push(new Zombie(config));
    // }

    for (let i = 0; i < config.humans; i++) {
      humans.push(new Human(config));
    }

    // for (let i = 0; i < config.hunters; i++) {
    //   hunters.push(new Hunter(config));
    // }

    // for (let i = 0; i < config.safezones; i++) {
    //   // safezones.push(new Safezone(config, p5.width / 2, p5.height / 2));
    //   safezones.push(new Safezone(config, 50, p5.height / 2));
    // }

    // for (let i = 0; i < config.darkzones; i++) {
    //   darkzones.push(new Darkzone(config));
    // }

    // for (let i = 0; i < 500; i++) {
    //   food.push(new Food(config, p5.random(200, 500), p5.random(100, 150)));
    //   food.push(new Food(config, p5.random(100, 500), p5.random(p5.height - 200, p5.height - 100)));
    //   food.push(new Food(config, p5.random(p5.width - 500, p5.width - 400), p5.random(100, 150)));
    //   food.push(new Food(config, p5.random(p5.width - 500, p5.width - 400), p5.random(p5.height - 200, p5.height - 100)));
    // }
  };

  p5.draw = () => {
    // console.log(p5.frameRate());
    p5.background(50);

    toFoodMap.show();
    // toHomeMap.show();

    // // console.log(p5.frameRate());

    // if (p5.frameCount % 5 === 0) {
    //   toFoodMap.fade();
    //   toHomeMap.fade();
    // }

    // p5.background(50, 20);
    // p5.background(0, 50);
    zombies.forEach((zombie) => {
      // if (zombie.food < 1) {
      //   zombies.splice(zombies.indexOf(zombie), 1);
      // }
      const speed = Number(sliders.getVals().zombieSpeed);
      zombie.update(zombies, humans, safezones, speed);
      zombie.show();
    });

    humans.forEach((human) => {
      // if (human.food < 1) {
      //   humans.splice(humans.indexOf(human), 1);
      // }

      const speed = Number(sliders.getVals().humanSpeed);
      // human.update({ zombies, humans, safezones, food, speed, toFoodMap, toHomeMap });
      human.update({ zombies, humans, safezones, food, speed, testMap });
      human.show();

      // if (p5.frameCount % 60 === 0) {
      //   toHomeMap.followScent(human.pos.x, human.pos.y);
      // }
    });

    hunters.forEach((hunter) => {
      const speed = Number(sliders.getVals().hunterSpeed);
      hunter.update(zombies, humans, safezones, speed);
      hunter.show();
    });

    safezones.forEach((safezone) => {
      safezone.update(humans);
      safezone.show();
    });

    food.forEach((food) => {
      food.show();
    });

    // darkzones.forEach((darkzone) => {
    //   darkzone.update(zombies);
    //   darkzone.show();
    // });

    // if (p5.mouseIsPressed && p5.frameCount % 60 === 0) {
    // humans.push(new Human(config, p5.mouseX, p5.mouseY));
    // food.push(new Food(config, p5.mouseX, p5.mouseY));

    testMap.show();
    // testMap.update();

    // if (p5.mouseIsPressed && p5.frameCount % 5 === 0) {
    // testMap.addPoint(p5.mouseX, p5.mouseY);
    if (p5.mouseIsPressed) {
      // toFoodMap.followScent(p5.mouseX, p5.mouseY);
      // food.push(new Food(config, p5.mouseX, p5.mouseY));
      // toFoodMap.setVal(p5.mouseX, p5.mouseY, 255);
      // const vect = toFoodMap.getWeakest(p5.mouseX, p5.mouseY, true);
      // console.log(vect.x, vect.y);
      mouseTest();
    }
    // trailMap.setVal(p5.mouseX, p5.mouseY, 5);
    // }

    // if (p5.frameCount % 250 === 0) {
    //   food = [];
    // }

    showFPS(p5);
  };

  const mouseTest = () => {
    const pos = p5.createVector(p5.mouseX, p5.mouseY);
    const directionVector = p5.createVector(0, -1).setMag(100);

    const directionVectors = [
      p5.createVector(-1, -1).setMag(100), // North West
      p5.createVector(0, -1).setMag(100), // North
      p5.createVector(1, -1).setMag(100), // North East
    ];

    const searchAreaPoss = directionVectors.map((directionVector) => {
      return Vector.add(pos, directionVector);
    });

    const searchAreaSize = 50;

    searchAreaPoss.forEach((searchArea, index) => {
      p5.push();
      p5.stroke(255);

      p5.ellipse(searchArea.x, searchArea.y, searchAreaSize);
      console.log(index, testMap.getConcentrationAtLocation(p5.createVector(searchArea.x, searchArea.y), searchAreaSize));
      p5.pop();
    });
  };
};

export interface Config {
  p5: p5;
  speed: number;
  colours: string[];
  zombieImg: p5.Image;
  //
  zombies: number;
  humans: number;
  hunters: number;
  //
  avoidanceDistance: number;

  safezones: number;
  darkzones: number;
  foodDeclineRate: number;
  showFood: boolean;
  humanImg: p5.Image;
  hunterImg: p5.Image;
  imageSize: number;
}
