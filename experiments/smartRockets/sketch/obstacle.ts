import { SimSettings } from "./index";
import p5 from "p5";

export default class Obstacle {
  simSettings;
  p5;
  pos;
  size;

  constructor(simSettings: SimSettings) {
    this.simSettings = simSettings;
    this.p5 = simSettings.p5;
    this.pos = this.p5.createVector(this.p5.random(0, this.p5.width), this.p5.random(this.p5.height / 4, this.p5.height));
    this.size = 50;
  }

  show = () => {
    this.p5.image(this.simSettings.obstacleImg, this.pos.x, this.pos.y, this.size, this.size);
  };

  checkCrash = (rocketPos: p5.Vector) => {
    const distance = this.p5.dist(this.pos.x, this.pos.y, rocketPos.x, rocketPos.y);
    if (distance < this.size) {
      console.log("crash");
    }
  };
}
