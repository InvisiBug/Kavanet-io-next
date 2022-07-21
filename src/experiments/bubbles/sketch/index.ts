import p5 from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  const xpoints = 50;
  const ypoints = 75;
  const margin = 100;

  const sizes = {
    min: -10,
    max: 60,
  };

  const noise = {
    min: 0.2,
    max: 1,
  };

  const colours = ["#302F2D", "#464543", "#274666", "#24829F", "#86A95B"];

  const noiseMulti = 0.1;

  let noisePos = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.noLoop();
    p5.randomSeed(p5.random(9999));
  };

  p5.draw = () => {
    p5.background(50);

    for (let x = 0; x < xpoints; x++) {
      for (let y = 0; y < ypoints; y++) {
        p5.fill(p5.random(colours));
        p5.noStroke();

        // const size = p5.noise(noisePos);
        // const size = p5.map(p5.noise(noisePos), 0.3, 1, sizes.min, sizes.max);
        // console.log(size);
        // const size = noisePos;
        // console.log(size);

        const u = x / (xpoints - 1);
        const v = y / (ypoints - 1);

        // const size = p5.map(p5.noise(x, y), 0.1, 1, sizes.min, sizes.max);
        const size = p5.map(p5.noise(x * noiseMulti, y * noiseMulti), noise.min, noise.max, sizes.min, sizes.max);

        // const size = p5.map(p5.noise(x * noiseMulti, y * noiseMulti), noise.min, noise.max, sizes.min, sizes.max);
        // const size = p5.map(p5.noise(u * (noiseStart + noiseMulti), v * (noiseStart + noiseMulti)), 0.3, 1, sizes.min, sizes.max);
        // const size = p5.noise(u * (noiseStart + noiseMulti), v * (noiseStart + noiseMulti)) * 50;

        const xpos = p5.lerp(margin, p5.windowWidth - margin, u);
        const ypos = p5.lerp(margin, p5.height - margin, v);

        p5.ellipse(xpos, ypos, size);
        noisePos += 0.05;
      }
    }

    p5.textSize(p5.width / 8);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.strokeWeight(5);
    p5.stroke(0);
    p5.fill(255);
    p5.text("Matt Kavanagh", p5.width / 2, p5.height / 2);
    p5.frameRate(0.5);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
}
