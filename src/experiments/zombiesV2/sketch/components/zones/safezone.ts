import { Config } from "../..";
import p5, { Vector, Element } from "p5";
import Human from "../characters/human";

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

  flag;

  constructor(config: Config, x: number | undefined = undefined, y: number | undefined = undefined) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = this.p5.color(161, 184, 66);
    this.size = 50;

    this.foodDeclineRate = config.foodDeclineRate; // Lower is faster
    // this.food = this.p5.floor(this.p5.random(100, 300));
    this.food = 10;

    this.survivors = 10;
    this.humanCaptureDistance = 10;

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

  update = (humans: Human[]) => {
    if (this.p5.frameCount % this.foodDeclineRate === 0) {
      // this.food -= this.survivors;
      this.sendOutHumans(humans);
    }

    this.checkForSurvivor(humans);
  };

  checkForSurvivor = (humans: Human[]) => {
    humans.forEach((human) => {
      // if (human.pos.dist(this.pos) < this.size / 2 + human.size / 2) {
      if (human.pos.dist(this.pos) < this.size / 2) {
        this.food += human.food;
        human.food = 0;
        // this.survivors += 1;
        // humans.splice(humans.indexOf(human), 1);
      }

      if (human.hasFood && human.pos.dist(this.pos) < 100) {
        human.acceleration = Vector.sub(this.pos, human.pos);
      }

      // this.p5.push()
      // this.p5.translate(this.pos.x, this.pos.y);
    });
  };

  sendOutHumans = (humans: Human[]) => {
    if (!this.flag) {
      this.flag = true;

      for (let angle = 0; angle < 360; angle += 360 / 20) {
        const spawnLocation = Vector.fromAngle(angle);
        spawnLocation.setMag(50);

        // humans.push(new Human(this.config, this.pos.x , this.pos.y + spawnLocation.y));
        humans.push(new Human(this.config, this.pos.x, this.pos.y));
      }
    }
    // if (this.food < 10) {
    //   for (let i = 0; i < this.survivors; i++) {
    //     const spawnLocation = Vector.random2D();
    //     vector.setMag(10);
    //     humans.push(new Human(this.config, this.pos.x + vector.x, this.pos.y + vector.y));
    //   }

    //   this.survivors -= this.survivors;
    // } else if (this.food < 20) {
    //   humans.push(new Human(this.config, this.pos.x + 50, this.pos.y + 50));
    //   this.survivors -= 1;
    // }
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
    this.p5.text("Safezone", this.pos.x, this.pos.y - this.size / 2 - 10);
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

  showSurvivors = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.textAlign(this.p5.LEFT);
    this.p5.text(`Survivors: ${this.survivors}`, this.pos.x + this.size / 2 - 5, this.pos.y - this.size / 2 + 5);
    this.p5.push();
  };
}
