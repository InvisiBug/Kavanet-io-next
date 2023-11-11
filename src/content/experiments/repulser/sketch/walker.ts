import { Vector } from "p5";
import { Config } from ".";
import { constrainCircle } from "../../../plots/helpers";

export default class Walker {
  p5;
  pos;
  velocity;
  acceleration;
  speed;
  walkers;
  diameter;
  colour;
  initialColour;
  number;
  config;

  img;
  imageSize;

  constructor(config: Config, walkers: Walker[], number: number) {
    this.config = config;
    this.p5 = config.p5;

    this.walkers = walkers;

    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    this.velocity = Vector.random2D().setMag(5);
    this.acceleration = this.p5.createVector(0, 0);
    this.speed = config.speed;
    this.diameter = 25;

    this.initialColour = this.p5.random(config.colours);
    this.colour = this.initialColour;

    this.number = number;

    this.img = config.sharkImg;
    this.imageSize = 25;
  }

  update = (walkers: Walker[]) => {
    this.velocity.add(this.acceleration);
    // this.velocity.limit(this.speed);
    if (this.p5.random() < 0.4) {
      this.acceleration = Vector.random2D().setMag(0.2);
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);
    this.pos.add(this.velocity);

    // this.acceleration = this.p5.createVector(0, 0);

    this.collide(walkers);
    constrainCircle(this.p5, this.pos, this.velocity, this.acceleration, this.diameter);
  };

  show = () => {
    if (this.config.sharks) {
      this.p5.push();

      this.p5.translate(this.pos.x, this.pos.y);
      this.p5.rotate(this.velocity.heading() - this.p5.radians(180));

      this.p5.imageMode(this.p5.CENTER);
      this.p5.image(this.img, 0, 0, this.imageSize * 2.57, this.imageSize);
      this.p5.pop();
    } else {
      this.p5.push();

      this.p5.strokeWeight(2);
      this.p5.stroke(this.colour);
      this.p5.fill(this.colour);
      // this.p5.ellipse(this.pos.x, this.pos.y, this.diameter);

      if (this.config["3D"]) {
        this.p5.translate(this.pos);
        this.p5.sphere(this.diameter / 2);
      } else {
        this.p5.ellipse(this.pos.x, this.pos.y, this.diameter);
      }
      this.p5.pop();

      this.p5.push();
      const directionVector = this.velocity.copy().setMag(this.diameter);
      this.p5.strokeWeight(2);
      this.p5.stroke(this.colour);
      this.p5.line(this.pos.x, this.pos.y, this.pos.x + directionVector.x, this.pos.y + directionVector.y);
      this.p5.pop();

      this.colour = this.initialColour;
    }
  };

  collide = (walkers: Walker[]) => {
    walkers.forEach((walker) => {
      if (!this.pos.equals(walker.pos)) {
        if (this.pos.dist(walker.pos) < this.diameter) {
          // this.colour = "#000000";

          //* Taken from here (Remove later)

          // const angle = this.p5.atan2(this.pos.sub(walker.pos));
          // this.p5.fill("#ff0000");

          const spring = 1;
          const collision = Vector.sub(walker.pos, this.pos);

          const angle = this.p5.atan2(collision.x, collision.y);

          const targetX = this.pos.x + this.p5.cos(angle) * (this.diameter / 2);
          const targetY = this.pos.y + this.p5.sin(angle) * (this.diameter / 2);
          const targetVect = this.p5.createVector(targetX, targetY);

          let ax = (targetX - walker.pos.x) * spring;
          let ay = (targetY - walker.pos.y) * spring;

          const accelVect = this.p5.createVector(ax, ay);

          this.pos.sub(accelVect);
          walker.pos.add(accelVect);
        }
      }
    });
  };
}
