import { Config } from "../..";
import p5, { Vector } from "p5";
import Human from "./human";
import Safezone from "../zones/safezone";
import { constrain } from "../helpers";

export default class Zombie {
  p5;
  config;

  size;
  img;
  colour;

  food;
  foodDeclineRate;

  speed;
  wanderStrength;
  acceleration;
  velocity;
  pos;

  constructor(config: Config, x: number | null = null, y: number | null = null) {
    this.p5 = config.p5;
    this.config = config;

    this.size = 10;
    this.img = config.zombieImg;
    this.colour = this.p5.color(161, 184, 66);

    this.food = this.p5.floor(this.p5.random(10, 20));
    this.foodDeclineRate = config.foodDeclineRate;

    this.speed = config.speed;
    this.wanderStrength = 0.1;
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = Vector.random2D();
    this.velocity.setMag(config.speed);

    if (x && y) {
      this.pos = this.p5.createVector(x, y);
    } else {
      this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    }
  }

  show = () => {
    this.p5.push();

    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.velocity.heading());

    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, 0, 0, this.config.imageSize, this.config.imageSize);
    this.p5.pop();

    this.showFood();
  };

  showFood = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.text(`${this.food}`, this.pos.x + 8, this.pos.y - 5);
    this.p5.push();
  };

  drawDirection = () => {
    this.p5.push();
    this.p5.strokeWeight(2);
    this.p5.stroke(1);

    const line = this.velocity.copy();
    line.setMag(this.size / 2);
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.line(0, 0, line.x, line.y);
    this.p5.pop();
  };

  //* Main update function
  // Deals with movement speed changes
  update = (zombies: Zombie[], humans: Human[], safezones: Safezone[], speed: number | null = null) => {
    // Set max speed
    if (speed) {
      this.velocity.setMag(speed);
      this.speed = speed;
    }

    this.handleMovement();
    this.handleFood();

    this.chase(humans, zombies);
    this.avoid(safezones);
  };

  handleFood = () => {
    if (this.p5.frameCount % this.foodDeclineRate === 0) {
      if (this.food > 0) {
        this.food -= 1;
      }
    }
  };

  handleMovement = () => {
    // Nudge direction randomly
    if (this.p5.random() < 0.4) {
      this.acceleration = Vector.random2D().setMag(0.2);
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);

    this.pos.add(this.velocity);
    constrain(this.p5, this.pos, this.velocity, this.acceleration);
  };

  //* Avoid safezones
  avoid = (safezones: Safezone[]) => {
    safezones.forEach((safezone: Safezone) => {
      const dist = this.pos.dist(safezone.pos);
      if (dist < 100) {
        this.acceleration = Vector.sub(this.pos, safezone.pos);
        // this.acceleration.setMag(1);
      }
    });
  };

  //* Chase the humans
  // Finds the closest human
  // Chases them by pointing acceleration vector at them
  // Deletes human from humans array if its close enough
  // Adds a new zombie in the location of the human
  chase = (humans: Human[], zombies: Zombie[]): void => {
    let humanToChase: any | null = null;
    let shortestDist = Infinity;
    const sightDistance = 100;

    humans.forEach((human: Human) => {
      const dist = this.pos.dist(human.pos);
      if (dist < shortestDist) {
        shortestDist = dist;
        if (dist < sightDistance) {
          humanToChase = human;
        }
      }
    });

    if (humanToChase instanceof Human) {
      this.acceleration = Vector.sub(humanToChase.pos, this.pos);

      if (this.pos.dist(humanToChase.pos) < 5) {
        this.food += 1;
        humans.splice(humans.indexOf(humanToChase), 1);

        const spawnx = humanToChase.pos.x + this.p5.random(-10, 10);
        const spawny = humanToChase.pos.y + this.p5.random(-10, 10);
        zombies.push(new Zombie(this.config, spawnx, spawny));
      }
    }
  };
}
