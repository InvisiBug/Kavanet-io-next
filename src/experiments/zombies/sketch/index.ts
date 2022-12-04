// C++ Ant sim => https://www.youtube.com/watch?v=81GQNPJip2Y
// Pheromone Sim => https://openprocessing.org/sketch/15109/

import p5, { Element } from "p5";
import colours from "nice-color-palettes";
import { showFPS } from "src/plots/helpers";
// Characters
import Zombie from "./components/characters/zombie";
import Human from "./components/characters/human";
import Hunter from "./components/characters/hunter";
// Others
import Sliders from "./components/others/sliders";
import TrailMap from "./components/others/trailMap";
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
    zombies: 10,
    humans: 1,
    hunters: 5,
    //
    safezones: 2,
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
    foodDeclineRate: 10,
  };

  const zombies: Zombie[] = [];
  const humans: Human[] = [];
  const hunters: Hunter[] = [];
  const safezones: Safezone[] = [];
  const darkzones: Darkzone[] = [];
  const sliders = new Sliders(config);
  const food: Food[] = [];

  const toFoodMap = new TrailMap(config, p5.color("#73f974"));
  const toHomeMap = new TrailMap(config, p5.color("#ff2f7f"));

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.createCanvas(500, 500);
    // console.log("Canvas Size,", p5.windowWidth, p5.windowHeight);
    p5.background(50);

    // trailMap.generateNewMap();
    toFoodMap.generateNewMap();
    toHomeMap.generateNewMap();

    sliders.create();
    // p5.noLoop();
    // p5.frameRate(3);

    for (let i = 0; i < config.zombies; i++) {
      zombies.push(new Zombie(config));
    }

    for (let i = 0; i < config.humans; i++) {
      humans.push(new Human(config));
    }

    for (let i = 0; i < config.hunters; i++) {
      hunters.push(new Hunter(config));
    }

    for (let i = 0; i < config.safezones; i++) {
      // safezones.push(new Safezone(config, p5.width / 2, p5.height / 2));
      safezones.push(new Safezone(config));
    }

    // for (let i = 0; i < config.darkzones; i++) {
    //   darkzones.push(new Darkzone(config));
    // }

    for (let i = 0; i < 500; i++) {
      food.push(new Food(config, p5.random(200, 500), p5.random(100, 150)));
      food.push(new Food(config, p5.random(100, 500), p5.random(p5.height - 200, p5.height - 100)));
      food.push(new Food(config, p5.random(p5.width - 500, p5.width - 400), p5.random(100, 150)));
      food.push(new Food(config, p5.random(p5.width - 500, p5.width - 400), p5.random(p5.height - 200, p5.height - 100)));
    }
  };

  p5.draw = () => {
    // console.log(p5.frameRate());
    p5.background(50);
    showFPS(p5);
    toFoodMap.show();
    toHomeMap.show();

    // console.log(p5.frameRate());

    if (p5.frameCount % 5 === 0) {
      toFoodMap.fade();
      toHomeMap.fade();
    }

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
      //   // humans.splice(humans.indexOf(human), 1);
      // }

      const speed = Number(sliders.getVals().humanSpeed);
      human.update({ zombies, humans, safezones, food, speed, toFoodMap, toHomeMap });
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

    darkzones.forEach((darkzone) => {
      darkzone.update(zombies);
      darkzone.show();
    });

    // if (p5.mouseIsPressed && p5.frameCount % 60 === 0) {
    // humans.push(new Human(config, p5.mouseX, p5.mouseY));
    // food.push(new Food(config, p5.mouseX, p5.mouseY));

    // if (p5.mouseIsPressed && p5.frameCount % 5 === 0) {
    if (p5.mouseIsPressed) {
      // toFoodMap.followScent(p5.mouseX, p5.mouseY);
      // toFoodMap.setVal(p5.mouseX, p5.mouseY, 255);
      // const vect = toFoodMap.getWeakest(p5.mouseX, p5.mouseY, true);
      // console.log(vect.x, vect.y);
    }
    // trailMap.setVal(p5.mouseX, p5.mouseY, 5);
    // }
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
