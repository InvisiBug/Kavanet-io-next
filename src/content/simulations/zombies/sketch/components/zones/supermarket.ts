import { Config } from "../..";
import p5, { Vector, Element } from "p5";
import Human from "../characters/human";

export default class Supermarket {
  p5;
  config;

  colour;
  size;
  pos;

  foodDeclineRate;
  food;

  humanCaptureDistance = 100;

  flag;

  constructor(config: Config, x: number | undefined = undefined, y: number | undefined = undefined) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = this.p5.color(161, 50, 66);
    this.size = 50;

    this.foodDeclineRate = config.foodDeclineRate; // Lower is faster
    // this.food = this.p5.floor(this.p5.random(100, 300));
    this.food = 100;

    this.flag = false;

    // Create safezone in location if provided or random location if not
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

  update = ({ humans, supermarkets }: { humans: Human[]; supermarkets: Supermarket[] }) => {
    // if (this.p5.frameCount % this.foodDeclineRate === 0) {
    //   // this.food -= this.survivors;
    //   this.sendOutHumans(humans);
    // }

    this.checkForSurvivor(humans);

    for (let i = supermarkets.length - 1; i >= 0; i--) {
      supermarkets[i].food > 0;
      if (supermarkets[i].food < 0) {
        supermarkets.splice(i, 1);
      }
    }
  };

  checkForSurvivor = (humans: Human[]) => {
    humans.forEach((human) => {
      // if (human.pos.dist(this.pos) < this.size / 2 + human.size / 2) {
      if (human.pos.dist(this.pos) < this.size / 2) {
        this.food -= 1;
        human.food += 1;
      }

      if (!human.hasFood && human.pos.dist(this.pos) < 100) {
        human.acceleration = Vector.sub(this.pos, human.pos);
      }
    });
  };

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);

    if (this.config.showFood) this.showFood();
    // this.showSurvivors();
    // this.showName();
  };

  showName = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.textAlign(this.p5.CENTER);
    this.p5.text("Supermarket", this.pos.x, this.pos.y - this.size / 2 - 10);
    this.p5.push();
  };

  showFood = () => {
    this.p5.push();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.textAlign(this.p5.LEFT);
    this.p5.text(`Food: ${this.food}`, this.pos.x + this.size / 2 + 5, this.pos.y - this.size / 2 + 20);
    this.p5.pop();
  };
}
