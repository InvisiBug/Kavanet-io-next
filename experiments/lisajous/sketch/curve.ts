import p5, { Vector } from "p5";
import { SimSettings } from "./";

export default class Curve {
  p5;
  paths: Vector[];
  current: Vector;

  constructor(config: SimSettings) {
    this.p5 = config.p5;
    this.paths = [];
    this.current = this.p5.createVector(0, 0);
  }

  setX = (x: number) => {
    this.current.x = x;
  };

  setY = (y: number) => {
    this.current.y = y;
  };

  addPoint = () => {
    this.paths.push(this.current);
  };

  show = () => {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.noFill();

    this.p5.beginShape();
    this.paths.forEach((path) => {
      this.p5.vertex(path.x, path.y);
    });
    this.p5.endShape();

    this.p5.strokeWeight(8);
    this.p5.point(this.current.x, this.current.y);
    this.current = this.p5.createVector(0, 0);
  };
}
