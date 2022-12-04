import { getRandomInt } from "../../../../plots/helpers";
import { ElizasHabitat } from "./elizasHabitat";

export default class HabitatGenerator {
  habitat = [];

  constructor(env, elizasHabitat) {
    // console.log(elizasHabitat);
    this.env = env;

    // this.createBlankHabitat();
    // this.createHabitat();

    if (elizasHabitat) {
      this.habitat = ElizasHabitat;
    } else {
      this.habitat = this.createHabitat();
    }
  }

  createHabitat = () => {
    let habitat = [];
    for (let y = 0; y < this.env.gridSize; y++) {
      habitat[y] = [];
      for (let x = 0; x < this.env.gridSize; x++) {
        habitat[y].push(getRandomInt(0, 3));
        // this.habitat[y].push(4);
      }
    }
    return habitat;
  };

  createBlankHabitat = () => {
    for (let y = 0; y < this.env.gridSize; y++) {
      this.habitat[y] = [];
      for (let x = 0; x < this.env.gridSize; x++) {
        this.habitat[y].push(0);
      }
    }
  };

  tick = () => {
    console.log("tick");
  };
}
