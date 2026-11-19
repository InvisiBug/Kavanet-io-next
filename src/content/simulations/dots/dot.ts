import { type Config } from "./";
import p5 from "p5";

export type DotGrid = Map<number, Map<number, Dot[]>>;

export const buildDotGrid = (dots: Dot[], cellSize: number): DotGrid => {
  const grid: DotGrid = new Map();

  dots.forEach((dot) => {
    const cellX = Math.floor(dot.pos.x / cellSize);
    const cellY = Math.floor(dot.pos.y / cellSize);
    let row = grid.get(cellX);

    if (!row) {
      row = new Map();
      grid.set(cellX, row);
    }

    const cell = row.get(cellY);
    if (cell) {
      cell.push(dot);
    } else {
      row.set(cellY, [dot]);
    }
  });

  return grid;
};

export default class Dot {
  config: Config;
  p5: p5;
  pos: p5.Vector;
  size: number;
  velocity: p5.Vector;
  connectionDistance: number;
  colour: string;

  constructor(config: Config) {
    this.config = config;
    this.p5 = config.p5;
    this.connectionDistance = config.connectionDistance;
    this.colour = this.p5.random(config.colours);

    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(config.speed);
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    this.size = 5;
  }

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  update = (velcoity: p5.Vector = this.velocity) => {
    this.pos.add(velcoity);
    this.constrain();
  };

  connect = (grid: DotGrid) => {
    const cellX = Math.floor(this.pos.x / this.connectionDistance);
    const cellY = Math.floor(this.pos.y / this.connectionDistance);

    for (let x = cellX - 1; x <= cellX + 1; x++) {
      for (let y = cellY - 1; y <= cellY + 1; y++) {
        grid.get(x)?.get(y)?.forEach((dot) => {
          if (this.pos === dot.pos) {
            return;
          }

          const dist = dot.pos.dist(this.pos);
          if (dist >= this.connectionDistance) {
            return;
          }

          this.p5.push();
          const colour = this.p5.color(this.colour);
          this.p5.strokeWeight(1);
          colour.setAlpha(this.p5.map(dist, this.connectionDistance, 0, 0, 100));
          this.p5.stroke(colour);
          this.p5.line(this.pos.x, this.pos.y, dot.pos.x, dot.pos.y);
          this.p5.pop();
        });
      }
    }
  };

  constrain = () => {
    if (this.pos.x <= 0 || this.pos.x >= this.p5.width) {
      this.velocity.mult(this.p5.createVector(-1, 1));
    } else if (this.pos.y <= 0 || this.pos.y >= this.p5.height) {
      this.velocity.mult(this.p5.createVector(1, -1));
    }
  };
}
