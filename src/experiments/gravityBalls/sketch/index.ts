import p5, { Vector } from "p5";
import { myColours } from "src/lib/helpers";
import Ball from "./ball";

export const sketch = (p5: p5) => {
  const config = {
    p5,
    colours: myColours,
  };

  let mouseClickedPos: Vector;
  let mouseReleasedPos: Vector;
  let balls: Ball[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(50);

    for (const ball of balls) {
      ball.update(balls);
      ball.show();
    }

    if (p5.mouseIsPressed) {
      p5.line(mouseClickedPos.x, mouseClickedPos.y, p5.mouseX, p5.mouseY);
    }
  };

  p5.mouseClicked = () => {
    // balls.push(new Ball(config, p5.createVector(p5.mouseX, p5.mouseY)));
  };

  p5.mousePressed = () => {
    mouseClickedPos = p5.createVector(p5.mouseX, p5.mouseY);
  };

  p5.mouseReleased = () => {
    mouseReleasedPos = p5.createVector(p5.mouseX, p5.mouseY);
    balls.push(new Ball(config, mouseClickedPos, Vector.sub(mouseClickedPos, mouseReleasedPos).div(10)));
    // velocity.set(Vector.sub(mouseClickedPos, mouseReleasedPos));
  };

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
  colours: string[];
}
