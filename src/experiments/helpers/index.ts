import p5, { Vector } from "p5";

export const test = () => {
  console.log("test");
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const drawGradientBackground = (p5: p5, colour1: string, colour2: string) => {
  const c1 = p5.color(colour1);
  const c2 = p5.color(colour2);

  c1.setAlpha(20);
  c2.setAlpha(20);

  for (let x = 0; x < p5.width + 1; x++) {
    const n = p5.map(x, 0, p5.width, 0, 1);
    let newc = p5.lerpColor(c1, c2, n);

    p5.stroke(newc);
    p5.line(x, -1, x, p5.height);
    p5.pop();
  }

  // for (let y = 0; y < p5.height; y++) {
  //   const n = p5.map(y, 0, p5.height, 0, 1);
  //   let newc = p5.lerpColor(c1, c2, n);
  //   p5.stroke(newc);
  //   p5.line(0, y, p5.width, y);
  // }
};

export const constrain = (p5: p5, pos: Vector, velocity: Vector, acceleration: Vector) => {
  acceleration.set(0, 0); // fixes the no boundry issue
  if (pos.x <= 0) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = 1;
  } else if (pos.x >= p5.width) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = p5.width - 1;
  } else if (pos.y <= 0) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = 1;
  } else if (pos.y >= p5.height) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = p5.height - 1;
  }
};

export const constrainCircle = (p5: p5, pos: Vector, velocity: Vector, acceleration: Vector, size: number) => {
  // acceleration.set(0, 0); // fixes the no boundry issue
  if (pos.x - size / 2 <= 0) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = 1 + size / 2;
  } else if (pos.x + size / 2 >= p5.width) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = p5.width - 1 - size / 2;
  } else if (pos.y - size / 2 <= 0) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = 1 + size / 2;
  } else if (pos.y + size / 2 >= p5.height) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = p5.height - 1 - size / 2;
  }
};

export const showFPS = (p5: p5) => {
  p5.push();
  p5.textSize(32);
  p5.fill(255);
  p5.strokeWeight(5);
  p5.stroke(0);
  p5.fill(255);
  p5.text(`${p5.frameRate().toFixed(0)}FPS`, 10, 30);
  p5.pop();
};
