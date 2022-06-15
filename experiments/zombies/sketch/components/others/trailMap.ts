import { Config } from "../../";
import { Color } from "p5";

export default class TrailMap {
  p5;
  config;
  trailMap: number[][];

  xscale;
  yscale;

  xpoints = 0;
  ypoints = 0;
  margin = 0;
  size;

  colour;
  offset;
  scale;

  constructor(config: Config, colour: Color, offset: boolean = false) {
    this.p5 = config.p5;
    this.config = config;
    this.colour = colour;

    this.offset = offset;

    this.trailMap = [];

    this.scale = 15;
    this.xscale = this.scale;
    this.yscale = this.scale;
    this.size = 7;
  }

  //* Generates a new blank map
  generateNewMap = () => {
    this.xpoints = this.p5.floor(this.p5.width / this.xscale);
    this.ypoints = this.p5.floor(this.p5.height / this.yscale);
    this.margin = (this.p5.width - this.p5.height) / 1;

    for (let y = 0; y < this.ypoints; y++) {
      this.trailMap[y] = [];
      for (let x = 0; x < this.xpoints; x++) {
        // this.trailMap[y][x] = 0;
        // this.trailMap[y][x] = this.p5.random(0, 255);
        // this.trailMap[y][x] = this.p5.map(this.p5.noise(x, y), 0, 1, 0, 255);
        this.trailMap[y][x] = 25;
      }
    }
  };

  // Draws the map, scaled up to the canvas size
  show = () => {
    for (let y = 0; y < this.ypoints; y++) {
      for (let x = 0; x < this.xpoints; x++) {
        const u = x / this.xpoints;
        const v = y / this.ypoints;
        this.p5.noStroke();

        if (this.trailMap[y][x] > 0) {
          this.colour.setAlpha(this.trailMap[y][x]);
          this.p5.fill(this.colour);
          const useOffsetVals = true;

          if (useOffsetVals) {
            // const x = lerp(margin, width - margin, u);
            const margin = 0;

            const x = this.p5.lerp(margin, this.p5.width - margin, u);
            const y = this.p5.lerp(margin, this.p5.height - margin, v);

            this.p5.ellipse(x, y, this.size);
          } else {
            this.p5.ellipse(this.p5.lerp(5, this.p5.width, u), this.p5.lerp(5, this.p5.height, v), this.size);
          }
        }
      }
    }
  };

  fade = () => {
    const fadeAmount = 1.5;

    for (let y = 0; y < this.ypoints; y++) {
      for (let x = 0; x < this.xpoints; x++) {
        if (this.trailMap[y][x] > 0) {
          this.trailMap[y][x] -= fadeAmount;
        } else if (this.trailMap[y][x] < 0) {
          this.trailMap[y][x] = 0;
        }
      }
    }
  };

  followScent = (x: number, y: number) => {
    let xpos = this.p5.floor(x / this.xscale);
    let ypos = this.p5.floor(y / this.xscale);

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
      let xpos = this.p5.floor(mouseX / this.xscale);
      let ypos = this.p5.floor(mouseY / this.xscale);

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
      this.trailMap[y][x] = val;
    } catch {
      console.log("Set Compensated Val Error");
    }
  };

  setVal = (x: number, y: number, val: number) => {
    try {
      let xpos = this.p5.floor(x / this.xscale);
      let ypos = this.p5.floor(y / this.xscale);

      if (xpos >= this.xpoints) xpos = this.xpoints - 1;
      if (ypos >= this.ypoints) ypos = this.ypoints - 1;

      this.trailMap[ypos][xpos] = val;
    } catch {
      console.log("Out of bounds: Fix me");
    }
  };

  //* Get strongest
  // Get strongest val from the
  getStrongest(x: number, y: number, hasFood: boolean) {
    let xpos = this.p5.floor(x / this.xscale);
    let ypos = this.p5.floor(y / this.xscale);

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
    let xpos = this.p5.floor(x / this.xscale);
    let ypos = this.p5.floor(y / this.xscale);

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
