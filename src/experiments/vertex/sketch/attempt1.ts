import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  const numRows = 10;
  const numCols = 10;

  const xpoints = 10;
  const ypoints = 10;
  const margin = 200;

  const colours = ["#302F2D", "#464543", "#274666", "#24829F", "#86A95B"];
  let vertex: number[][] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(50);
    p5.noLoop();

    for (let x = 0; x < xpoints; x++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let y = 0; y < ypoints; y++) {
        p5.fill(p5.random(colours));
        p5.noStroke();

        const u = x / (xpoints - 1);
        const v = y / (ypoints - 1);

        const thisUV = p5.createVector(x / (xpoints - 1), y / (ypoints - 1)); // This one
        const nextXUV = p5.createVector(x + 1 / (xpoints - 1), y / (ypoints - 1)); // Along right one
        const nextYUV = p5.createVector(x / (xpoints - 1), y + 1 / (ypoints - 1)); // Down one
        const nextXYUV = p5.createVector(x + 1 / (xpoints - 1), y + 1 / (ypoints - 1)); // Down right one

        const xpos = p5.lerp(margin, p5.windowWidth - margin, thisUV.x);
        const ypos = p5.lerp(margin, p5.height - margin, thisUV.y);

        const thisPos = p5.createVector(p5.lerp(margin, p5.windowWidth - margin, thisUV.x), p5.lerp(margin, p5.height - margin, thisUV.y));
        const nextXPos = p5.createVector(p5.lerp(margin, p5.windowWidth - margin, nextXUV.x), p5.lerp(margin, p5.height - margin, nextXUV.y));
        const nextYPos = p5.createVector(p5.lerp(margin, p5.windowWidth - margin, nextYUV.x), p5.lerp(margin, p5.height - margin, nextYUV.y));

        p5.stroke(255);
        // p5.vertex(p5.lerp(margin, p5.windowWidth - margin, x + 1 / (xpoints - 1)), ypos);
        // p5.vertex(100, 100); // Top left
        // p5.vertex(200, 100); // Top right
        // p5.vertex(100, 200); // Bottom left
        // p5.vertex(200, 200); // Bottom right

        p5.vertex(thisPos.x, thisPos.y);
        p5.vertex(nextXPos.x, nextXPos.y);
        // p5.vertex(nextYPos.x, nextYPos.y);

        // p5.ellipse(xpos, ypos, 2);
        // p5.ellipse(thisPos.x, thisPos.y, 2);

        console.log(x);
        // p5.ellipse(nextXPos.x, nextXPos.y, 2);
      }
      p5.endShape();
    }
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
}
