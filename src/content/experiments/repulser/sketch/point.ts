import { Vector } from "p5";
import { Config } from ".";
import Walker from "./walker";

export default class Point {
  config;
  p5;

  pos;
  acc;
  vel;

  colour;
  diameter;

  target;
  initialPos;

  maxSpeed;
  maxForce;

  img;
  imageSize;

  constructor(config: Config, pos: Vector) {
    this.config = config;
    this.p5 = config.p5;

    this.target = pos.copy();
    this.initialPos = pos.copy();

    this.pos = pos.copy();
    // this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));

    this.vel = this.p5.createVector();
    this.acc = this.p5.createVector();

    this.colour = this.p5.random(config.colours);
    this.diameter = config.pointSize;

    this.maxSpeed = 10;
    this.maxForce = 2;

    this.img = config.sharkImg;
    this.imageSize = 10;
  }

  update = () => {
    // The update you know and love
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  };

  applyForce = (force: Vector) => {
    this.acc.add(force);
  };

  applyBehaviors = (walkers: Walker[]) => {
    var mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);

    walkers.forEach((walker) => {
      const flee = this.flee(walker.pos);
      flee.mult(1.5); // apply weighting to flee force
      this.applyForce(flee);
    });

    const arrive = this.arrive(this.target);
    arrive.mult(1.5);

    this.applyForce(arrive);
  };

  //  https://natureofcode.com/book/chapter-6-autonomous-agents (Section 6.4)
  arrive = (target: Vector) => {
    const desired = Vector.sub(target, this.pos); // Vector pointing at the target
    const distance = desired.mag();

    let speed = this.maxSpeed;

    if (distance < 100) {
      speed = this.p5.map(distance, 0, 100, 0, this.maxSpeed);
    }

    desired.setMag(speed);

    const steer = Vector.sub(desired, this.vel); // turn torwads the desired vector
    steer.limit(this.maxForce);
    return steer;
  };

  flee = (target: Vector) => {
    const desired = Vector.sub(target, this.pos); // Vector pointing at the target
    const distance = desired.mag();

    if (distance < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      const steer = Vector.sub(desired, this.vel); // turn torwads the desired vector

      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.p5.createVector();
    }
  };

  show = () => {
    this.p5.push();
    this.p5.noStroke();
    this.p5.fill(this.colour);

    if (this.config["3D"]) {
      this.p5.translate(this.pos);
      this.p5.sphere(this.diameter / 2);
    } else {
      this.p5.ellipse(this.pos.x, this.pos.y, this.diameter);
    }

    this.p5.pop();
  };
}
