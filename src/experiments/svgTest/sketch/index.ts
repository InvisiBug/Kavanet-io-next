import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  // const x = init(config.p5);

  p5.setup = () => {
    // @ts-ignore
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.SVG);
  };

  p5.draw = () => {
    if (p5.frameCount > 100) {
      p5.noLoop();
      // p5.save();
      // @ts-ignore
      p5.saveSVG("mySVG.svg");
    }
    // p5.background(50);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {
    p5.fill(255);
    p5.noStroke();
    p5.ellipse(p5.mouseX, p5.mouseY, 10);
  };
};

export interface Config {
  p5: p5;
}
