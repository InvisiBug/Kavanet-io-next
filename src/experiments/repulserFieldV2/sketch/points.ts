import { Vector } from "p5";
import { Config } from ".";
import Walker from "./walker";
import Point from "./point";

export default class Points {
  config;
  p5;

  colour;
  diameter;

  // points: Point[][];
  points: Point[];

  constructor(config: Config) {
    this.config = config;
    this.p5 = config.p5;

    this.points = [];

    this.colour = this.p5.random(config.colours);
    this.diameter = 5;

    this.generatePoints();
  }

  //* Generate a grid of points
  //* But have one long points array, not an x,y 2D array
  generatePoints = () => {
    for (let x = 0; x < this.config.xpoints; x++) {
      for (let y = 0; y < this.config.ypoints; y++) {
        const u = x / (this.config.xpoints - 1);
        const v = y / (this.config.ypoints - 1);

        const xpos = this.p5.lerp(this.config.margin, this.p5.width - this.config.margin, u);
        const ypos = this.p5.lerp(this.config.margin, this.p5.height - this.config.margin, v);

        this.points.push(new Point(this.config, this.p5.createVector(xpos, ypos)));
      }
    }
  };

  show = () => {
    this.points.forEach((point) => {
      point.show();
    });
  };

  update = (walkers: Walker[]) => {
    this.points.forEach((point) => {
      point.applyBehaviors(walkers);
      point.update();
    });

    this.p5.mouseDragged = () => {
      this.points.forEach((point) => {
        point.target = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
      });
    };

    this.p5.mouseReleased = () => {
      this.points.forEach((point) => {
        point.target = point.pos;
      });
    };
  };
}
