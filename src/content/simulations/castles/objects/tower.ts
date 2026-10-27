import { type Config } from "../";
import Foundation from "./foundation";

export default class Tower {
  p5;
  config;

  width;
  height;
  minWidth;
  minHeight;

  brickLines;
  lineDensity;

  foundation;

  colour;

  constructor(
    config: Config,
    params: {
      height: number;
      width: number;
      foundation: Foundation;
    },
  ) {
    this.p5 = config.p5;
    this.config = config;

    this.width = params.width;
    this.height = params.height;
    this.minWidth = 20;
    this.minHeight = 50;

    this.brickLines = 10;

    this.lineDensity = 5; // Smaller is better

    this.foundation = params.foundation;

    this.colour = this.p5.color(this.p5.random(config.colours));
    // this.colour.setAlpha(this.p5.random(50, 100));
  }

  show = (xpos: number, ypos: number) => {
    this.p5.push();

    this.p5.translate(xpos, ypos);

    if (this.config.svgMode) {
      this.p5.fill(255);
      this.p5.strokeWeight(1);
    } else {
      this.p5.fill(this.colour);
      this.p5.stroke("#000");
    }

    this.p5.rect(0, 0, this.width, this.height);

    this.drawBricks();
    // this.drawEyes();
    this.drawWindow();
    this.drawRoof();
    this.p5.pop();
  };

  drawRoof = () => {
    const roofOverhang = -5;

    const roofStart = this.p5.createVector(-roofOverhang, this.height);
    const roofEnd = this.p5.createVector(this.width + roofOverhang, this.height);
    const peak = this.p5.createVector(this.width / 2, this.height + this.p5.random(5, 100));

    this.p5.push();

    this.p5.noStroke();
    this.p5.fill("#000");

    this.p5.beginShape();

    this.p5.vertex(roofStart.x, roofStart.y);
    this.p5.vertex(peak.x, peak.y);
    this.p5.vertex(roofEnd.x, roofEnd.y);

    this.p5.endShape();

    this.p5.line(roofStart.x, roofStart.y, roofEnd.x, roofEnd.y);

    this.p5.pop();
  };

  drawEyes = () => {
    if (this.width < 20) return;

    const startx = this.width / 3;
    const starty = this.p5.random(this.height - 50, this.height - 10);

    const endx = this.width;
    // const endy = i;

    // Apply styles
    this.p5.drawingContext.setLineDash([this.p5.random(10), this.p5.random(10), this.p5.random(10), this.p5.random(10)]);
    // this.p5.drawingContext.setLineDash([this.p5.random(10), this.p5.random(10), this.p5.random(10)]);
    this.p5.strokeWeight(this.p5.random(5));

    this.p5.line(startx, starty, endx, starty);
  };

  drawBricks = () => {
    if (this.width < 20) return;
    this.p5.push();

    // for (let i = 0 + this.height / this.brickLines / 2; i < this.height; i += this.height / this.brickLines) {
    for (let i = 0; i < this.height; i += this.lineDensity) {
      const startx = (this.width / 3) * 2;
      const starty = i;

      const endx = this.width;
      const endy = i;

      // Apply styles
      this.p5.drawingContext.setLineDash([this.p5.random(10), this.p5.random(10), this.p5.random(10), this.p5.random(10)]);
      this.p5.strokeWeight(this.p5.random(3));

      this.p5.line(startx, starty, endx, endy);
    }
    this.p5.pop();
  };

  drawWindow = () => {
    this.p5.push();

    const width = this.p5.random(5, this.width / 8);
    const height = this.p5.random(10, this.height / 2);

    const xpos = this.p5.random(5, this.width / 2);
    const ypos = this.p5.random(5, this.height - height);

    this.p5.drawingContext.setLineDash([1, 1]);
    this.p5.fill(0);
    this.p5.rect(xpos, ypos, width, height);

    this.p5.pop();
  };

  update = () => {};
}
