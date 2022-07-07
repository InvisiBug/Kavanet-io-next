import Bat from "./components/bat.js";
import Habitat from "./components/habitat.js";
import Cat from "./components/cat";
import Hawk from "./components/hawk";

export default class Sim {
  env = {
    width: window.innerWidth,
    height: window.innerHeight,
    marginX: (window.innerWidth - window.innerHeight) / 2,
    bgColour: "rgba(25, 25, 25)",
    speed: 1,
    fps: 10,
    moveDistance: 1,
    gridSize: 100,
  };

  tickables = [];
  timestamp = 0;
  lastTimestamp = 0;
  bats = [];

  runNumber = 0;

  //* Model Variables
  numBats = 100;
  numCats = 10;
  numHawks = 20;

  constructor(canvasRef) {
    this.canvas = canvasRef;
    this.ctx = this.canvas.getContext("2d");

    this.setup();
  }

  setup = () => {
    this.resizeCanvas();
    this.drawBackground();

    this.habitat = new Habitat(this.ctx, this.env, true);
    this.tickables.push(this.habitat);

    for (let i = 0; i < this.numHawks; i++) {
      const hawk = new Hawk(this.ctx, this.env, this.habitat, [47, 43]);
      this.tickables.push(hawk);
    }

    for (let i = 0; i < this.numCats; i++) {
      const cat = new Cat(this.ctx, this.env, this.habitat, [47, 43]); //47,43
      this.tickables.push(cat);
    }

    for (let i = 0; i < this.numBats; i++) {
      const newBat = new Bat(this.ctx, this.env, this.habitat, [50, 50]);
      this.bats.push(newBat);
      this.tickables.push(newBat);
    }

    // Start the sim
    this.sim();
  };

  sim = () => {
    this.timestamp = Date.now();

    if (!(this.timestamp - this.lastTimestamp < 1000 / this.env.fps)) {
      this.tickables.forEach((ticker) => {
        ticker.tick(this.bats);
      });
      // this.printStats();
      this.lastTimestamp = this.timestamp;
    }

    requestAnimationFrame(() => this.sim());
  };

  printStats = () => {
    let batsLeftAlive = 0;
    let batsNested = 0;

    for (let i = 0; i < this.bats.length; i++) {
      if (this.bats[i].alive) batsLeftAlive += 1;
      if (this.bats[i].nest && this.bats[i].alive) batsNested += 1;
    }
    console.log(
      "Bats Killed :",
      this.numBats - batsLeftAlive,
      "Bats Remaining :",
      batsLeftAlive,
      "\t Bats With a House :",
      batsNested
    );
  };

  drawBackground = () => {
    this.ctx.fillStyle = this.env.bgColour;
    this.ctx.fillRect(0, 0, this.env.width, this.env.height);
  };

  resizeCanvas = () => {
    this.canvas.width = this.env.width;
    this.canvas.height = this.env.height;
  };
}
