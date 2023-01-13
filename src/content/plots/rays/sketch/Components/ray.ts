import { Config } from "..";
import Boundry from "./boundry";
import { Vector, Color } from "p5";

export default class Ray {
  p5;
  pos;
  dir;
  colour;

  constructor(config: Config, pos: Vector, angle: number) {
    this.p5 = config.p5;

    this.pos = pos;
    this.dir = Vector.fromAngle(angle);

    // this.colour = this.p5.random(config.colours) as Color;
    this.colour = this.p5.color(this.p5.random(config.colours));
    this.colour.setAlpha(50);
  }

  // Show the ray
  show = (length = 1000) => {
    this.p5.stroke(this.colour);

    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.line(0, 0, this.dir.x * length, this.dir.y * length);
    this.p5.pop();
  };

  // * Line-line intersection
  // https://www.wikiwand.com/en/Line%E2%80%93line_intersection
  // Casts a ray and Returns the point of the intersection or `false` if there is no intersection
  // cast = (boundry: Boundry): [Vector, string] | Vector | false => {
  cast = (boundry: Boundry): any => {
    const x1 = boundry.startpoint.x;
    const y1 = boundry.startpoint.y;
    const x2 = boundry.endpoint.x;
    const y2 = boundry.endpoint.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
      return false;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const point = this.p5.createVector();
      point.x = x1 + t * (x2 - x1);
      point.y = y1 + t * (y2 - y1);

      // return [point, this.colour];
      return {
        point: point,
        colour: this.colour,
      };
    } else return false;
  };
}
