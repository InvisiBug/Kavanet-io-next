import { SimSettings } from ".";

export default class Target {
  p5;
  x;
  y;
  size;
  img;

  constructor(simSettings: SimSettings, x: number, y: number, size: number) {
    this.p5 = simSettings.p5;
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = simSettings.moonImg;
  }

  run = () => {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, this.x, this.y, this.size, this.size);
    // this.p5.ellipse(this.x, this.y, this.size);
  };

  move = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };
}
