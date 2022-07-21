import { Vector } from "p5";
import { Config } from ".";
import Walker from "./walker";

type Point = {
  pos: Vector;
  colour: any;
};

export default class Points {
  config;
  p5;

  acceleration;
  colour;
  diameter;

  xpoints;
  ypoints;

  points: Point[][];

  constructor(config: Config, x: number, y: number) {
    this.config = config;
    this.p5 = config.p5;

    this.xpoints = x;
    this.ypoints = y;

    this.points = [];

    this.acceleration = this.p5.createVector(0, 0);
    this.colour = this.p5.random(config.colours);
    this.diameter = 5;

    this.generateNewMap();
  }

  generateNewMap = () => {
    // for (let y = 0; y < this.ypoints; y++) {
    //   this.points[y] = [];
    //   for (let x = 0; x < this.xpoints; x++) {
    //     const u = x / (this.config.xpoints - 1);
    //     const v = y / (this.config.ypoints - 1);
    //     const xpos = this.p5.lerp(this.config.margin, this.p5.width - this.config.margin, u);
    //     const ypos = this.p5.lerp(this.config.margin, this.p5.height - this.config.margin, v);
    //     // this.points[y][x] = this.p5.createVector(xpos, ypos);
    //     this.p5.noStroke();
    //     this.p5.fill(255);
    //     this.p5.ellipse(xpos, ypos, 10);
    //   }
    // }
  };

  update = () => {};

  show = () => {
    for (let x = 0; x < this.config.xpoints; x++) {
      this.points[x] = [];
      for (let y = 0; y < this.config.ypoints; y++) {
        const u = x / (this.config.xpoints - 1);
        const v = y / (this.config.ypoints - 1);

        const xpos = this.p5.lerp(this.config.margin, this.p5.width - this.config.margin, u);
        const ypos = this.p5.lerp(this.config.margin, this.p5.height - this.config.margin, v);

        this.points[x][y].pos = this.p5.createVector(xpos, ypos);

        this.p5.noStroke();
        if (x === 4 && y === 5) {
          this.p5.fill(255, 255, 0);
        } else {
          this.p5.fill(this.colour);
        }
        this.p5.ellipse(this.points[x][y].pos.x, this.points[x][y].pos.y, 10);
      }
    }

    // this.points.forEach((point) => {
    //   this.p5.noStroke();
    //   this.p5.fill(255);
    //   this.p5.ellipse(point.x, point.y, 10);
    // });

    // for (let y = 0; y < this.ypoints; y++) {
    //   for (let x = 0; x < this.xpoints; x++) {
    //     this.p5.noStroke();
    //     this.p5.fill(255);
    //     this.p5.ellipse(this.points[x][y].x, this.points[x][y].y, 10);
    //   }
    // }
  };
}
