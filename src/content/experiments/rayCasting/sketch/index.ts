// https://www.youtube.com/watch?v=TOEi6T2mtHo
// Possible easy library https://github.com/bmoren/p5.collide2D

//* Future improvements
// Mutiple particles

import p5, { Vector } from "p5";
import Boundry from "./boundry";
import Ray from "./ray";
import Particle from "./particle";
import colours from "nice-color-palettes";

export const sketch = (p5: p5) => {
  const config: Config = {
    p5: p5,
    speed: 5,
  };

  const numColours = 4; // Max 5

  const boundries: Array<Boundry> = [];
  const particles: Array<Particle> = [];

  let xoff = 0;
  let yoff = 1000;

  const numBoundries = 10;

  const movement = 0.002;
  const availableColours = p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours);

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    boundries.push(new Boundry(config, availableColours, -1, p5.width + 1, -1, -1));
    boundries.push(new Boundry(config, availableColours, p5.width + 1, p5.width + 1, -1, p5.height + 1));
    boundries.push(new Boundry(config, availableColours, -1, p5.width + 1, p5.height + 1, p5.height + 1));
    boundries.push(new Boundry(config, availableColours, -1, -1, -1, p5.height + 1));

    for (let i = 0; i < numBoundries; i++) {
      const divisor = 2;
      boundries.push(new Boundry(config, availableColours, p5.random(p5.width), p5.random(p5.width), p5.random(p5.height), p5.random(p5.height)));
    }

    particles.push(new Particle(config));
    particles.push(new Particle(config));
    particles.push(new Particle(config));
    // rays.push(new Ray(config, p5.width / 2, p5.height / 2));
    // p5.noLoop();
  };

  p5.draw = () => {
    p5.background(30);
    console.log(p5.frameRate());

    boundries.forEach((boundry) => {
      boundry.show();
    });

    particles.forEach((particle) => {
      particle.show();
      // particle.update(p5.mouseX, p5.mouseY);
      particle.look(boundries);
      // particle.update(p5.noise(xoff) * p5.width, p5.noise(yoff) * p5.height);
      particle.update();
      // particle.update(particle.pos.x + p5.noise(xoff) * p5.width, particle.pos.y + p5.noise(yoff) * p5.height);

      // particle.oldLook(boundries[0]); // old implementation of look, think it may be useful later

      // boundries.forEach((boundry) => {
      //   particle.look(boundry);
      // });
    });

    // rays.forEach((ray) => {
    //   boundries.forEach((boundry) => {
    //     let intersect = ray.cast(boundry);

    //     if (intersect instanceof Vector) {
    //       p5.fill(255);
    //       p5.ellipse(intersect.x, intersect.y, 8, 8);
    //     }
    //   });

    //   ray.show();
    //   ray.lookAt(p5.mouseX, p5.mouseY);
    // });
  };
};

export interface Config {
  p5: p5;
  speed: number;
}
