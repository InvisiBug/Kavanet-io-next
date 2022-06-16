import random from "canvas-sketch-util/random";
import { lerp } from "canvas-sketch-util/math";
import { woodland, woodlandEdge, buildings } from "./constants";
// import { getRandomInt } from "../../helpers";

/*
  Bat species preference
  1 => woodland  #5C4881
  2 => woodland edge #584B45
  3 => buildings #38607A
*/

export default class Bats {
  runNumber = 0;
  constructor(
    ctx,
    env,
    habitat,
    pos = [random.rangeFloor(0, env.gridSize - 1), random.rangeFloor(0, env.gridSize - 1)],
    species = random.pick([1, 2, 3])
  ) {
    this.ctx = ctx;
    this.env = env;

    this.size = 2;
    this.width = this.size;
    this.height = this.size;

    this.habitat = habitat;
    this.species = species;
    this.id = Math.random();

    this.nest = false;
    this.alive = true;
    this.life = 10;

    this.timestamp = 0;
    this.lastTimestamp = 0;

    // this.setPos(pos);
    this.get0tile();

    this.draw();
  }

  setPos = (pos) => {
    this.x = pos[0];
    this.y = pos[1];
  };

  getInfo = () => {
    return {
      x: this.x,
      y: this.y,

      width: this.size,
      height: this.size,
      id: this.id,
      species: this.species,
    };
  };

  /*
    Gets a random tile that has a value of 0
    by making a random choice and moving to it 
    if its not a tile value than 0
  */
  get0tile = () => {
    let validMove = false;
    do {
      let newX = random.rangeFloor(0, this.env.gridSize - 1);
      let newY = random.rangeFloor(0, this.env.gridSize - 1);

      if (
        this.habitat.getHabitat(newX, newY) !== woodlandEdge &&
        this.habitat.getHabitat(newX, newY) !== woodland &&
        this.habitat.getHabitat(newX, newY) !== buildings
      ) {
        this.setPos([newX, newY]);
        validMove = true;
      }
    } while (validMove !== true);
  };

  tick = (bats) => {
    this.runNumber += 1;
    if (this.alive) {
      if (!this.nest) {
        this.setPos([
          this.x + random.pick([-this.env.moveDistance, 0, this.env.moveDistance]),
          this.y + random.pick([-this.env.moveDistance, 0, this.env.moveDistance]),
        ]);

        //* Pushes a bat back on the screen if it tries to wander off
        this.detectWalls();

        this.checkForNest();
      }
      this.draw();
    }
  };

  /*
    Bats nest in a location thats the same as their species
  */
  checkForNest = () => {
    if (this.habitat.getHabitat(this.x, this.y) === this.species) {
      this.nest = true;
    }
  };

  checkForSuitableNest = () => {
    if (this.habitat.getHabitat(this.x, this.y) === this.species) {
      return true;
    }
  };

  die = () => {
    this.alive = false;
  };

  draw = () => {
    this.ctx.beginPath();

    const u = this.x / (this.env.gridSize - 1);
    const v = this.y / (this.env.gridSize - 1);

    // Dirty hack to make the canvas a square
    this.ctx.arc(this.env.marginX + lerp(0, this.env.height, u) - this.size / 2, lerp(0, this.env.height, v), this.size, 0, Math.PI * 2);

    // this.ctx.fillStyle = this.species === 1 ? "#5C4881" : this.species === 2 ? "#584B45" : this.species === 3 ? "#38607A" : "#ffffff";
    this.ctx.fillStyle = this.species === 1 ? "#A51401" : this.species === 2 ? "#FBFB39" : this.species === 3 ? "#081CA1" : "#ffffff";
    this.ctx.fill();
  };

  detectWalls = () => {
    if (this.x < 0) {
      // Left Edge
      this.x = 0;
    } else if (this.x > this.env.gridSize - 1) {
      // Right Edge
      this.x = this.env.gridSize - 1;
    } else if (this.y < 0) {
      // Top Edge
      this.y = 0;
    } else if (this.y > this.env.gridSize - 1) {
      // Bottom Edge
      this.y = this.env.gridSize - 1;
    }
  };
}
