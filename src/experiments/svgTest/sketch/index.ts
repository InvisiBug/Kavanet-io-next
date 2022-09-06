// This repo has some good SVG uses
// https://github.com/xanderjl/p5
import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  // const x = init(config.p5);

  p5.setup = () => {
    p5.background(255);
    // @ts-ignore
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    if (p5.frameCount > 500) {
      p5.noLoop();
      //   // p5.save();
      //   // @ts-ignore
      // p5.saveSVG("mySVG.svg");
      p5.save();
    }
    // p5.background(50);
  };

  p5.mouseDragged = () => {};

  p5.mouseClicked = () => {
    p5.fill(0);
    p5.stroke(0);
    p5.strokeWeight(2);
    // p5.ellipse(p5.mouseX, p5.mouseY, 10);
    p5.line(0, 0, p5.mouseX, p5.mouseY);
  };
};

export interface Config {
  p5: p5;
}
