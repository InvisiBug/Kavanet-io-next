import { Vector } from "p5";
import { Config } from ".";
import Walker from "./walker";
import Point from "./point";

export default class Points {
  config;
  p5;

  acceleration;
  colour;
  diameter;

  points: Point[][];

  constructor(config: Config) {
    this.config = config;
    this.p5 = config.p5;

    this.points = [];

    this.acceleration = this.p5.createVector(0, 0);
    this.colour = this.p5.random(config.colours);
    this.diameter = 5;

    this.generateNewMap();
  }

  generateNewMap = () => {
    for (let x = 0; x < this.config.xpoints; x++) {
      this.points[x] = [];
      for (let y = 0; y < this.config.ypoints; y++) {
        const u = x / (this.config.xpoints - 1);
        const v = y / (this.config.ypoints - 1);

        const xpos = this.p5.lerp(this.config.margin, this.p5.width - this.config.margin, u);
        const ypos = this.p5.lerp(this.config.margin, this.p5.height - this.config.margin, v);
        // console.log(xpos, ypos);

        this.points[x][y] = new Point(this.config, this.p5.createVector(xpos, ypos));
      }
    }
  };

  show = () => {
    for (let x = 0; x < this.config.xpoints; x++) {
      for (let y = 0; y < this.config.ypoints; y++) {
        this.p5.noStroke();
        if (x === 1 && y === 10) {
          this.p5.fill(0, 0, 0);
        } else {
          this.p5.fill(this.points[x][y].colour);
        }
        this.p5.ellipse(this.points[x][y].pos.x, this.points[x][y].pos.y, 10);
        // this.points[x][y].show();
      }
    }
    // this.p5.noLoop();

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

  update = (walkers: Walker[]) => {
    for (let x = 0; x < this.config.xpoints; x++) {
      for (let y = 0; y < this.config.ypoints; y++) {
        this.points[x][y].avoid(walkers);
        this.points[x][y].return();
      }
    }
  };
}
