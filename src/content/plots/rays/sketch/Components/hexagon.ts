import { Config } from "../index";
import { Vector } from "p5";

export default class Hexagon {
  p5;
  pos;
  config;

  colour;

  size;
  edges: Array<[number, number]> = [];

  constructor(config: Config, size: number) {
    this.p5 = config.p5;
    this.config = config;

    this.size = size;
    this.colour = this.p5.color(this.p5.random(config.colours));

    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));

    // Figure out where the edges of the hexagon lie and save them to edges array for later
    for (let a = 0; a < this.p5.TAU; a += this.p5.TAU / 6) {
      this.edges.push([this.pos.x + size * this.p5.cos(a), this.pos.y + size * this.p5.sin(a)]);
    }
  }

  show = () => {
    this.drawHexagon();
    console;
  };

  drawHexagon = () => {
    this.p5.push();
    this.p5.beginShape();
    this.p5.stroke(this.colour);

    this.edges.forEach((edge) => {
      this.p5.vertex(edge[0], edge[1]);
    });
    this.p5.endShape(this.p5.CLOSE);
    this.p5.pop();
  };

  update = () => {};
}
