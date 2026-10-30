import { type Config } from "./";
import p5 from "p5";
import Dot from "./dot";

export default class MasterDot {
  p5: p5;
  pos: p5.Vector;
  size: number;
  velocity: p5.Vector;
  connectionDistance: number;
  colour: string;

  constructor(config: Config) {
    this.p5 = config.p5;
    this.connectionDistance = config.connectionDistance;
    this.colour = this.p5.random(config.colours);

    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(config.speed * 2);
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    this.size = 10;
  }

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  update = (velocity: p5.Vector = this.velocity) => {
    this.pos.add(this.velocity);
    this.constrain();
  };

  applyVectors = (dot: Dot) => {
    if (this.pos !== dot.pos) {
      const dist = dot.pos.dist(this.pos);
      if (dist < 100) {
        const attraction = p5.Vector.sub(this.pos, dot.pos);

        attraction.setMag(0.2);

        dot.update(attraction);
      }

      // this.show();
    }
  };

  constrain = () => {
    if (this.pos.x <= 0 || this.pos.x >= this.p5.width) {
      this.velocity.mult(this.p5.createVector(-1, 1));
    } else if (this.pos.y <= 0 || this.pos.y >= this.p5.height) {
      this.velocity.mult(this.p5.createVector(1, -1));
    }
  };
}
