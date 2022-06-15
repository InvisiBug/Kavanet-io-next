import { Config } from "../..";
import { Vector } from "p5";
import Zombie from "./zombie";
import Safezone from "../zones/safezone";
import Human from "./human";
import { drawDirection } from "../helpers";

export default class Hunter {
  p5;
  config;

  size;
  speed;
  colour;
  foodDeclineRate;

  acceleration;
  velocity;
  pos;

  food;
  killcount;
  img;

  constructor(config: Config, x: number | null = null, y: number | null = null) {
    this.p5 = config.p5;
    this.config = config;

    this.colour = this.p5.color("#F85050");
    this.speed = config.speed;
    this.size = 10;
    this.food = 10;
    this.killcount = 0;
    this.foodDeclineRate = config.foodDeclineRate;
    this.img = config.hunterImg;

    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = Vector.random2D();
    this.velocity.setMag(config.speed);

    if (x && y) {
      this.pos = this.p5.createVector(x, y);
    } else {
      this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    }
  }

  update = (zombies: Zombie[], humans: Human[], safezones: Safezone[], speed: number | null = null) => {
    if (speed) {
      this.velocity.setMag(speed);
      this.speed = speed;
    }

    if (this.p5.frameCount % this.foodDeclineRate === 0) {
      if (this.food > 0) {
        this.food -= 1;
      }
    }

    this.chase(zombies);
    this.handleMovement();
  };

  show = () => {
    this.p5.fill(this.colour);
    this.p5.strokeWeight(0);
    this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);

    this.p5.push();

    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.velocity.heading());

    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.img, 0, 0, this.config.imageSize, this.config.imageSize);
    this.p5.pop();

    drawDirection(this.p5, this.pos, this.velocity, this.size);
    this.showKillCount();
  };

  //* Chase zombie
  // Find and chase the closest zombie within sight distance
  // Delete the zombie if its close enough and add 1 to killcount
  chase = (zombies: Zombie[]): void => {
    let zombieToChase: any | null = null;
    let shortestDist = Infinity;
    const sightDistance = 100;

    zombies.forEach((human: Zombie) => {
      const dist = this.pos.dist(human.pos);
      if (dist < shortestDist) {
        shortestDist = dist;
        if (dist < sightDistance) {
          zombieToChase = human;
        }
      }
    });

    if (zombieToChase instanceof Zombie) {
      this.acceleration = Vector.sub(zombieToChase.pos, this.pos);
      if (this.pos.dist(zombieToChase.pos) < 5) {
        zombies.splice(zombies.indexOf(zombieToChase), 1);
        this.killcount++;
      }
    }
  };

  showKillCount = () => {
    this.p5.pop();
    this.p5.textSize(12);
    this.p5.fill(this.colour);
    this.p5.text(`${this.killcount}`, this.pos.x + 8, this.pos.y - 5);
    this.p5.push();
  };

  handleMovement = () => {
    // Nudge direction randomly
    if (this.p5.random() < 0.2) {
      this.acceleration = Vector.random2D().setMag(0.1);
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);

    this.pos.add(this.velocity);
    this.constrain();
  };

  constrain = () => {
    this.acceleration.set(0, 0); // fixes the no boundry issue
    if (this.pos.x <= 0) {
      this.velocity.mult(this.p5.createVector(-1, 1));
      this.pos.x = 1;
    } else if (this.pos.x >= this.p5.width) {
      this.velocity.mult(this.p5.createVector(-1, 1));
      this.pos.x = this.p5.width - 1;
    } else if (this.pos.y <= 0) {
      this.velocity.mult(this.p5.createVector(1, -1));
      this.pos.y = 1;
    } else if (this.pos.y >= this.p5.height) {
      this.velocity.mult(this.p5.createVector(1, -1));
      this.pos.y = this.p5.height - 1;
    }
  };
}
