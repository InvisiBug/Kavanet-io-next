import { Config } from "../..";
import { Vector } from "p5";
import Zombie from "./zombie";
import Safezone from "../zones/safezone";
import { constrain } from "../helpers";
import Food from "../others/food";
import TrailMap from "../others/trailMap";
import TestMap from "../others/testMap";

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
  foodDetectionDistance;

  showCalculationMethods = false;

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
    this.foodDetectionDistance = 50;

    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = Vector.random2D();
    this.velocity.setMag(config.speed);

    if (x && y) {
      this.pos = this.p5.createVector(x, y);
    } else {
      this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    }
  }

  update = ({ zombies, humans, safezones, food: allFood, toFoodMap, toHomeMap, speed, testMap }: UpdateArgs) => {
    if (speed) {
      this.velocity.setMag(speed);
      this.speed = speed;
    }

    // this.handleFood();
    // zombies ? this.avoid(zombies) : null;
    this.handleMovement(toFoodMap, toHomeMap);
    testMap ? this.handleTestMap(testMap) : null;
    // allFood ? this.checkForFood(allFood) : null;
  };

  show = () => {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.velocity.heading() + this.p5.radians(90));
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, 0, 0, this.config.imageSize, this.config.imageSize);
    this.p5.pop();

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

    this.showFoodLevel();
  };

  handleTestMap = (testMap: TestMap) => {
    const searchAreaSize = 50;
    const searchAngles = [-45, 0, 45, -180];

    //* Crete an array of points for our search areas
    const searchAreaPos = searchAngles.map((searchAngle) => {
      const searchArea = Vector.fromAngle(this.velocity.heading() + this.p5.radians(searchAngle)).setMag(75);
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

    // console.log(
    //   concentrations,
    //   pointsDetected(concentrations) ? `Point detected in pos ${concentrations.indexOf(Math.max(...concentrations))}` : null
    // );

    //* Nudge the acceleration vector towards the highest concentration search area
    if (pointsDetected(concentrations)) {
      const location = concentrations.indexOf(Math.max(...concentrations));

      this.acceleration.add(Vector.fromAngle(this.velocity.heading() + this.p5.radians(searchAngles[location])).setMag(1));
    }

    //* Show the search areas
    if (this.showCalculationMethods) {
      searchAreaPos.forEach((pos) => {
        this.p5.push();

        this.p5.strokeWeight(1);
        this.p5.stroke(255);
        this.p5.ellipse(pos.x, pos.y, searchAreaSize);
        this.p5.pop();
      });
    }
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
    allFood?.forEach((food) => {
      const foodDistance = this.pos.dist(food.pos);
      const toFoodVect = Vector.sub(food.pos, this.pos);
      const foodAngle = this.velocity.angleBetween(toFoodVect);

      if (foodDistance < this.foodDetectionDistance) {
        if (foodAngle > -this.p5.QUARTER_PI && foodAngle < this.p5.QUARTER_PI) {
          this.velocity.add(toFoodVect.copy().setMag(0.1));
        }
      }

      // this.p5.push();
      // // this.p5.translate(this.pos);
      // this.p5.stroke(255);
      // this.p5.strokeWeight(2);
      // this.p5.line(this.pos.x, this.pos.y, food.pos.x, food.pos.y);
      // // console.log(this.p5.degrees(directionVector.angleBetween(foodVector)));
      // // console.log(this.p5.degrees(directionVector.angleBetween(food.pos)));
      // this.p5.pop();
      // // console.log(this.p5.degrees(this.pos.angleBetween(food.pos)));
      // // console.log("True");
      // // }
    });

    // allFood.forEach((food) => {
    //   const dist = this.pos.dist(food.pos);
    //   if (dist < 10) {
    //     this.food += 50;
    //     allFood.splice(allFood.indexOf(food), 1);
    //   }
    // });
  };

  showFoodLevel = () => {
    this.p5.push();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.text(`${this.food}`, this.pos.x + 8, this.pos.y - 5);
    this.p5.pop();
  };

  handleMovement = (toFoodMap: TrailMap | undefined, toHomeMap: TrailMap | undefined) => {
    // Nudge direction randomly
    if (this.p5.random() < 0.2) {
      this.acceleration = Vector.random2D().setMag(0.2);
    }

    toFoodMap && toHomeMap ? this.handleTrailMaps(toFoodMap, toHomeMap) : null;
    // this.handleTrailMaps(toFoodMap, toHomeMap);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);

    this.pos.add(this.velocity);
    constrain(this.p5, this.pos, this.velocity, this.acceleration);
  };

  handleTrailMaps = (toFoodMap: TrailMap, toHomeMap: TrailMap) => {
    if (this.p5.frameCount % 2 === 0) {
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
  zombies?: Zombie[];
  humans?: Human[];
  safezones?: Safezone[];
  food?: Food[];
  speed?: number | null;
  toFoodMap?: TrailMap;
  toHomeMap?: TrailMap;
  testMap?: TestMap;
}
