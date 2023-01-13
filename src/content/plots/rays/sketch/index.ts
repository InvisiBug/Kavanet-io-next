// https://www.youtube.com/watch?v=TOEi6T2mtHo
// Possible easy library https://github.com/bmoren/p5.collide2D

//* Future improvements
// Mutiple particles

import p5, { Vector } from "p5";
import Boundry from "./Components/boundry";
import Hexagon from "./Components/hexagon";
import { generateColours } from "../../helpers";
import Particle from "./Components/particle";
import colours from "nice-color-palettes";
import Dropzone from "react-dropzone";

export const sketch = (p5: p5) => {
  const config: Config = {
    p5: p5,
    speed: 5,
    colours: generateColours(p5, 5),
  };

  const numColours = 4; // Max 5

  const boundries: Array<Boundry> = [];
  const particles: Array<Particle> = [];
  const hexagons: Array<Hexagon> = [];

  const availableColours = p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours);

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    //* Outer boundries (Drawn just outside the screen)
    boundries.push(new Boundry(config, availableColours, -1, p5.width + 1, -1, -1));
    boundries.push(new Boundry(config, availableColours, p5.width + 1, p5.width + 1, -1, p5.height + 1));
    boundries.push(new Boundry(config, availableColours, -1, p5.width + 1, p5.height + 1, p5.height + 1));
    boundries.push(new Boundry(config, availableColours, -1, -1, -1, p5.height + 1));

    //* Randomly placed boundries
    // TODO change boundries to hexagons
    const numBoundries = 10;
    for (let i = 0; i < numBoundries; i++) {
      boundries.push(new Boundry(config, availableColours, p5.random(p5.width), p5.random(p5.width), p5.random(p5.height), p5.random(p5.height)));
    }

    // Particles
    const numParticles = 1;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(config));
    }

    // hexagons
    const numHexagons = 1;
    for (let i = 0; i < numHexagons; i++) {
      hexagons.push(new Hexagon(config, 50));
    }
  };

  p5.draw = () => {
    p5.background(30);
    p5.noFill();
    // console.log(p5.frameRate());

    boundries.forEach((boundry) => {
      boundry.show();
    });

    particles.forEach((particle) => {
      particle.show();

      particle.look(boundries);
      particle.update();

      hexagons.forEach((hexagon) => {
        hexagon.edges.forEach((edge) => {
          // particle.look(edge)
        });
        // particle.look()
      });
    });

    hexagons.forEach((hexagon) => {
      hexagon.show();
    });
  };
};

export interface Config {
  p5: p5;
  speed: number;
  colours: string[];
}
