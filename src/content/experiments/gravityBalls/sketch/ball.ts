import { Vector } from "p5";
import { Config } from ".";
import { constrainCircle as constrainToEdges } from "src/lib/helpers";

export default class Ball {
  config;
  p5;

  pos;
  acc;
  vel;

  colour;
  radius;

  target;
  initialPos;

  maxSpeed;
  maxForce;

  growing = true;
  thickness = 1;
  stopped = false;
  mass = 1;

  constructor(config: Config, pos: Vector, vel?: Vector) {
    this.config = config;
    this.p5 = config.p5;

    this.target = pos.copy();
    this.initialPos = pos.copy();

    this.pos = pos.copy();
    // this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));

    //* Conditionally set vel if vel is passed in
    if (!vel) {
      this.vel = this.p5.createVector();
    } else {
      this.vel = vel;
    }

    this.acc = this.p5.createVector();

    this.colour = this.p5.random(config.colours);
    this.radius = 50;

    this.maxSpeed = 10;
    this.maxForce = 2;
  }

  update = (balls: Ball[]) => {
    // The update you know and love
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    // Stop the ball is its velocity is small
    if (this.vel.mag() < 2) {
      this.stopped = true;
      this.vel.set(0);
    } else {
      this.stopped = false;
    }

    // Stop the ball from growing if it touches an edge or another ball
    if (this.growing && this.stopped) {
      if (this.touchingEdge() || this.touchingBall(balls)) {
        this.growing = false;
        console.log("here");
        return;
      }
      this.radius += 2.5;
      this.mass = this.radius;
    }

    constrainToEdges(this.p5, this.pos, this.vel, this.p5.createVector(), this.radius * 2);
    this.bounceOffBall(balls);
    this.vel.mult(1 - 0.01); // Slow down over time
  };

  touchingEdge = () =>
    this.pos.x + this.radius + this.thickness >= this.p5.width ||
    this.pos.x - this.radius - this.thickness <= 0 ||
    this.pos.y + this.radius + this.thickness >= this.p5.height ||
    this.pos.y - this.radius - this.thickness <= 0;

  touchingBall = (balls: Ball[]) => {
    for (const otherball of balls) {
      if (this.pos !== otherball.pos) {
        const vectBetween = Vector.sub(this.pos, otherball.pos);
        if (vectBetween.mag() < this.radius + otherball.radius) {
          this.growing = false;
          break;
        }
      }
    }

    return false;
  };

  //* This one https://old.reddit.com/r/p5js/comments/pd2csh/im_new_to_programming_im_trying_to_make_a_program/
  // https://stackoverflow.com/a/345863
  bounceOffBall = (balls: Ball[]) => {
    if (!this.stopped) {
      for (const other of balls) {
        if (this.pos !== other.pos) {
          const vectBetween = Vector.sub(this.pos, other.pos);
          if (vectBetween.mag() <= this.radius + other.radius) {
            //* We are colliding :)
            this.collision(other);
            break;
          }
        }
      }
    }
  };

  collisionV2 = () => {
    // let newV1 = p5.Vector.add(v1, p5.Vector.mult(p5.Vector.sub(v2, v1), (2 * m2) / (m1 + m2)));
    // // @ts-ignore
    // const x = Vector.mult(num2, num1 / den1) * ((2 * other.mass) / this.mass + other.mass);
    // // @ts-ignore
    // const y = Vector.mult(num4, num3 / den2) * ((2 * this.mass) / this.mass + other.mass);
    // // @ts-ignore
    // let newv1 = Vector.sub(this.vel, x);
    // // @ts-ignore
    // let newv2 = Vector.sub(other.vel, y);
  };

  collision = (other: Ball) => {
    let num1 = Vector.dot(Vector.sub(this.vel, other.vel), Vector.sub(this.pos, other.pos)); // Numerator 1
    let num2 = Vector.sub(this.pos, other.pos); // Numerator 2
    let den1 = Vector.mag(Vector.sub(this.pos, other.pos)) ** 2; // Denominator 1

    let num3 = Vector.dot(Vector.sub(other.vel, this.vel), Vector.sub(other.pos, this.pos)); // Numerator 3
    let num4 = Vector.sub(other.pos, this.pos); // Numerator 4
    let den2 = Vector.mag(Vector.sub(other.pos, this.pos)) ** 2; // Denominator 2

    const x: any = Vector.mult(num2, num1 / den1);
    const y: any = Vector.mult(num4, num3 / den2);

    let newv1 = Vector.sub(this.vel, x);
    let newv2 = Vector.sub(other.vel, y);

    this.vel.set(newv1);
    other.vel.set(newv2);
  };

  showSize = () => {
    this.p5.push();
    this.p5.textSize(12);
    this.p5.fill(255);
    this.p5.textAlign(this.p5.CENTER);
    this.p5.text(`${this.radius}`, this.pos.x, this.pos.y);
    this.p5.pop();
  };

  applyForce = (force: Vector) => {
    this.acc.add(force);
  };

  applyBehaviors = () => {};

  show = () => {
    this.p5.push();
    this.p5.noStroke();
    this.p5.fill(this.colour);

    this.p5.ellipse(this.pos.x, this.pos.y, this.radius * 2);

    this.p5.pop();
    this.showSize();
  };
}
