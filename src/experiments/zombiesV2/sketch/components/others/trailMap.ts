import { Config } from "../..";
import { Color } from "p5";

export default class TrailMap {
  p5;
  config;
  trailMap: number[][];

  margin;
  size;

  colour;
  offset;

  xpoints;
  ypoints;

  constructor(config: Config, colour: Color, offset: boolean = false) {
    this.p5 = config.p5;
    this.config = config;
    this.colour = colour;

    this.offset = offset;

    this.trailMap = [];

    this.xpoints = 100;
    this.ypoints = 100;
    this.margin = 0;

    this.size = 2;
  }

  //* Generates a new blank map
  init = () => {
    for (let x = 0; x < this.xpoints; x++) {
      this.trailMap[x] = [];
      for (let y = 0; y < this.ypoints; y++) {
        this.trailMap[x][y] = 0;
        // this.trailMap[x][y] = 100;
        // this.trailMap[x][y] = this.p5.random(0, 255);
        // this.trailMap[x][y] = this.p5.map(this.p5.noise(x, y), 0, 1, 0, 255);
        // this.trailMap[x][y] = 25;
      }
    }
  };

  // Draws the map, scaled up to the canvas size
  show = () => {
    for (let x = 0; x < this.xpoints; x++) {
      for (let y = 0; y < this.ypoints; y++) {
        if (this.trailMap[x][y] > 0) {
          this.p5.noStroke();

          this.colour.setAlpha(this.trailMap[x][y]);
          this.p5.fill(this.colour);

          const u = x / (this.xpoints - 1);
          const v = y / (this.ypoints - 1);
          const xpos = this.p5.lerp(this.margin, this.p5.width - this.margin, u);
          const ypos = this.p5.lerp(this.margin, this.p5.height - this.margin, v);

          this.p5.ellipse(xpos, ypos, this.size);
        }
      }
    }
  };

  fade = () => {
    const fadeAmount = 1.5;

    for (let y = 0; y < this.ypoints; y++) {
      for (let x = 0; x < this.xpoints; x++) {
        if (this.trailMap[x][y] > 0) {
          this.trailMap[x][y] -= fadeAmount;
        } else if (this.trailMap[x][y] < 0) {
          this.trailMap[x][y] = 0;
        }
      }
    }
  };

  followScent = (x: number, y: number) => {
    let xpos = this.p5.floor(x / this.xpoints);
    let ypos = this.p5.floor(y / this.ypoints);

    const directions = [this.p5.createVector(-4, -3), this.p5.createVector(0, -3), this.p5.createVector(4, -3)];

    directions.forEach((direction, index) => {
      this.checkRegions(xpos + direction.x, ypos + direction.y);
    });
  };

  checkRegions = (x: number, y: number) => {
    const directions = [
      this.p5.createVector(0, 0), // Here
      this.p5.createVector(-1, -1), // North West
      this.p5.createVector(0, -1), // North
      this.p5.createVector(1, -1), // North East
      this.p5.createVector(-1, 0), // West
      this.p5.createVector(1, 0), // East
      this.p5.createVector(-1, 1), // South West
      this.p5.createVector(0, 1), // South
      this.p5.createVector(1, 1), // South East
    ];

    directions.forEach((direction, index) => {
      this.setCompensateVal(x + direction.x, y + direction.y, 255);
    });
  };

  //! Not a fan of this floor way of doing things
  getVal = (mouseX: number, mouseY: number) => {
    try {
      let xpos = this.p5.floor(mouseX / this.xpoints);
      let ypos = this.p5.floor(mouseY / this.ypoints);

      if (xpos >= this.xpoints) xpos = this.xpoints;
      if (ypos >= this.ypoints) ypos = this.ypoints;

      // console.log("Value at point", xpos, ypos, "=", this.trailMap[ypos][xpos]);
      return this.trailMap[ypos][xpos];
    } catch {
      return -1;
    }
  };

  getCompensatedVal = (xpos: number, ypos: number) => {
    try {
      return this.trailMap[ypos][xpos];
    } catch {
      return undefined;
    }
  };

  setCompensateVal = (x: number, y: number, val: number) => {
    try {
      this.trailMap[x][y] = val;
    } catch {
      console.log("Set Compensated Val Error");
    }
  };

  setVal = (x: number, y: number, val: number) => {
    const xpos = this.p5.map(x, 0, this.p5.width, 0, 1);
    const ypos = this.p5.map(y, 0, this.p5.height, 0, 1);

    const xval = this.p5.floor(xpos * this.xpoints);
    const yval = this.p5.floor(ypos * this.ypoints);

    this.trailMap[xval][yval] = val;

    // try {
    //   let xpos = this.p5.floor(x / this.xscale);
    //   let ypos = this.p5.floor(y / this.xscale);

    //   if (xpos >= this.xpoints) xpos = this.xpoints - 1;
    //   if (ypos >= this.ypoints) ypos = this.ypoints - 1;

    //   this.trailMap[ypos][xpos] = val;
    // } catch {
    //   console.log("Out of bounds: Fix me");
    // }
  };

  //* Get strongest
  // Get strongest val from the
  getStrongest(x: number, y: number, hasFood: boolean) {
    let xpos = this.p5.floor(x / this.xpoints);
    let ypos = this.p5.floor(y / this.ypoints);

    let trailMapVal: number | undefined = 0;
    let strongestVal = 0;
    let directionVector = this.p5.createVector();

    const directions = [
      this.p5.createVector(-1, -1), // North West
      this.p5.createVector(0, -1), // North
      this.p5.createVector(1, 1), // North East
      this.p5.createVector(-1, 0), // West
      this.p5.createVector(1, 0), // East
      this.p5.createVector(-1, 1), // South West
      this.p5.createVector(0, 1), // South
      this.p5.createVector(1, 1), // South East
    ];

    directions.forEach((direction) => {
      trailMapVal = this.getCompensatedVal(xpos + direction.x, ypos + direction.y);
      if (trailMapVal && trailMapVal > strongestVal) {
        directionVector.set(direction.x, direction.y);
        strongestVal = trailMapVal;
      }
    });

    return directionVector;
  }

  getWeakest(x: number, y: number, hasFood: boolean) {
    let xpos = this.p5.floor(x / this.xpoints);
    let ypos = this.p5.floor(y / this.ypoints);

    let trailMapVal: number | undefined = 0;
    let weakestVal = Infinity;
    let directionVector = this.p5.createVector(0, 0);

    const directions = [
      this.p5.createVector(-1, -1), // North West
      this.p5.createVector(0, -1), // North
      this.p5.createVector(1, 1), // North East
      this.p5.createVector(-1, 0), // West
      this.p5.createVector(1, 0), // East
      this.p5.createVector(-1, 1), // South West
      this.p5.createVector(0, 1), // South
      this.p5.createVector(1, 1), // South East
    ];

    directions.forEach((direction, index) => {
      trailMapVal = this.getCompensatedVal(xpos + direction.x, ypos + direction.y);

      if (trailMapVal && trailMapVal < weakestVal) {
        directionVector.set(direction.x, direction.y).setMag(0.5);

        weakestVal = trailMapVal;
      }
    });

    return directionVector;
  }
}
