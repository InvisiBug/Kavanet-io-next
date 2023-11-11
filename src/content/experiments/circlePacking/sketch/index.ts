import p5 from "p5";
import Circle from "./circle";
import { generateColours } from "src/content/plots/helpers";

export const sketch = (p5: p5) => {
  const config = {
    p5,
    colours: generateColours(p5, 5),
  };

  let circles: Circle[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(50);

    // Limits the total number of expanding circles
    let expandingCircles = 0;
    for (const circle of circles) {
      if (circle.growing) {
        expandingCircles += 1;
      }
    }

    if (expandingCircles < 10) {
      newCircle();
    }

    for (const circle of circles) {
      if (circle.growing) {
        // Stop growing when touching an edge
        if (circle.touchingEdge()) {
          circle.growing = false;
        } else {
          // Stop growing when touching other circle

          for (const otherCircle of circles) {
            if (circle !== otherCircle) {
              const d = p5.dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
              if (d < circle.radius + otherCircle.radius) {
                circle.growing = false;
                break;
              }
            }
          }
        }
      }

      circle.update();
      circle.show();
    }
  };

  p5.mouseClicked = () => {
    // const cnv = p5.createImage(p5.width, p5.height);
    // p5.save(cnv, "myCanvas.jpg");
    // // Saves the canvas as an image by default
    // p5.save("myCanvas.jpg");
  };

  const newCircle = () => {
    // Choose a point
    const pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));

    let valid = true;

    // Loot at all current circles
    for (const circle of circles) {
      const dist = p5.dist(pos.x, pos.y, circle.x, circle.y);

      // if the dist between the point and middle of the circle is less than fircle radius (inside circle raduis)
      // set this point as invalid
      if (dist <= circle.radius * 1.1 + circle.thickness) {
        valid = false;
        break;
      }
    }

    // if the point is valid, create a new circle at that point
    if (valid) {
      circles.push(new Circle(config, pos.x, pos.y));
    }
  };
};

export interface Config {
  p5: p5;
  colours: string[];
}
