import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
  };

  p5.draw = () => {
    p5.background(255);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
}
