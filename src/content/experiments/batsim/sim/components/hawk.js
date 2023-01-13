import random from "canvas-sketch-util/random";
import { lerp } from "canvas-sketch-util/math";
import { woodland, woodlandEdge, buildings } from "./constants";
import { getRandomInt } from "../../../../plots/helpers";

/*
  Bat species preference
  1 => woodland  #5C4881
  2 => woodland edge #584B45
  3 => buildings #38607A
*/

export default class Hawk {
  runNumber = 0;
  lookAroundSize = 4; // This is a symetrical distance from the current x,y coord
  buildingFound = false;

  constructor(ctx, env, habitat, pos = [random.rangeFloor(0, env.gridSize - 1), random.rangeFloor(0, env.gridSize - 1)]) {
    this.ctx = ctx;
    this.env = env;

    this.size = 2;
    this.width = this.size;
    this.height = this.size;

    this.habitat = habitat;
    this.id = Math.random();

    this.timestamp = 0;
    this.lastTimestamp = 0;

    // this.setPos([99, 45]);
    // this.findTileNearHouse();
    // this.setPos(pos);
    // this.findDeepWoodland();
    this.get0tile();

    // this.draw();
  }

  setPos = (pos) => {
    this.x = pos[0];
    this.y = pos[1];
  };

  /*
    Chooses a location at random until it finds one with a value of 0
    then moves to that location
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

  /*
    Chooses a location at random until it finds some woodland
    then moves to the location
  */
  findDeepWoodland = () => {
    let validMove = false;
    do {
      let newX = random.rangeFloor(0, this.env.gridSize - 1);
      let newY = random.rangeFloor(0, this.env.gridSize - 1);

      if (
        this.habitat.getHabitat(newX, newY) !== woodlandEdge &&
        this.habitat.getHabitat(newX, newY) !== buildings &&
        this.habitat.getHabitat(newX, newY) !== 0
      ) {
        this.setPos([newX, newY]);
        validMove = true;
      }
    } while (validMove !== true);
  };

  getInfo = () => {
    return {
      id: this.id,
      x: this.x,
      y: this.y,

      width: this.size,
      height: this.size,
      species: this.species,
    };
  };

  tick = (bats) => {
    this.move();
    // this.checkAndEatBat(bats);
    this.draw();
  };

  /*
    Check if there is a bat on the same square as us
    Roll a dice
    Eat the bat half the time
  */
  checkAndEatBat = (bats) => {
    for (let i = 0; i < bats.length; i++) {
      if (this.x === bats[i].getInfo().x && this.y === bats[i].getInfo().y) {
        if (getRandomInt(0, 10) > 5) {
          bats[i].die();
        }
      }
    }
  };

  /*
    Choose a new place to move to
    Check to make sure its not off the edge, an unwanted habitat
    Check to make sure we are within a given distance to a building
    Move to new location
    Otherwise choose another location
  */
  move = () => {
    let validMove = false;

    let newX = 0;
    let newY = 0;

    do {
      newX = this.x + random.pick([-this.env.moveDistance, 0, this.env.moveDistance]); // need to have a possibility to not move otherwise we can
      newY = this.y + random.pick([-this.env.moveDistance, 0, this.env.moveDistance]); // get stuck in a endless loop trying to pick a new location

      if (this.avoidEdges(newX, newY)) {
        if (this.avoidBadHabitats(newX, newY)) {
          // if (!this.searchForBuildingProximity(newX, newY)) {
          // if (true) {
          // this.buildingFound = true;
          this.x = newX;
          this.y = newY;
          validMove = true;
          // }
          // }
        }
      }
    } while (validMove !== true);
  };

  avoidBadHabitats = (newX, newY) => {
    const val =
      this.habitat.getHabitat(newX, newY) !== buildings &&
      this.habitat.getHabitat(newX, newY) !== woodlandEdge &&
      this.habitat.getHabitat(newX, newY) !== woodlandEdge;
    return val;
  };

  /*
    Return true if the new location is within the environment
  */
  avoidEdges = (newX, newY) => {
    const x = newX > 0 && newX < this.env.gridSize;
    const y = newY > 0 && newY < this.env.gridSize;
    return x && y;
  };

  /*
    Create a box around the current pos
    scan each square
    return true if there is a building
  */
  searchForBuildingProximity = (xPoint, yPoint) => {
    for (let y = yPoint - this.lookAroundSize; y < yPoint + this.lookAroundSize + 1; y++) {
      for (let x = xPoint - this.lookAroundSize; x < xPoint + this.lookAroundSize + 1; x++) {
        if (this.habitat.getHabitat(x, y) === buildings) {
          return true;
        }
      }
    }
    return false;
  };

  draw = () => {
    this.ctx.beginPath();

    const u = this.x / (this.env.gridSize - 1);
    const v = this.y / (this.env.gridSize - 1);

    // Dirty hack to make the canvas a square
    this.ctx.arc(this.env.marginX + lerp(0, this.env.height, u) - this.size / 2, lerp(0, this.env.height, v), this.size, 0, Math.PI * 2);

    // this.ctx.fillStyle = "#AC6200";
    // this.ctx.fillStyle = "#fff";
    this.ctx.fillStyle = "#FCEB0B";
    this.ctx.fill();
  };
}
