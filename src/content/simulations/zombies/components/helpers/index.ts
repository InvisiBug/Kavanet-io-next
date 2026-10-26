import p5 from "p5";

export const drawDirection = (p5: p5, pos: p5.Vector, velocity: p5.Vector, size: number) => {
  p5.push();
  p5.strokeWeight(2);
  p5.stroke(1);

  const line = velocity.copy();
  line.setMag(size / 2);
  p5.translate(pos.x, pos.y);
  p5.line(0, 0, line.x, line.y);
  p5.pop();
};

export const constrain = (p5: p5, pos: p5.Vector, velocity: p5.Vector, acceleration: p5.Vector) => {
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
