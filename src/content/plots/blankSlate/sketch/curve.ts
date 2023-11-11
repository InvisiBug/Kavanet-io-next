import { Vector } from "p5";
import { Config } from ".";

export default class Curve {
  p5;

  constructor(config: Config) {
    this.p5 = config.p5;
  }

  update = () => {};

  show = () => {};
}
