import type p5 from "p5";
import { getCanvasSize, getCanvasContainer } from "../helpers";

export const project1Sketch = (p: p5) => {
  const nodeCount = 60;

  p.setup = () => {
    const { width, height } = getCanvasSize(getCanvasContainer(p));
    p.createCanvas(width, height);
    p.noStroke();
  };

  p.windowResized = () => {
    const { width, height } = getCanvasSize(getCanvasContainer(p));
    p.resizeCanvas(width, height);
  };

  p.draw = () => {
    p.background(12, 22, 44);

    for (let index = 0; index < nodeCount; index += 1) {
      const phase = (p.frameCount * 0.015 + index * 0.37) % p.TWO_PI;
      const x = p.map(index, 0, nodeCount - 1, 60, p.width - 60);
      const y = p.height * 0.5 + Math.sin(phase) * 110;
      const pulse = 10 + Math.sin(phase * 2.2) * 5;

      p.fill(56, 189, 248, 130);
      p.circle(x, y, pulse);

      if (index > 0) {
        const prevX = p.map(index - 1, 0, nodeCount - 1, 60, p.width - 60);
        const prevY = p.height * 0.5 + Math.sin((p.frameCount * 0.015 + (index - 1) * 0.37) % p.TWO_PI) * 110;
        p.stroke(148, 163, 184, 70);
        p.strokeWeight(1.5);
        p.line(prevX, prevY, x, y);
        p.noStroke();
      }
    }

    p.fill(248, 250, 252);
    p.textSize(16);
    // p.text("Project 1: Cache Flow Simulation", 20, 30);
  };
};
