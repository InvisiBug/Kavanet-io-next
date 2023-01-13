import { Config } from ".";
import Gem from "./gem";

export default class Wall {
  p5;
  space;
  x;
  width;
  speed;
  highlight = false;
  colour: number;

  constructor(config: Config, pos: number, width: number, space?: number) {
    this.p5 = config.p5;
    this.speed = config.speed;
    this.colour = config.availableColours[Math.floor(config.p5.random(0, config.availableColours.length))];

    if (space) {
      this.space = space;
    } else {
      this.space = this.p5.random(100, this.p5.height / 2);
    }
    this.width = width;
    this.x = pos;
  }

  show = () => {
    this.p5.noStroke();
    this.highlight ? this.p5.fill(0, 255, 0) : this.p5.fill(this.colour);
    this.p5.rect(this.x, -10, this.width, this.p5.height / 2 - this.space + 10, 10 /* Rounding */); // Top wall
    this.p5.rect(this.x, this.p5.height / 2 + this.space, this.width, this.p5.height, 10); // Bottom wall

    this.getBottom();
  };

  update = () => {
    this.x -= this.speed;
    // this.checkIfOffScreen();
  };

  //* Return the vectors for the start and end of the bottom line
  getBottom = () => {
    const startPoint = this.p5.createVector(this.x, this.p5.height / 2 - this.space);
    const endPoint = this.p5.createVector(this.x + this.width, this.p5.height / 2 - this.space);
    // console.log(this.p5.height / 2 - this.space);

    // this.p5.stroke(255);
    // this.p5.strokeWeight(2);
    // this.p5.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    // const startPoint = p5.createVector()

    return { startPoint, endPoint };
  };

  checkIfOffScreen = () => {
    return this.x <= -this.width;
  };

  hits = (playerGem: Gem) => {
    if (playerGem.pos.y < this.p5.height / 2 - this.space || playerGem.pos.y > this.p5.height / 2 + this.space) {
      if (playerGem.pos.x > this.x && playerGem.pos.x < this.x + this.width) {
        this.highlight = true;
        return true;
      }
    }
  };
}
