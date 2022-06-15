import { Config } from "../..";
import p5, { Vector, Element } from "p5";
import Human from "../characters/human";
import Zombie from "../characters/zombie";

export default class Safezone {
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

    this.colour = this.p5.color("#A66A2E");
    this.size = 50;

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

  update = (zombies: Zombie[]) => {
    if (this.p5.frameCount % 60 === 0) {
      this.food -= this.survivors;
      // this.sendOutZombies(zombies);
    }
  };

  sendOutZombies = (zombies: Zombie[]) => {
    zombies.push(new Zombie(this.config, this.pos.x + 50, this.pos.y + 50));
  };

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);

    this.showFoodLevel();
    this.showSurvivorNumber();
    this.showName();
  };

  showName = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.textAlign(this.p5.CENTER);
    this.p5.text("Darkzone", this.pos.x, this.pos.y - this.size / 2 - 10);
    this.p5.push();
  };

  showFoodLevel = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.textAlign(this.p5.LEFT);
    this.p5.text(`Food: ${this.food}`, this.pos.x + this.size / 2 + 5, this.pos.y - this.size / 2 + 20);
    this.p5.push();
  };

  showSurvivorNumber = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.textAlign(this.p5.LEFT);
    this.p5.text(`Survivors: ${this.survivors}`, this.pos.x + this.size / 2 - 5, this.pos.y - this.size / 2 + 5);
    this.p5.push();
  };
}
