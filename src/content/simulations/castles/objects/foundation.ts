import { type Config, type Objects } from "..";

export default class Foundation {
  p5;

  margin;

  start;
  end;
  y;

  constructor(config: Config, objects: Objects) {
    this.p5 = config.p5;

    this.margin = 10;

    this.y = 10;
    this.start = this.margin; // Start x coord
    this.end = this.p5.width - this.margin; // End x coord
  }

  show = () => {
    this.p5.push();

    this.p5.stroke(255);
    this.p5.noFill();

    this.p5.line(this.start, this.y, this.end, this.y);

    this.p5.pop();
  };
}
