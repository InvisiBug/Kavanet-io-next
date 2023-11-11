import p5 from "p5";
import DNA from "./dna";
import Target from "./target";
import { SimSettings } from ".";
import Obstacle from "./obstacle";

export default class Rocket {
  p5;
  pos;
  vel;
  acc;
  img;
  dna;
  location;
  target;
  fitness;
  completed;
  simSettings;
  crashed;
  obstacleArr: Array<Obstacle> = [];

  constructor(simSettings: SimSettings, target: Target, obstacleArr: Array<Obstacle>, dna: DNA | null = null) {
    this.p5 = simSettings.p5;
    this.simSettings = simSettings;

    this.img = simSettings.rocketImg;
    this.target = target;

    this.obstacleArr = obstacleArr;

    this.pos = this.p5.createVector(this.p5.width / 2, this.p5.height);

    this.vel = this.p5.createVector();
    this.acc = this.p5.createVector();

    this.completed = false;
    this.crashed = false;

    //* Generate random dna if none has been provided
    // random dna is only used on first run
    // child dna is used for each subsequent generation
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA(this.simSettings);
    }

    this.location = 0;
    this.fitness = 0;
  }

  update = () => {
    this.location++;
    if (!this.completed && !this.crashed) {
      //* Check distance to target and complete if target reached
      const distanceToTarget = this.p5.dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
      if (distanceToTarget < 10) {
        this.completed = true;
      }

      //* Check distance to each obstacle and crash if too close
      this.obstacleArr.forEach((obstacle) => {
        const distanceToObstacle = this.p5.dist(this.pos.x, this.pos.y, obstacle.pos.x, obstacle.pos.y);
        if (distanceToObstacle < obstacle.size / 2) {
          this.crashed = true;
        }
      });

      // * Crash if rocket tries to go off screen
      const border = 0;
      if (this.pos.x < 0 + border || this.pos.x > this.p5.width - border || this.pos.y < 0 + border || this.pos.y > this.p5.height - border) {
        this.crashed = true;
      }

      this.applyForce(this.dna.genes[this.location]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  };

  // * Only show the rocket if its not completed
  show = () => {
    if (!this.completed && !this.crashed) {
      this.p5.push();

      this.p5.translate(this.pos.x, this.pos.y);
      this.p5.rotate(this.vel.heading() + 80 * -1);

      this.p5.imageMode(this.p5.CENTER);
      this.p5.image(this.simSettings.rocketImg, 0, 0, 51, 51);
      this.p5.pop();
    }
  };

  applyForce = (force: p5.Vector) => {
    this.acc.add(force);
  };

  //* Calculate how well this rocket did
  // Fitness is 1 / distange to target
  calcFitness = () => {
    const distanceToTarget = this.p5.dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

    this.fitness = this.p5.map(distanceToTarget, 0, this.p5.width, this.p5.width, 0);
    if (this.completed) {
      return true;
    }
    if (this.crashed) {
      this.fitness /= 10;
      return false;
    }
  };
}
