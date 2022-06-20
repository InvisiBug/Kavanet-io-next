// https://youtu.be/--6eyLO78CY
import p5 from "p5";

export const sketch = (p5: p5) => {
  let angle = 0;
  const width = 80;
  let cols: number;
  let rows: number;

  p5.setup = () => {
    p5.createCanvas(800, 800);
    cols = p5.width / width - 1;
    rows = p5.height / width - 1;
  };

  p5.draw = () => {
    const diameter = width - 10;
    const radius = diameter / 2;
    p5.background(50);

    p5.stroke(255);
    p5.noFill();

    //* X points
    for (let i = 0; i < cols; i++) {
      const circlex = width + (i * width + width / 2);
      const circley = width / 2;

      p5.strokeWeight(1);
      p5.stroke(255);
      p5.ellipse(circlex, circley, diameter, diameter);

      const pointx = radius * p5.cos(angle * (i + 1) - p5.PI / 2);
      const pointy = radius * p5.sin(angle * (i + 1) - p5.PI / 2);

      //? Point
      p5.strokeWeight(8);
      p5.point(circlex + pointx, circley + pointy);

      //? Vertical Line
      p5.stroke(255, 50);
      p5.strokeWeight(1);
      p5.line(circlex + pointx, 0, circlex + pointx, p5.height);
    }

    //* Y points
    for (let i = 0; i < rows; i++) {
      const circlex = width / 2;
      const circley = width + (i * width + width / 2);

      p5.strokeWeight(1);
      p5.stroke(255);
      p5.ellipse(circlex, circley, diameter, diameter);

      const pointx = radius * p5.cos(angle * (i + 1) - p5.PI / 2);
      const pointy = radius * p5.sin(angle * (i + 1) - p5.PI / 2);

      //? Point
      p5.strokeWeight(8);
      p5.point(circlex + pointx, circley + pointy);

      //? Vertical Line
      p5.stroke(255, 50);
      p5.strokeWeight(1);
      p5.line(0, circley + pointy, p5.width, circley + pointy);
    }
    angle += 0.01;
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface SimSettings {
  p5: p5;
  moonImg: p5.Image;
  rocketImg: p5.Image;
  obstacleImg: p5.Image;
  totalRockets: number;
  lifespan: number;
  speed: number;
  totalObstacles: number;
}
