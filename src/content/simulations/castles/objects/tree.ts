import p5 from "p5";
import { type Config, type Objects } from "../";

export default class Tree {
  config;
  p5;
  objects;

  margin;

  start;
  end;
  y;
  pos;

  height;

  constructor(config: Config, objects: Objects, x: number, y: number) {
    this.p5 = config.p5;
    this.config = config;
    this.objects = objects;

    this.margin = 10;

    this.y = 10;
    this.start = this.margin; // Start x coord
    this.end = this.p5.width - this.margin; // End x coord

    this.pos = this.p5.createVector(x, y);

    this.height = this.p5.random(10, 100);
  }

  show = () => {
    this.p5.push();

    this.p5.translate(this.pos.x, this.pos.y);

    this.p5.strokeWeight(5);
    this.p5.line(0, 0, 0, this.height);

    for (let i = this.height; i > 0; i -= 10) {
      if (i > this.height / 2) {
        this.p5.strokeWeight(2);

        const length = this.p5.random(5, 15);

        if (this.p5.random() < 0.8) {
          this.p5.line(0, i, length, i - length);
        }

        if (this.p5.random() < 0.8) {
          this.p5.line(0, i, -length, i - length);
        }
      }
    }

    this.p5.pop();
  };
}
