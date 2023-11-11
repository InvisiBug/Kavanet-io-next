// https://gorillasun.de/blog/a-guide-to-hexagonal-grids-in-p5js
// Check if points are inside polygon => https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
import p5, { Vector } from "p5";

export const sketch = (p5: p5) => {
  const config = {
    p5,
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.strokeJoin(p5.ROUND);
  };

  p5.draw = () => {
    p5.background(50);
    p5.noLoop();

    p5.noFill();

    drawStars();

    drawJW();
  };

  const drawJW = () => {
    const levels = 2;
    const levelSeperation = 10;
    const mirrorSeperation = 20;

    p5.push();
    p5.stroke("#F3A712");

    p5.translate(p5.width / 2, p5.height / 2);
    // p5.ellipse(0, 0, 100);
    for (let i = 0; i < levels; i++) {
      polygon(0, 0, 50 - i * levelSeperation, 6);
      // polygon(0, 0, 50, 6);
    }

    // p5.line(500, 500, 400, 500);

    const points = 6;
    let angle = p5.TWO_PI / points;

    for (let a = -p5.PI / 2; a < p5.TWO_PI; a += angle) {
      const vect = Vector.fromAngle(a);
      vect.setMag(87 + mirrorSeperation);

      // p5.line(0, 0, vect.x, vect.y);
      for (let i = 0; i < levels; i++) {
        polygon(vect.x, vect.y, 50 - i * levelSeperation, 6);
      }
    }

    p5.pop();
  };

  const drawStars = () => {
    const xpoints = 10;
    const ypoints = 20;
    const margin = 20;

    p5.stroke("#F3A7122c");
    for (let x = 0; x < xpoints; x++) {
      for (let y = 0; y < ypoints; y++) {
        const u = x / (xpoints - 1);
        const v = y / (ypoints - 1);

        const xpos = p5.lerp(margin, p5.windowWidth - margin, u);
        const ypos = p5.lerp(margin, p5.height - margin, v);

        p5.push();

        p5.translate(xpos, ypos);
        let angle = p5.TWO_PI / 6;
        for (let a = -p5.PI / 2; a < p5.TWO_PI; a += angle) {
          const vect = Vector.fromAngle(a);
          vect.setMag(5);

          p5.line(0, 0, vect.x, vect.y);
          // for (let i = 0; i < 5; i++) {
          //   polygon(vect.x, vect.y, 50 - i * 5, 6);
          // }
        }
        p5.pop();

        // p5.ellipse(xpos, ypos, size);
      }
    }
  };

  function makeSpiral(centerX: number, centerY: number, radius: number, count: number) {
    var x = centerX;
    var y = centerY;
    var angle = p5.TAU / 6;
    var side = 0;

    const size = 10;

    drawHexagon(x, y, size / 1.75);
    count--;
    while (count > 0) {
      for (var t = 0; t < p5.floor((side + 4) / 6) + (side % 6) ? count : 0; t++) {
        y = y - radius * p5.cos(side * angle);
        x = x - radius * p5.sin(side * angle);
        drawHexagon(x, y, size / 1.75);
        count--;
      }
      side++;
    }
  }

  function makeSpiralV2(centerX: number, centerY: number, size: number, count: number) {
    var x = 0;
    var y = 0;

    const s = size / 1.75;

    p5.push();
    p5.translate(centerX, centerY);
    drawHexagon(centerX, centerY, size / 1.75);
    for (let n = 0; n < count; n++) {
      for (let i = 0; i < n; i++) {
        x++;
        drawHexagon(x * s, y * s, s / 1.75);
      } // move right
      for (let i = 0; i < n - 1; i++) {
        y++;
        drawHexagon(x * s, y * s, s / 1.75);
      } // move down right. Note N-1
      for (let i = 0; i < n; i++) {
        x--;
        y++;
        drawHexagon(x * s, y * s, s / 1.75);
      } // move down left
      for (let i = 0; i < n; i++) {
        x--;
        drawHexagon(x * s, y * s, s / 1.75);
      } // move left
      for (let i = 0; i < n; i++) {
        y--;
        drawHexagon(x * s, y * s, s / 1.75);
      } // move up left
      for (let i = 0; i < n; i++) {
        x++;
        y--;
        drawHexagon(x * s, y * s, s / 1.75);
      } // move up right
    }
    p5.pop();
  }

  function polygon(x: number, y: number, radius: number, npoints: number) {
    let angle = p5.TWO_PI / npoints;
    p5.beginShape();
    for (let a = 0; a < p5.TWO_PI; a += angle) {
      let sx = x + p5.cos(a) * radius;
      let sy = y + p5.sin(a) * radius;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }

  function drawHexagon(cX: number, cY: number, r: number) {
    p5.push();
    p5.beginShape();
    for (let a = 0; a < p5.TAU; a += p5.TAU / 6) {
      p5.vertex(cX + r * p5.cos(a), cY + r * p5.sin(a));
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  function recursiveHexagon(cX: number, cY: number, depth: number, r: number) {
    if (depth == 0) {
      drawHexagon(cX, cY, r);
    } else {
      recursiveHexagon(cX, cY, depth - 1, r / 2);
      for (let a = 0; a < p5.TAU; a += p5.TAU / 6) {
        var x = cX + r * p5.cos(a);
        var y = cY + r * p5.sin(a);

        if (depth > 0) {
          recursiveHexagon(x, y, depth - 1, r / 2);
        }
      }
    }
  }
};

export interface Config {
  p5: p5;
}
