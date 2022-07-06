import Wall from "./wall";
import { Config } from "./index";

export default class Walls {
  config;
  p5;

  wallArr: Array<Wall> = [];

  noisePos = 0;
  wallPos = 0;
  totalWalls;

  constructor(config: Config, totalWalls: number = 50) {
    this.p5 = config.p5;
    this.config = config;
    this.totalWalls = totalWalls;

    this.loadInitialWalls();
  }

  loadInitialWalls() {
    for (let i = 0; i < this.totalWalls; i++) {
      this.createWall();
    }
  }

  //! Fairly sure these map functions aren't working
  createWall = () => {
    // const wallWidth = this.p5.map(this.p5.noise(this.noisePos), 0, 1, 0, 200);
    const noise2 = this.p5.noise(this.noisePos + 100);
    const wallWidth = noise2 * 200;

    // const gapSize = this.p5.map(noise, 0, 1, 200, this.p5.height / 2 - 10);
    const noise = this.p5.noise(this.noisePos);
    const gapSize = noise * 600;

    this.wallArr.push(new Wall(this.config, this.wallPos, wallWidth, gapSize));
    this.wallPos += wallWidth;
    this.noisePos += 0.1;
  };

  show = () => {
    for (let i = this.wallArr.length - 1; i >= 0; i--) {
      this.wallArr[i].show();
    }
  };

  update = () => {
    for (let i = this.wallArr.length - 1; i >= 0; i--) {
      this.wallArr[i].show();
      this.wallArr[i].update();

      if (this.wallArr[i].checkIfOffScreen()) {
        this.wallPos -= this.wallArr[i].width + 1;

        this.wallArr.splice(i, 1);
      }
    }
    if (this.wallArr.length < this.totalWalls) {
      this.createWall();
    }
  };
}
