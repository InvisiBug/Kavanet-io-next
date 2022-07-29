import { Config } from "../..";
import p5, { Color, Vector } from "p5";

export default class TrailMap {
  p5;
  config;

  colour;
  points: Point[];

  //////////////////////
  // Options
  fadeRate = 0.05;
  dotSize = 2;

  constructor(config: Config, colour: Color) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = colour;
    this.points = [];
  }

  update = () => {
    for (let i = this.points.length - 1; i >= 0; i--) {
      this.points[i].val -= this.fadeRate;
      if (this.points[i].val < 0) {
        this.points.splice(i, 1);
      }
    }
    // if (this.points.length > 1000) {
    //   this.points.splice(0, 1);
    // }
  };

  show = () => {
    this.points.forEach((point) => {
      point.show();
    });
  };

  addPoint = (pos: Vector) => {
    this.points.push(new Point(this.p5, this.dotSize, pos.x, pos.y, 255, this.colour));
  };

  createTestPoints = (num: number) => {
    for (let i = 0; i < num; i++) {
      this.points.push(
        new Point(this.p5, this.dotSize, this.p5.random(this.p5.width), this.p5.random(this.p5.height), this.p5.random(255), this.colour)
      );
    }
  };

  getConcentrationAtLocation = (pos: Vector, size: number) => {
    let totalConcentration = 0;

    this.points.forEach((point) => {
      if (pos.dist(point.pos) < size / 2) {
        totalConcentration += point.val;
        // totalConcentration += 1;
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
  dotSize;

  constructor(p5: p5, dotSize: number, x: number, y: number, val: number = 255, colour: Color) {
    this.p5 = p5;
    this.dotSize = dotSize;

    this.pos = p5.createVector(x, y);
    this.val = val;
    this.colour = colour;
  }

  show = () => {
    this.p5.noStroke();

    this.colour.setAlpha(this.val);
    this.p5.fill(this.colour);
    this.p5.ellipse(this.pos.x, this.pos.y, this.dotSize);
  };
}
