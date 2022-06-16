import p5 from "p5";

export const test = () => {
  console.log("test");
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const drawGradientBackground = (p5: p5, colour1: string, colour2: string) => {
  const c1 = p5.color(colour1);
  const c2 = p5.color(colour2);

  c1.setAlpha(20);
  c2.setAlpha(20);

  for (let x = 0; x < p5.width + 1; x++) {
    const n = p5.map(x, 0, p5.width, 0, 1);
    let newc = p5.lerpColor(c1, c2, n);

    p5.stroke(newc);
    p5.line(x, -1, x, p5.height);
    p5.pop();
  }

  // for (let y = 0; y < p5.height; y++) {
  //   const n = p5.map(y, 0, p5.height, 0, 1);
  //   let newc = p5.lerpColor(c1, c2, n);
  //   p5.stroke(newc);
  //   p5.line(0, y, p5.width, y);
  // }
};
