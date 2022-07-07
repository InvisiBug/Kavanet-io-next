import { Config } from "../..";
import { Vector } from "p5";
import Zombie from "./zombie";
import Safezone from "../zones/safezone";
import { constrain } from "../helpers";
import Food from "../others/food";
import TrailMap from "../others/trailMap";

export default class Human {
  p5;
  config;

  size;
  speed;
  colour;
  avoidanceDistance;
  foodDeclineRate;
  img;

  acceleration;
  velocity;
  pos;
  food;
  hasFood = false;

  constructor(config: Config, x: number | null = null, y: number | null = null) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = this.p5.color("#3087B4");
    this.avoidanceDistance = 50;
    this.speed = config.speed;
    this.size = 10;
    this.food = 10;
    this.foodDeclineRate = config.foodDeclineRate;
    this.img = config.humanImg;

    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = Vector.random2D();
    this.velocity.setMag(config.speed);

    if (x && y) {
      this.pos = this.p5.createVector(x, y);
    } else {
      this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    }
  }

  update = ({ zombies, humans, safezones, food, toFoodMap, toHomeMap, speed }: UpdateArgs) => {
    if (speed) {
      this.velocity.setMag(speed);
      this.speed = speed;
    }

    this.handleFood();
    this.avoid(zombies);
    this.handleMovement(toFoodMap, toHomeMap);
    this.checkForFood(food);
  };

  show = () => {
    this.p5.push();

    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.velocity.heading() + this.p5.radians(90));
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, 0, 0, this.config.imageSize, this.config.imageSize);
    this.p5.pop();

    this.p5.push();
    const directionVector = this.velocity.copy().setMag(10);
    this.p5.strokeWeight(2);
    this.p5.stroke(255);
    this.p5.line(this.pos.x, this.pos.y, this.pos.x + directionVector.x, this.pos.y + directionVector.y);
    this.p5.pop();

    this.showFoodLevel();
  };

  handleFood = () => {
    if (this.food <= 50) {
      this.hasFood = false;
    } else {
      this.hasFood = true;
    }

    if (this.p5.frameCount % this.foodDeclineRate === 0) {
      if (this.food > 0) {
        this.food -= 1;
      }
    }
  };

  checkForFood = (allFood: Food[]) => {
    allFood.forEach((food) => {
      const dist = this.pos.dist(food.pos);
      if (dist < 10) {
        this.food += 50;
        allFood.splice(allFood.indexOf(food), 1);
      }
    });
  };

  showFoodLevel = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.text(`${this.food}`, this.pos.x + 8, this.pos.y - 5);
    this.p5.push();
  };

  handleMovement = (toFoodMap: TrailMap, toHomeMap: TrailMap) => {
    // Nudge direction randomly
    if (this.p5.random() < 0.2) {
      this.acceleration = Vector.random2D().setMag(0.2);
    }

    this.handleTrailMaps(toFoodMap, toHomeMap);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);

    this.pos.add(this.velocity);
    constrain(this.p5, this.pos, this.velocity, this.acceleration);
  };

  handleTrailMaps = (toFoodMap: TrailMap, toHomeMap: TrailMap) => {
    if (this.p5.frameCount % 5 === 0) {
      if (!this.hasFood) {
        toHomeMap.setVal(this.pos.x, this.pos.y, 255);
        this.acceleration = toFoodMap.getWeakest(this.pos.x, this.pos.y, this.hasFood).setMag(1);
      } else {
        toFoodMap.setVal(this.pos.x, this.pos.y, 255);
        this.acceleration = toHomeMap.getWeakest(this.pos.x, this.pos.y, this.hasFood).setMag(1);
      }
    }
  };

  // https://editor.p5js.org/mtchl/sketches/HJYeik7Al
  avoid = (zombies: Zombie[]) => {
    let closestZombie: any | null = null;
    let shortestDist = Infinity;

    zombies.forEach((zombie) => {
      const dist = this.pos.dist(zombie.pos);
      if (dist < shortestDist) {
        shortestDist = dist;
        closestZombie = zombie;
      }
    });

    if (closestZombie instanceof Zombie) {
      if (closestZombie.pos.dist(this.pos) < this.avoidanceDistance) {
        this.acceleration = Vector.sub(this.pos, closestZombie.pos);
      }

      return closestZombie;
    } else {
      return null;
    }
  };
}

interface UpdateArgs {
  zombies: Zombie[];
  humans: Human[];
  safezones: Safezone[];
  food: Food[];
  speed: number | null;
  toFoodMap: TrailMap;
  toHomeMap: TrailMap;
}
