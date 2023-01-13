import { Config } from "../..";
import p5, { Vector, Element } from "p5";

export default class Zombie {
  p5;
  size;
  speed;
  colour;

  acceleration;
  velocity;
  pos;

  sliderGroup: Element[] = [];

  constructor(config: Config) {
    this.p5 = config.p5;
    this.colour = this.p5.color(48, 135, 180);
    this.size = 20;
    this.speed = config.speed;

    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = Vector.random2D();
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));

    this.velocity.setMag(config.speed);
  }

  create = () => {
    for (var i = 0; i < 3; i++) {
      const xPos = 10;
      const startingYPos = 100;
      const text: p5.Element = this.p5.createP();

      //* Speed
      if (i === 0) {
        this.sliderGroup[i] = this.p5.createSlider(0, 2, this.speed + 0.2, 0.1);
        text.html("Zombie zpeed");
      } else if (i === 1) {
        this.sliderGroup[i] = this.p5.createSlider(0, 2, this.speed + 0.1, 0.1);
        text.html("Human speed");
      } else if (i === 2) {
        this.sliderGroup[i] = this.p5.createSlider(0, 2, this.speed - 0.1, 0.1);
        text.html("Hunter speed");
      } else {
        this.sliderGroup[i] = this.p5.createSlider(0, 100, 10);
        text.html("test");
      }

      const h = this.p5.map(i, 0, 6, 5, 200);

      // if (i === 1) {
      text.position(xPos + 100, startingYPos + h - 15);
      text.style("color", "white");

      this.sliderGroup[i].position(xPos, startingYPos + h);
      this.sliderGroup[i].style("width", "80px");
      // }
    }
  };

  getVals = () => {
    return {
      zombieSpeed: this.sliderGroup[0].value(),
      humanSpeed: this.sliderGroup[1].value(),
      hunterSpeed: this.sliderGroup[2].value(),
    };
  };
}
