import { Config } from ".";
import Ray from "./ray";
import { Vector } from "p5";
import Walls from "./walls";

export default class Gem {
  p5;
  pos;
  radius;
  speed;
  velocity;
  acceleration;
  jumpStrength;
  grapplePos;
  anchorPoint;

  rays: Array<Ray> = [];

  angle;
  angleA;
  angleV;
  gravity;

  constructor(config: Config, x: number, y: number, radius: number, id?: string | null) {
    this.p5 = config.p5;
    this.gravity = config.gravity;
    this.jumpStrength = config.jumpStrength;

    this.pos = this.p5.createVector(x, y);
    this.radius = radius;
    this.speed = config.speed;
    this.velocity = this.p5.createVector();
    // this.acceleration = this.p5.createVector();
    this.acceleration = this.p5.createVector(0, 1);
    this.acceleration.setMag(0.05);

    this.grapplePos = this.p5.createVector();
    this.anchorPoint = this.p5.createVector();

    this.angle = 0;
    this.angleA = 0;
    this.angleV = 0;
    this.gravity = 1;

    this.rays.push(new Ray(config, this.pos, this.p5.radians(0)));
  }

  show = () => {
    this.p5.noStroke();
    this.p5.fill("#aaaaaa");
    this.p5.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  };

  updateRay = () => {
    this.rays.forEach((ray) => {
      ray.update();
    });
  };

  grapple = (walls: Walls) => {
    if (this.anchorPoint.x > 0) {
      // Anchor point exists, draw line between point and player blob
      this.p5.stroke(255, 255, 0);

      this.pendulum();
    } else {
      this.rays.forEach((ray) => {
        const point = ray.checkRoof(walls);
        if (point instanceof Vector) {
          this.anchorPoint = ray.checkRoof(walls);
          this.angleA = 0;
          this.angleV = 0;
          this.angle = this.p5.atan2(this.pos.x - this.anchorPoint.x, this.pos.y - this.anchorPoint.y);
        }
      });
    }
  };

  update = () => {
    // this.velocity += this.gravity;
    // this.pos.y += this.velocity;

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    // // this.constrain();
    // if (this.pos.y > this.p5.height) {
    //   this.pos.y = this.p5.height;
    //   this.velocity = 0;
    // } else if (this.pos.y < 0) {
    //   this.pos.y = 0;
    // }
    // this.pendulum();
  };

  // jump = () => {
  //   this.velocity -= this.jumpStrength;
  // };

  pendulum = () => {
    const len = this.pos.dist(this.anchorPoint);

    let pendulumForce = -1 * ((this.gravity * this.p5.sin(this.angle)) / len);

    this.angleA = pendulumForce;
    this.angleV += this.angleA;
    this.angle += this.angleV;

    // this.velocity.set(len * this.p5.sin(this.angle) + this.anchorPoint.x, len * this.p5.cos(this.angle) + this.anchorPoint.y);
    // this.pos.add(this.velocity);

    this.pos.x = len * this.p5.sin(this.angle) + this.anchorPoint.x;
    this.pos.y = len * this.p5.cos(this.angle) + this.anchorPoint.y;

    this.p5.stroke(255, 255, 0);
    this.p5.strokeWeight(2);
    this.p5.line(this.pos.x, this.pos.y, this.anchorPoint.x, this.anchorPoint.y);

    this.p5.fill(255);
    this.p5.ellipse(this.anchorPoint.x, this.anchorPoint.y, 3);
    this.p5.line(this.pos.x, this.pos.y, this.anchorPoint.x, this.anchorPoint.y);
  };

  constrain = () => {};
}
