import { Vector } from "p5";
import { Config } from "../..";
import { constrain } from "../helpers";
import Safezone from "../zones/safezone";
import TestMap from "../others/trailMap";
import Zombie from "./zombie";
import Food from "../others/food";

export default class Human {
  p5;
  config;

  size;
  speed;
  colour;

  img;

  acceleration;
  velocity;
  pos;

  food;
  hasFood = false;
  previousHasFood = false;

  //////////////////////////
  //* Options
  foodDetectionDistance = 50;
  foodCollectionDistance = 10;
  foodDeclineRate = 1e20; // Higher is better
  hasFoodLimit = 10;
  followStrength = 1;
  avoidanceDistance = 50;
  footstepInterval = 10;
  trailSearchDistance = 100;

  showCalculationMethods = false;

  // config: Config, pos?: Vector, velocity?: Vector
  constructor({ config, pos, velocity }: { config: Config; pos?: Vector; velocity?: Vector }) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = this.p5.color("#3087B4");
    this.size = 10;
    this.food = 10;

    this.img = config.humanImg;

    this.speed = config.speed;
    this.acceleration = this.p5.createVector(0, 0);
    velocity ? (this.velocity = velocity) : (this.velocity = Vector.random2D());
    this.velocity.setMag(config.speed);

    pos ? (this.pos = pos) : (this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height)));
  }

  update = ({ zombies, humans, safezones, food: allFood, toFoodMap, toHomeMap, speed }: UpdateArgs) => {
    if (speed) {
      this.velocity.setMag(speed);
      this.speed = speed;
    }

    // zombies ? this.avoid(zombies) : null;
    this.baseMovement();
    allFood ? this.handleFood(allFood) : null;
    // toFoodMap ? this.followFootSteps(toFoodMap) : null;

    toFoodMap && toHomeMap ? this.handleMaps(toFoodMap, toHomeMap) : null;
  };

  handleMaps = (toFoodMap: TestMap, toHomeMap: TestMap) => {
    if (!this.hasFood) {
      // Don't have food so
      // Add to "to home" map
      // Follow "to food" map

      if (this.p5.frameCount % this.footstepInterval === 0) toHomeMap.addPoint(this.pos);
      this.followFootSteps(toFoodMap);
    } else {
      // Does have food so
      // Add to "to food" map
      // Follow "to home" map

      if (this.p5.frameCount % this.footstepInterval === 0) toFoodMap.addPoint(this.pos);
      this.followFootSteps(toHomeMap);
    }
  };

  show = () => {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.velocity.heading() + this.p5.radians(90));
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, 0, 0, this.config.imageSize, this.config.imageSize);
    this.p5.pop();

    this.showFoodLevel();
  };

  followFootSteps = (testMap: TestMap) => {
    const searchAreaSize = 50;
    // const searchAngles = [-45, 0, 45, -180];
    const searchAngles = [-45, 0, 45];

    //* Crete an array of points for our search areas
    const searchAreaPos = searchAngles.map((searchAngle) => {
      const searchArea = Vector.fromAngle(this.velocity.heading() + this.p5.radians(searchAngle)).setMag(this.trailSearchDistance);
      return Vector.add(this.pos, searchArea);
    });

    //* Get the concentration in our search areas
    const concentrations = searchAreaPos.map((pos) => {
      return testMap.getConcentrationAtLocation(pos, searchAreaSize);
    });

    //* Returns true when a point is detected in any region
    const pointsDetected = (arr: number[]) => {
      return arr.filter((x) => x > 0).length > 0;
    };

    //* Nudge the acceleration vector towards the highest concentration search area
    if (pointsDetected(concentrations)) {
      const location = concentrations.indexOf(Math.max(...concentrations));

      this.acceleration.add(Vector.fromAngle(this.velocity.heading() + this.p5.radians(searchAngles[location])).setMag(this.followStrength));
    }

    //* Show the search areas
    if (this.showCalculationMethods) {
      searchAreaPos.forEach((pos) => {
        const colour = this.p5.color("#274666");
        colour.setAlpha(255 / 10);

        this.p5.push();

        this.p5.strokeWeight(1);
        this.p5.stroke(255);
        this.p5.fill(colour);
        this.p5.ellipse(pos.x, pos.y, searchAreaSize);
        this.p5.pop();
      });
    }
  };

  handleFood = (allFood: Food[]) => {
    this.checkForFood(allFood);

    if (this.food <= this.hasFoodLimit) {
      this.hasFood = false;
    } else {
      this.hasFood = true;
    }

    //* Just ate something
    if (this.hasFood !== this.previousHasFood) {
      this.velocity.mult(-1);
    }
    this.previousHasFood = this.hasFood;

    if (this.p5.frameCount % this.foodDeclineRate === 0) {
      if (this.food > 0) {
        this.food -= 1;
      }
    }
  };

  checkForFood = (allFood: Food[]) => {
    allFood?.forEach((food) => {
      const foodDistance = this.pos.dist(food.pos);
      const toFoodVect = Vector.sub(food.pos, this.pos);
      const foodAngle = this.velocity.angleBetween(toFoodVect);

      if (foodDistance < this.foodDetectionDistance) {
        if (foodAngle > -this.p5.QUARTER_PI && foodAngle < this.p5.QUARTER_PI) {
          this.velocity.add(toFoodVect.copy().setMag(0.2));
        }
      }

      if (foodDistance < this.foodCollectionDistance) {
        allFood.splice(allFood.indexOf(food), 1);
        this.food += 1;
      }
    });
  };

  showFoodLevel = () => {
    this.p5.push();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.text(`${this.food}`, this.pos.x + 8, this.pos.y - 5);
    this.p5.pop();
  };

  baseMovement = () => {
    // Nudge direction randomly
    if (this.p5.random() < 0.2) {
      this.acceleration = Vector.random2D().setMag(0.2);
    }

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);

    this.pos.add(this.velocity);
    constrain(this.p5, this.pos, this.velocity, this.acceleration);

    //? Show direction vectors
    if (this.showCalculationMethods) {
      // Direction
      this.p5.push();
      const directionVector = this.velocity.copy().setMag(10);
      this.p5.strokeWeight(2);
      this.p5.stroke(255);
      this.p5.line(this.pos.x, this.pos.y, this.pos.x + directionVector.x, this.pos.y + directionVector.y);
      this.p5.pop();

      // Food detection arc
      this.p5.push();
      this.p5.strokeWeight(2);
      this.p5.noStroke();
      this.p5.fill("rgba(255, 255, 255, 0.2)");

      this.p5.translate(this.pos.x, this.pos.y);
      this.p5.rotate(this.velocity.heading() - this.p5.radians(45));
      this.p5.arc(0, 0, 100, 100, 0, this.p5.HALF_PI);

      this.p5.pop();
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
  zombies?: Zombie[];
  humans?: Human[];
  safezones?: Safezone[];
  food?: Food[];
  speed?: number | null;
  toFoodMap?: TestMap;
  toHomeMap?: TestMap;
}
