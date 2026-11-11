import { type Config } from "./";
import p5 from "p5";
import Dot from "./dot";

export default class MasterDot {
  config: Config;
  p5: p5;
  pos: p5.Vector;
  size: number;
  velocity: p5.Vector;
  rotation: number;
  rotationSpeed: number;
  connectionDistance: number;
  colour: string;
  img: p5.Image;

  constructor(config: Config) {
    this.config = config;
    this.p5 = config.p5;
    this.connectionDistance = config.connectionDistance;
    this.colour = this.p5.random(config.colours);

    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(config.speed * 2);
    this.rotation = this.p5.random(this.p5.TWO_PI);
    this.rotationSpeed = this.p5.random(-0.05, 0.05);
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    this.size = 10;
    this.img = config.blackHoleImg;
  }

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);

    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.rotation);
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, 0, 0, this.config.imageSize, this.config.imageSize);
    this.p5.pop();
  };

  update = (velocity: p5.Vector = this.velocity) => {
    this.pos.add(this.velocity);
    this.rotation += this.rotationSpeed;
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
