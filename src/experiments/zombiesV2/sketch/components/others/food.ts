import { Config } from "../..";
import p5, { Vector, Element } from "p5";
import Human from "../characters/human";
import Zombie from "../characters/zombie";

export default class Food {
  p5;
  config;

  colour;
  size;
  pos;

  foodDeclineRate;
  food;

  humanCaptureDistance;
  survivors;

  constructor(config: Config, x: number | null = null, y: number | null = null) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = this.p5.color("red");
    this.size = 5;

    this.foodDeclineRate = config.foodDeclineRate; // Lower is faster
    this.humanCaptureDistance = 10;

    this.food = this.p5.floor(this.p5.random(100, 300));
    this.survivors = 10;

    // Create darkzone in location if provided or random location if not
    if (x && y) {
      this.pos = this.p5.createVector(x, y);
    } else {
      const borderWidth = 10;

      this.pos = this.p5.createVector(
        this.p5.random(borderWidth, this.p5.width - borderWidth * 2),
        this.p5.random(borderWidth, this.p5.height - borderWidth)
      );
    }
  }

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };
}
