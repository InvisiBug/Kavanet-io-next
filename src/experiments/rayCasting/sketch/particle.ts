import { Config } from "./index";
import { Vector } from "p5";
import Ray from "./ray";
import Boundry from "./boundry";

export default class Particle {
  p5;
  pos;
  config;
  totalRays;

  rays: Array<Ray> = [];

  constructor(config: Config) {
    this.p5 = config.p5;
    this.config = config;
    this.totalRays = 100;

    this.pos = this.p5.createVector(this.p5.random(this.p5.width / 2), this.p5.random(this.p5.height / 2));

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

  update = (x: number, y: number) => {
    this.pos.set(x, y);
  };
}
