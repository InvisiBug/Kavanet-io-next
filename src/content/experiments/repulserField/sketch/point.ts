import { Vector } from "p5";
import { Config } from ".";
import Walker from "./walker";

export default class Point {
  config;
  p5;
  pos;

  acceleration;
  colour;
  diameter;

  startingPos;

  constructor(config: Config, pos: Vector) {
    this.config = config;
    this.p5 = config.p5;

    this.startingPos = pos.copy();
    this.pos = pos.copy();
    this.acceleration = this.p5.createVector(0, 0);

    this.colour = this.p5.random(config.colours);
    this.diameter = config.pointSize;
  }

  update = () => {};

  show = () => {
    this.p5.push();

    this.p5.strokeWeight(2);
    this.p5.stroke(this.colour);
    this.p5.fill(this.colour);
    if (this.config["3D"]) {
      console.log("3D");
      this.p5.translate(this.pos);
      this.p5.sphere(this.diameter / 2);
    } else {
      this.p5.ellipse(this.pos.x, this.pos.y, this.diameter);
    }

    this.p5.pop();
  };

  avoid = (walkers: Walker[]) => {
    let closestWalker: any | null = null;
    let shortestDist = Infinity;

    walkers.forEach((walker: Walker) => {
      const dist = this.pos.dist(walker.pos);
      if (dist < shortestDist) {
        shortestDist = dist;
        closestWalker = walker;
      }
    });

    const avoidanceDistance = closestWalker.diameter / 2 + this.diameter / 2;
    if (closestWalker instanceof Walker) {
      if (closestWalker.pos.dist(this.pos) < avoidanceDistance) {
        this.acceleration = Vector.sub(this.pos, closestWalker.pos).setMag(20);
        this.pos.add(this.acceleration);
        this.acceleration.set(0, 0);
      }
    }
  };

  return = () => {
    const desired = Vector.sub(this.startingPos, this.pos);

    this.pos.lerp(this.startingPos, this.config.returnStrength);
    const distance = desired.mag();
  };
}
