import p5 from "p5";
import { generateColours } from "src/lib/helpers";

export const sketch = (p5: p5) => {
  const config = {
    p5,
    colours: generateColours(p5, 5),
  };

  p5.setup = () => {
    // @ts-ignore
    p5.createCanvas(p5.windowWidth, p5.windowHeight, "svg");
  };

  p5.draw = () => {
    p5.background(50);
    p5.noLoop();

    const startY = p5.random(p5.height);

    let sunDrawn = false;

    [...Array(5)].forEach((_, index) => {
      const spacing = p5.random(300);

      const layer = startY + spacing * index;

      if (p5.random(1) < 0.3 && !sunDrawn) {
        // draw sun
        p5.push();
        p5.fill(255);
        p5.noStroke();
        p5.ellipse(p5.random(p5.width), startY, p5.random(50));

        p5.pop();
        sunDrawn = true;
      }

      drawRandomColour(layer, layer + 100);
    });

    // drawCrinkles();
  };

  const drawCrinkles = () => {
    const colour = p5.color("#F4F1DD");
    // colour.setAlpha(p5.random(5));
    colour.setAlpha(2);

    p5.noFill();
    p5.stroke(colour);
    p5.strokeWeight(2);

    for (let i = 0; i < 1000; i++) {
      const xmin = 0;
      const xmax = p5.width;

      const ymin = -p5.height;
      const ymax = p5.height * 2;

      // const ymin = -p5.height;
      // const ymax = p5.height;

      const pt1 = p5.createVector(xmin, p5.random(ymin, ymax));
      const pt2 = p5.createVector(p5.random(xmax), p5.random(ymin, ymax));
      const pt3 = p5.createVector(p5.random(xmax), p5.random(ymin, ymax));
      const pt4 = p5.createVector(xmax, p5.random(ymin, ymax));

      p5.bezier(pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y, pt4.x, pt4.y);
    }
  };

  const drawRandomColour = (top: number, bottom: number) => {
    const colour = p5.color(p5.random(config.colours));
    colour.setAlpha(p5.random(0, 100));
    p5.beginShape();

    p5.noStroke();
    p5.fill(colour);
    let noisePos = p5.random(1000);

    for (let x = 0; x < p5.width + 10; x += 10) {
      const y = p5.map(p5.noise(noisePos), 0, 1, bottom, top);

      p5.vertex(x, y);
      noisePos += 0.05;
    }

    p5.vertex(p5.width, p5.height);
    p5.vertex(0, p5.height);

    p5.endShape();
  };

  // p5.mouseClicked = () => {
  //   p5.loop();
  // };

  p5.mouseClicked = () => {
    // @ts-ignore
    // p5.saveSVG();
    p5.loop();
  };

  p5.keyPressed = (event: { key: string }) => {
    if (event.key === "s") {
      p5.save("something.svg");
    }
  };

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: p5;
  colours: string[];
}
