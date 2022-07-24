import { Config } from "../..";
import p5, { Color, Vector } from "p5";

export default class TestMap {
  p5;
  config;

  colour;

  points: Point[];

  constructor(config: Config, colour: Color) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = colour;
    this.points = [];
  }

  update = () => {
    for (let i = this.points.length - 1; i >= 0; i--) {
      this.points[i].val -= 1;
      if (this.points[i].val < 0) {
        this.points.splice(i, 1);
      }
    }
  };

  show = () => {
    this.points.forEach((point) => {
      point.show();
    });
  };

  addPoint = (x: number, y: number) => {
    this.points.push(new Point(this.p5, x, y, 255, this.colour));
  };

  createTestPoints = (num: number) => {
    for (let i = 0; i < num; i++) {
      this.points.push(new Point(this.p5, this.p5.random(this.p5.width), this.p5.random(this.p5.height), this.p5.random(255), this.colour));
    }
  };

  getConcentrationAtLocation = (pos: Vector, size: number) => {
    let totalConcentration = 0;

    this.points.forEach((point) => {
      if (pos.dist(point.pos) < size / 2) {
        totalConcentration++;
      }
    });

    return totalConcentration;
  };
}

class Point {
  p5;
  pos;
  val;
  colour;

  constructor(p5: p5, x: number, y: number, val: number = 255, colour: Color) {
    this.p5 = p5;

    this.pos = p5.createVector(x, y);
    this.val = val;
    this.colour = colour;
  }

  show = () => {
    this.p5.noStroke();

    this.colour.setAlpha(this.val);
    this.p5.fill(this.colour);
    this.p5.ellipse(this.pos.x, this.pos.y, 10);
  };
}
