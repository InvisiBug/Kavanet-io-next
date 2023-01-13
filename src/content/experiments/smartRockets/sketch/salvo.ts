import Rocket from "./rocket";
import { SimSettings } from ".";
import Target from "./target";
import DNA from "./dna";
import Obstacle from "./obstacle";

export default class Salvo {
  p5;

  lifespan;
  rocketArr: Array<Rocket> = [];
  matingPool: Array<Rocket> = [];
  obstacleArr: Array<Obstacle> = [];
  target;
  simSettings: SimSettings;

  maxFitness: number;

  count;

  constructor(simSettings: SimSettings, target: Target) {
    this.p5 = simSettings.p5;
    this.simSettings = simSettings;
    this.lifespan = simSettings.lifespan;
    this.target = target;

    this.maxFitness = 0;
    this.count = 0;

    for (let i = 0; i < this.simSettings.totalObstacles; i++) {
      this.obstacleArr.push(new Obstacle(simSettings));
    }

    for (let i = 0; i < this.simSettings.totalRockets; i++) {
      this.rocketArr.push(new Rocket(simSettings, target, this.obstacleArr));
    }
  }

  run = () => {
    this.count++;
    this.p5.rectMode(this.p5.CENTER);

    this.rocketArr.forEach((rocket) => {
      rocket.update();
      rocket.show();
    });

    this.obstacleArr.forEach((obstacle) => {
      obstacle.show();
    });
  };

  createNextGeneration = () => {
    this.evaluate();
    this.breed();
  };

  //* Generate mating pool
  evaluate = () => {
    this.maxFitness = 0;
    this.matingPool = [];
    let landedRockets = 0;

    // Work out max fitness
    this.rocketArr.forEach((rocket) => {
      if (rocket.calcFitness()) {
        landedRockets++;
      }
      if (rocket.fitness > this.maxFitness) {
        this.maxFitness = rocket.fitness;
      }
    });
    console.log("Landed Rockets:", landedRockets, "\tCrashed Rockets:", this.simSettings.totalRockets - landedRockets);

    // Normalise fitness of all rockets by dividing their fitness by the max fitness
    this.rocketArr.forEach((rocket) => {
      rocket.fitness /= this.maxFitness;
    });

    // Multiply the normalised rocket fitness by 100
    // and add that many rocket instances into the mating pool
    this.rocketArr.forEach((rocket) => {
      let n = rocket.fitness * 100;

      for (var j = 0; j < n; j++) {
        this.matingPool.push(rocket);
      }
    });
  };

  //* Generate new salvo from mating pool
  breed = () => {
    let newRockets: Array<Rocket> = [];

    for (let i = 0; i < this.rocketArr.length; i++) {
      const parentA: DNA = this.p5.random(this.matingPool).dna;
      const parentB: DNA = this.p5.random(this.matingPool).dna;

      const childDNA = parentA.boogieWith(parentB);
      childDNA.mutation();
      newRockets.push(new Rocket(this.simSettings, this.target, this.obstacleArr, childDNA));
    }

    this.rocketArr = newRockets;
    this.count = 0;
  };
}
