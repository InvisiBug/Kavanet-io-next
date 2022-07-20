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
    this.startingPos = pos;
    this.pos = pos.copy();

    this.acceleration = this.p5.createVector(0, 0);
    this.colour = this.p5.random(config.colours);
    this.diameter = 5;
  }

  update = () => {};

  show = () => {
    this.p5.push();

    this.p5.strokeWeight(2);
    this.p5.stroke(this.colour);
    this.p5.fill(this.colour);
    if (this.config["3D"]) {
      this.p5.translate(this.pos);
      this.p5.sphere(this.diameter / 2);
    } else {
      this.p5.ellipse(this.pos.x, this.pos.y, this.diameter);
    }

    this.p5.pop();
  };

  // distort = (m: Vector) => {
  //   const sc = 100;
  //   const dSq = m.copy().sub(this.pos).magSq();
  //   if (dSq < ((this.diameter / 2) * this.diameter) / 2) {
  //     console.log("here");
  //     const fd = this.p5.pow(1 - this.p5.sqrt(dSq) / this.diameter / 2, 5);
  //     const noize = this.p5.noise(this.pos.x * sc, this.pos.y * sc, this.p5.frameCount * sc);

  //     const add = Vector.fromAngle(2 * this.p5.TAU * noize).mult(fd * 15);
  //     const c = this.p5.color(180 * noize + 180 * fd, 100, 100);

  //     this.pos.add(add);
  //     console.log(this.pos);
  //   }
  // };

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
        this.acceleration = Vector.sub(this.pos, closestWalker.pos);
        this.pos.add(this.acceleration);
        this.acceleration.set(0, 0);
      }
    }
  };

  spring = () => {
    this.pos.lerp(this.startingPos, 0.001);
  };
}
