import { type Config, type Objects } from "../";
import Tree from "./tree";
import Turbine from "./turbine";

export default class Background {
  config;
  objects;
  p5;

  constructor(config: Config, objects: Objects) {
    this.config = config;
    this.p5 = config.p5;

    this.objects = objects;
  }

  show = () => {
    this.generateStars(1000);
    this.generateMountains(5);
    this.generatePlanet(1);
    this.generateMoon(1);
    this.generateFade(4);
  };

  generateStars = (totalStars: number) => {
    // Generate stars
    [...Array(totalStars)].forEach(() => {
      this.p5.push();

      if (this.config.svgMode) {
        this.p5.noFill();
        this.p5.strokeWeight(1);
      } else {
        this.p5.fill(255);
        this.p5.noStroke();
      }

      this.p5.ellipse(this.p5.random(this.p5.width), this.p5.random(0, this.p5.height), 1);

      this.p5.pop();
    });
  };

  generateMoon = (numPlanets: number) => {
    [...Array(numPlanets)].forEach((_, index) => {
      this.p5.push();

      if (this.config.svgMode) {
        this.p5.noFill();
        this.p5.strokeWeight(1);
      } else {
        this.p5.fill(255);
        this.p5.noStroke();
      }

      const xpos = this.p5.random(this.p5.width);
      const ypos = this.p5.random(this.p5.height / 2, this.p5.height);
      const size = this.p5.random(20, 50);

      // const xpos = this.p5.width / 2;
      // const ypos = (this.p5.height / 5) * 4;
      // const size = 100;

      const sunPos = this.p5.createVector(xpos, ypos);
      this.p5.translate(sunPos.x, sunPos.y);

      this.p5.fill(50);
      // this.p5.ellipse(0, 0, size);

      const xnoise = 0;
      const ynoise = this.p5.random(100);

      this.p5.translate(-size / 2, -size / 2);

      const noiseZoom = 0.1;

      // const noise = p5.noise((x + xOffset) * noiseZoom, (y + yOffset) * noiseZoom);
      //   p5.fill(getColour(noise));
      //   p5.noStroke();

      for (let x = 0; x < size + 1; x++) {
        for (let y = 0; y < size + 1; y++) {
          if (this.p5.dist(size / 2, size / 2, x, y) < size / 2 + 0.5) {
            this.p5.fill(this.p5.map(this.p5.noise((x + xnoise) * noiseZoom, (y + ynoise) * noiseZoom), 0, 1, 0, 255));
            this.p5.stroke(this.p5.map(this.p5.noise((x + xnoise) * noiseZoom, (y + ynoise) * noiseZoom), 0, 1, 0, 255));
            // this.p5.fill(this.p5.random(255));
            // this.p5.ellipse(x, y, 0.5);
            // this.p5.point(x, y);
            this.p5.rectMode(this.p5.CENTER);
            this.p5.rect(x, y, 1);
          }
          // xnoise += 0.05;
        }
        // ynoise += 1;
      }

      this.p5.pop();
    });
  };

  generateMountains = (numMountains: number) => {
    //* The mountains need to be drawn from the highest instance downwards

    const startY = this.p5.random(this.p5.height / 4, this.p5.height / 2);
    let currentY = startY;

    [...Array(numMountains)].forEach((_, index) => {
      this.p5.push();

      const spacing = this.p5.random(50, 100);
      // const spacing = 50;
      const layer = currentY - spacing;
      currentY = layer;

      const colour = this.p5.color(this.p5.random(this.config.colours));
      // colour.setAlpha(this.p5.random(0, 100));
      this.p5.beginShape();

      if (this.config.svgMode) {
        this.p5.noFill();
        this.p5.strokeWeight(1);
      } else {
        this.p5.noStroke();
        this.p5.fill(colour);
      }

      let noisePos = this.p5.random(1000);

      for (let x = 0; x < this.p5.width + 10; x += 10) {
        const y = this.p5.map(this.p5.noise(noisePos), 0, 1, layer, layer + 100);

        if (this.p5.noise(noisePos) < 0.5 && index === 0 && this.p5.random() < 0.1) {
          this.objects.turbines.push(new Turbine(this.config, this.objects, x, y));
        }

        if (this.p5.noise(noisePos) < 0.5 && index === 1 && this.p5.random() < 0.3) {
          this.objects.trees.push(new Tree(this.config, this.objects, x, y));
        }

        // if (x > 0 && x < this.p5.width && y > 0 && y < this.p5.height) {
        if (y > 0) {
          this.p5.vertex(x, y);
        }
        noisePos += 0.05;
      }

      this.p5.vertex(this.p5.width, 0);
      this.p5.vertex(0, 0);

      this.p5.endShape();
      this.p5.pop();
    });
  };

  generateFade = (numMountains: number) => {
    this.p5.push();

    this.p5.scale(1, -1);

    this.p5.fill(255);
    this.p5.ellipse(50, -50, 10);
    //* The mountains need to be drawn from the highest instance downwards

    // const startY = this.p5.random(this.p5.height / 4, this.p5.height / 2);
    // let currentY = startY;

    // [...Array(numMountains)].forEach((_, index) => {
    //   const spacing = this.p5.random(50, 100);
    //   // const spacing = 50;
    //   const layer = currentY - spacing;
    //   currentY = layer;

    //   const colour = this.p5.color(this.p5.random(this.config.colours));
    //   // colour.setAlpha(this.p5.random(0, 100));
    //   this.p5.beginShape();

    //   if (this.config.svgMode) {
    //     this.p5.noFill();
    //     this.p5.strokeWeight(1);
    //   } else {
    //     this.p5.noStroke();
    //     this.p5.fill(colour);
    //   }

    //   let noisePos = this.p5.random(1000);

    //   for (let x = 0; x < this.p5.width + 10; x += 10) {
    //     const y = this.p5.map(this.p5.noise(noisePos), 0, 1, layer, layer + 100);

    //     // if (x > 0 && x < this.p5.width && y > 0 && y < this.p5.height) {
    //     if (y > 0) {
    //       this.p5.vertex(x, y);
    //     }
    //     noisePos += 0.05;
    //   }

    //   this.p5.vertex(this.p5.width, 0);
    //   this.p5.vertex(0, 0);

    //   this.p5.endShape();
    // });
    this.p5.pop();
  };

  generatePlanet = (numPlanets: number) => {
    [...Array(numPlanets)].forEach((_, index) => {
      this.p5.push();

      if (this.config.svgMode) {
        this.p5.noFill();
        this.p5.strokeWeight(1);
      } else {
        this.p5.fill(255);
        this.p5.noStroke();
      }

      const xpos = this.p5.random(this.p5.width);
      const ypos = this.p5.random(this.p5.height / 2, this.p5.height);
      const size = this.p5.random(20, 50);

      // const xpos = this.p5.width / 2;
      // const ypos = (this.p5.height / 5) * 4;
      // const size = 100;

      const sunPos = this.p5.createVector(xpos, ypos);
      this.p5.translate(sunPos.x, sunPos.y);

      this.p5.ellipse(0, 0, size);

      this.p5.rotate(this.p5.random(this.p5.radians(360)));
      this.p5.ellipse(0, 0, this.p5.random(size, size * 2), this.p5.random(size / 10, size));

      this.p5.pop();
    });
  };
}
