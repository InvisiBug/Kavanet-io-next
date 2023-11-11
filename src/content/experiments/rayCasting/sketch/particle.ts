import { Config } from "./index";
import { Vector } from "p5";
import Ray from "./ray";
import Boundry from "./boundry";

export default class Particle {
  p5;
  pos;
  config;
  totalRays;

  xoffset;
  yoffset;

  movement;

  rays: Array<Ray> = [];

  constructor(config: Config) {
    this.p5 = config.p5;
    this.config = config;
    this.totalRays = 100;

    this.xoffset = this.p5.random(100);
    this.yoffset = this.p5.random(100);

    this.movement = 0.0005;

    const margin = 10;

    this.pos = this.p5.createVector(this.p5.random(margin, this.p5.width - margin), this.p5.random(margin, this.p5.height - margin));

    for (let angle = 0; angle < 360; angle += 360 / this.totalRays) {
      this.rays.push(new Ray(config, this.pos, this.p5.radians(angle)));
    }
  }

  show = () => {
    // this.p5.fill(255);
    // this.p5.ellipse(this.pos.x, this.pos.y, 16);
    // this.rays.forEach((ray) => {
    //   ray.show();
    // });
  };

  look = (boundries: Array<Boundry>) => {
    this.rays.forEach((ray) => {
      let closest: any = null;
      let record = Infinity;

      boundries.forEach((boundry) => {
        const point = ray.cast(boundry);

        if (point instanceof Vector) {
          const d = Vector.dist(this.pos, point);

          if (d < record) {
            record = d;
            closest = point;
          }
        }
      });

      if (closest instanceof Vector) {
        this.p5.stroke(255, 50);

        this.p5.ellipse(closest.x, closest.y, 3);

        this.p5.line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    });
  };

  // oldLook = (boundry: Boundry) => {
  //   this.rays.forEach((ray) => {
  //     const point = ray.cast(boundry);
  //     if (point instanceof Vector) {
  //       this.p5.line(this.pos.x, this.pos.y, point.x, point.y);
  //     }
  //   });
  // };

  // update = (x: number, y: number) => {
  update = () => {
    const margin = -500;
    const xpos = this.p5.map(this.p5.noise(this.xoffset), 0, 1, margin, this.p5.width - margin);
    const ypos = this.p5.map(this.p5.noise(this.yoffset), 0, 1, margin, this.p5.height - margin);

    this.pos.set(xpos, ypos);

    // this.pos.set(this.pos.x + this.p5.noise(this.xoffset), this.p5.noise(this.yoffset) * this.p5.height);
    this.xoffset += this.movement;
    this.yoffset += this.movement;
  };
}
