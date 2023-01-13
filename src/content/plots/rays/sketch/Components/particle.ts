import { Config } from "../index";
import { Vector } from "p5";
import Ray from "./ray";
import Boundry from "./boundry";

export default class Particle {
  p5;
  pos;
  config;
  totalRays;
  noisePos;

  xoff;
  yoff;

  movement;

  rays: Array<Ray> = [];

  constructor(config: Config) {
    this.p5 = config.p5;
    this.config = config;

    // Used for movement
    this.movement = 0.002;
    this.noisePos = this.p5.random(90);
    this.xoff = this.p5.random(0, 1000);
    this.yoff = this.p5.random(0, 1000);
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));

    // Create rays
    this.totalRays = 20;
    for (let angle = 0; angle < 360; angle += 360 / this.totalRays) {
      this.rays.push(new Ray(config, this.pos, this.p5.radians(angle)));
    }
  }

  show = () => {
    // this.rays.forEach((ray) => {
    //   ray.show();
    // });
    //* Uncomment to show an ellipse at the particle position
    // this.p5.fill(255);
    // this.p5.ellipse(this.pos.x, this.pos.y, 50);
  };

  // Looks along the infinite length of the ray
  // and draws a line if there is an intersection to the intersection point
  look = (boundries: Array<Boundry>) => {
    this.rays.forEach((ray) => {
      let closest: any = null;
      let colour: string | null = null;
      let record = Infinity;

      boundries.forEach((boundry) => {
        const { point, colour: rayColour } = ray.cast(boundry);
        // console.log(point);

        if (point instanceof Vector) {
          const d = Vector.dist(this.pos, point);

          if (d < record) {
            record = d;
            closest = point;
            colour = rayColour;
          }
        }
      });

      if (closest instanceof Vector) {
        this.p5.stroke(255, 50);

        if (colour) this.p5.stroke(colour);

        this.p5.ellipse(closest.x, closest.y, 3);

        this.p5.line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    });
  };

  update = () => {
    this.pos.set(this.p5.noise(this.xoff) * this.p5.width, this.p5.noise(this.yoff) * this.p5.height);
    this.xoff += this.movement;
    this.yoff += this.movement;
  };
}
