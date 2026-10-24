import type p5 from "p5";
import type { SketchFactory } from "@/lib/components/P5Canvas";

function getCanvasSize(container: HTMLElement | null) {
  const fallbackWidth = 900;
  const width = container?.clientWidth ?? fallbackWidth;

  return {
    width,
    height: Math.round(width * 0.52),
  };
}

function getCanvasContainer(instance: p5): HTMLElement | null {
  const maybeCanvas = (instance as unknown as { canvas?: HTMLCanvasElement }).canvas;
  return maybeCanvas?.parentElement ?? null;
}

export const project2Sketch: SketchFactory = (p: p5) => {
  const agents = Array.from({ length: 40 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.007,
    vy: (Math.random() - 0.5) * 0.007,
  }));

  p.setup = () => {
    const { width, height } = getCanvasSize(getCanvasContainer(p));
    p.createCanvas(width, height);
  };

  p.windowResized = () => {
    const { width, height } = getCanvasSize(getCanvasContainer(p));
    p.resizeCanvas(width, height);
  };

  p.draw = () => {
    p.background(19, 37, 68);

    p.stroke(94, 234, 212, 60);
    p.strokeWeight(1.2);

    for (let index = 0; index < agents.length; index += 1) {
      const point = agents[index];
      point.x += point.vx;
      point.y += point.vy;

      if (point.x <= 0 || point.x >= 1) {
        point.vx *= -1;
      }

      if (point.y <= 0 || point.y >= 1) {
        point.vy *= -1;
      }

      const x = point.x * p.width;
      const y = point.y * p.height;

      p.noStroke();
      p.fill(125, 211, 252, 220);
      p.circle(x, y, 7);

      for (let inner = index + 1; inner < agents.length; inner += 1) {
        const target = agents[inner];
        const tx = target.x * p.width;
        const ty = target.y * p.height;
        const distance = p.dist(x, y, tx, ty);

        if (distance < 110) {
          p.stroke(45, 212, 191, p.map(distance, 0, 110, 120, 0));
          p.line(x, y, tx, ty);
        }
      }
    }

    p.noStroke();
    p.fill(248, 250, 252);
    p.textSize(16);
    p.text("Project 2: Dynamic Load Balancer Mesh", 20, 30);
  };
};
