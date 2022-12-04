// import random from "canvas-sketch-util/random";
import { lerp } from "canvas-sketch-util/math";
import HabitatGenerator from "./habitatGenerator";
import { getRandomInt } from "../../../../plots/helpers";

/* 
  Habitat types
  0 =>"#aaaaaa" => Not a roosting site
  1 => #666B3A" => Woodland
  2 =>"#ADAB76" => Woodland edge
  3 =>"#B05449" => Building
*/

export default class Habitat {
  habitat = [];

  constructor(ctx, env, elizasHabitat) {
    this.ctx = ctx;
    this.env = env;

    // This size here is used to set the width of the board
    // it is terrible, fix it
    this.size = (env.width - env.marginX * 2) / env.gridSize;

    this.habitat = new HabitatGenerator(env, elizasHabitat).habitat;
    // this.createRandomHabitat();
    this.draw();
  }

  createRandomHabitat = () => {
    for (let y = 0; y < this.env.gridSize; y++) {
      this.habitat[y] = []; // ! Not sure about this one, it was "new Array()"
      for (let x = 0; x < this.env.gridSize; x++) {
        this.habitat[y].push(getRandomInt(0, 4));
      }
    }
  };

  tick = () => {
    this.draw();
  };

  draw = () => {
    for (let y = 0; y < this.env.gridSize; y++) {
      for (let x = 0; x < this.env.gridSize; x++) {
        const u = x / (this.env.gridSize - 1);
        const v = y / (this.env.gridSize - 1);

        this.ctx.fillStyle = this.getHabitatColour(this.habitat[x][y]);
        this.ctx.fillRect(
          this.env.marginX + lerp(0, this.env.height, u) - this.size / 2,
          lerp(0, this.env.height, v) - this.size / 2,
          this.size,
          this.size
        );
      }
    }
  };

  /*
    The search area around the cat tries to go off the 
    edge of the map the if statements keep it bound to the habitat
  */
  getHabitat = (incomingX, incomingY) => {
    let x;
    let y;

    if (incomingX < 0) x = 0;
    else if (incomingX > this.env.gridSize - 1) x = this.env.gridSize - 1;
    else x = incomingX;

    if (incomingY < 0) y = 0;
    else if (incomingY > this.env.gridSize - 1) y = this.env.gridSize - 1;
    else y = incomingY;

    return this.habitat[x][y];
  };

  getHabitatColour = (habitat) => {
    const colours = ["#aaaaaa", "#666B3A", "#ADAB76", "#B05449"];
    return colours[habitat];
  };
}
