import { Config } from ".";
import p5, { Vector } from "p5";

export default class Dot {
  p5;
  pos;
  size;
  velocity;
  connectionDistance;
  colour;

  constructor(config: Config) {
    this.p5 = config.p5;
    this.connectionDistance = config.connectionDistance;
    this.colour = this.p5.random(config.colours);

    this.velocity = Vector.random2D();
    this.velocity.setMag(config.speed);
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    this.size = 5;
  }

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  update = () => {
    this.pos.add(this.velocity);
    this.constrain();
  };

  connect = (dot: Dot[]) => {
    dot.forEach((dot: Dot) => {
      if (this.pos !== dot.pos) {
        const dist = dot.pos.dist(this.pos);

        if (dist < this.connectionDistance) {
          this.p5.push();
          // this.p5.blendMode(this.p5.LIGHTEST);

          // const val = this.p5.random(1);
          // let colour: p5.Color;

          // if (val < 0.01) {
          //   colour = this.p5.color(this.colour);
          // } else {
          //   colour = this.p5.color(dot.colour);
          // }

          const colour = this.p5.color(this.colour);

          this.p5.strokeWeight(1);

          colour.setAlpha(this.p5.map(dist, this.connectionDistance, 0, 0, 100));
          this.p5.stroke(colour);

          // this.p5.stroke(255, this.p5.map(dist, this.connectionDistance, 0, 0, 100));

          // this.p5.stroke(255, this.p5.map(dist, this.connectionDistance, 0, 0, 100));
          this.p5.line(this.pos.x, this.pos.y, dot.pos.x, dot.pos.y);
          this.p5.pop();
        }
        // this.show();
      }
    });
  };

  constrain = () => {
    if (this.pos.x <= 0 || this.pos.x >= this.p5.width) {
      this.velocity.mult(this.p5.createVector(-1, 1));
    } else if (this.pos.y <= 0 || this.pos.y >= this.p5.height) {
      this.velocity.mult(this.p5.createVector(1, -1));
    }
  };
}
