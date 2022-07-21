import { Config } from ".";

export default class Class {
  p5;

  constructor(config: Config) {
    this.p5 = config.p5;
  }

  update = () => {};

  show = () => {};
}
