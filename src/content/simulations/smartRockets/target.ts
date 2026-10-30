import { type SimSettings } from ".";
import p5 from "p5";

export default class Target {
  p5: p5;
  pos: p5.Vector;
  size;
  img;

  constructor(simSettings: SimSettings, x: number, y: number, size: number) {
    this.p5 = simSettings.p5;

    this.pos = this.p5.createVector(x, y);
    this.size = size;
    this.img = simSettings.moonImg;
  }

  run = () => {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, this.pos.x, this.pos.y, this.size, this.size);

    // this.p5.ellipse(this.x, this.y, this.size);
  };

  move = (x: number, y: number) => {
    this.pos = this.p5.createVector(x, y);
  };
}
