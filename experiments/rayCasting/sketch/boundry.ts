import { Config } from "./";

export default class Bountry {
  p5;
  colour;

  startpoint;
  endpoint;

  constructor(config: Config, availableColours: any, x1: number, x2: number, y1: number, y2: number) {
    this.p5 = config.p5;

    this.startpoint = this.p5.createVector(x1, y1);
    this.endpoint = this.p5.createVector(x2, y2);
    this.colour = availableColours[Math.floor(this.p5.random(0, availableColours.length))];
  }

  show = () => {
    this.p5.stroke(this.colour);
    this.p5.strokeWeight(2);
    this.p5.line(this.startpoint.x, this.startpoint.y, this.endpoint.x, this.endpoint.y);
  };
}
