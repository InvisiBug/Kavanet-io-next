// C++ Ant sim => https://www.youtube.com/watch?v=81GQNPJip2Y
// Pheromone Sim => https://openprocessing.org/sketch/15109/

import p5 from "p5";
import colours from "nice-color-palettes";
import { showFPS } from "../helpers";
import { getCanvasSize, getCanvasContainer } from "../helpers";
// Characters
import Zombie from "./components/characters/zombie";
import Human from "./components/characters/human";
import Hunter from "./components/characters/hunter";
// Others
import Sliders from "./components/others/sliders";
import TrailMap from "./components/others/trailMap";
import Food from "./components/others/food";
// Zones
import Safezone from "./components/zones/safezone";
import Supermarket from "./components/zones/supermarket";
// Images
import zombieImg from "./components/sprites/zombie.gif";
import humanImg from "./components/sprites/human.gif";
import hunterImg from "./components/sprites/hunter.gif";

export const sketch = (p5: p5) => {
  const numColours = 5; // Max 5

  let config: Config;

  const zombies: Zombie[] = [];
  const humans: Human[] = [];
  const hunters: Hunter[] = [];
  const safezones: Safezone[] = [];
  const supermarkets: Supermarket[] = [];
  const food: Food[] = [];
  let sliders: Sliders;
  let toFoodMap: TrailMap;
  let toHomeMap: TrailMap;

  p5.setup = async () => {
    // p5.createCanvas(p5.windowWidth, p5.windowHeight);
    const { width: canvasWidth, height: canvasHeight } = getCanvasSize(getCanvasContainer(p5));
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.background(50);

    config = {
      p5,
      colours: p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours),
      showFood: true,
      zombies: 1,
      humans: 0,
      hunters: 10,
      safezones: 1,
      darkzones: 0,
      supermarkets: 5,
      imageSize: 15,
      zombieImg: await p5.loadImage(zombieImg),
      humanImg: await p5.loadImage(humanImg),
      hunterImg: await p5.loadImage(hunterImg),
      speed: 1,
      avoidanceDistance: 50,
      foodDeclineRate: 20,
    };

    sliders = new Sliders(config);
    sliders.create();
    toFoodMap = new TrailMap(config, p5.color("#73f974"));
    toHomeMap = new TrailMap(config, p5.color("#ff2f7f"));

    for (let i = 0; i < config.zombies; i++) {
      zombies.push(new Zombie(config));
    }

    for (let i = 0; i < config.humans; i++) {
      humans.push(new Human({ config }));
    }

    for (let i = 0; i < config.hunters; i++) {
      hunters.push(new Hunter(config));
    }

    for (let i = 0; i < config.safezones; i++) {
      // safezones.push(new Safezone(config, p5.width / 2, p5.height / 2));
      safezones.push(new Safezone(config, 50, p5.height / 2));
    }

    for (let i = 0; i < config.supermarkets; i++) {
      supermarkets.push(new Supermarket(config));
    }
  };

  p5.draw = () => {
    p5.background(50);

    toFoodMap.update();
    toHomeMap.update();

    // if (p5.frameCount % 5 === 0) {
    //   toFoodMap.fade();
    //   toHomeMap.fade();
    // }

    // p5.background(50, 20);
    // p5.background(0, 50);
    zombies.forEach((zombie) => {
      const speed = Number(sliders.getVals().zombieSpeed);
      zombie.update(zombies, humans, safezones, speed);
      zombie.show();
    });

    humans.forEach((human) => {
      const speed = Number(sliders.getVals().humanSpeed);
      human.update({ speed, zombies, humans, safezones, food, toFoodMap, toHomeMap });
      // human.update({ zombies, humans, safezones, food, speed, TestMap });
      human.show();
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

    supermarkets.forEach((supermarket) => {
      supermarket.update({ humans, supermarkets });
      supermarket.show();
    });

    // food.forEach((food) => {
    //   food.show();
    // });

    // darkzones.forEach((darkzone) => {
    //   darkzone.update(zombies);
    //   darkzone.show();
    // });

    // if (p5.mouseIsPressed && p5.frameCount % 60 === 0) {
    // humans.push(new Human(config, p5.mouseX, p5.mouseY));
    // food.push(new Food(config, p5.mouseX, p5.mouseY));

    // if (p5.mouseIsPressed && p5.frameCount % 5 === 0) {
    // testMap.addPoint(p5.mouseX, p5.mouseY);
    if (p5.mouseIsPressed) {
      console.log("pressed");
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;

      if (mouseX > 0 && mouseX < p5.width) {
        console.log("Within x bounds");
        if (mouseY > 0 && mouseY < p5.height) {
          toHomeMap.show();
          toFoodMap.show();
        }
        // toFoodMap.followScent(p5.mouseX, p5.mouseY);
        // food.push(new Food(config, p5.mouseX, p5.mouseY));
        // toFoodMap.addPoint(p5.createVector(p5.mouseX, p5.mouseY));
        // const vect = toFoodMap.getWeakest(p5.mouseX, p5.mouseY, true);
        // console.log(vect.x, vect.y);
        // mouseTest();
      }
    }

    // trailMap.setVal(p5.mouseX, p5.mouseY, 5);
    // }

    // if (p5.frameCount % 250 === 0) {
    //   food = [];
    // }

    showFPS(p5);
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
  safezones: number;
  darkzones: number;
  supermarkets: number;
  //
  foodDeclineRate: number;
  avoidanceDistance: number;
  showFood: boolean;
  humanImg: p5.Image;
  hunterImg: p5.Image;
  imageSize: number;
}
