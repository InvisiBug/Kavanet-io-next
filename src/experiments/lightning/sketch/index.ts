// Based on this video https://youtu.be/HDzVD-cqiWM?t=353
// I want to make a lightning simulator
//
// Lightning strike with explination and algorithm => https://old.reddit.com/r/processing/comments/naxu5d/lightning_strike_made_with_processing/
// P5 Jacobs Ladder => https://www.youtube.com/watch?v=mD6t84tlchg
import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(50);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
}
