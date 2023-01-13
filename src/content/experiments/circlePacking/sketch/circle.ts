import { Config } from ".";

export default class Circle {
  p5;
  x;
  y;
  radius;
  growing;
  thickness;

  colour;

  constructor(config: Config, x: number, y: number) {
    this.p5 = config.p5;

    this.x = x;
    this.y = y;

    this.radius = 1;
    this.thickness = 10;

    this.growing = true;

    this.colour = this.p5.random(config.colours);
  }

  update = () => {
    if (this.growing) {
      if (!this.touchingEdge()) {
        this.radius += 1;
      }
    }
  };

  touchingEdge = () =>
    this.x + this.radius + this.thickness > this.p5.width ||
    this.x - this.radius - this.thickness < 0 ||
    this.y + this.radius + this.thickness > this.p5.height ||
    this.y - this.radius - this.thickness < 0;

  show = () => {
    this.p5.noFill();
    this.p5.strokeWeight(this.thickness);
    this.p5.stroke(this.colour);

    this.p5.ellipse(this.x, this.y, this.radius * 2);
  };
}
