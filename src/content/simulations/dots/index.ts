import p5 from "p5";
import Dot from "./dot";
import { generateColours, getCanvasSize, getCanvasContainer } from "../helpers";
import MasterDot from "./masterDot";
// import { drawGradientBackground } from "../../helpers";

export const sketch = (p5: p5) => {
  const { width, height } = getCanvasSize(getCanvasContainer(p5));
  const numColours = 5; // Max 5
  const config: Config = {
    p5: p5,
    speed: 0.2,
    colours: generateColours(p5, 5),
    connectionDistance: 150,
    numDots: width / 10,
    numMasterDots: 10,
  };

  const sliderGroup: p5.Element[] = [];

  const dots: Dot[] = [];
  const masterDots: MasterDot[] = [];
  const backgroundColours = [p5.random(config.colours), p5.random(config.colours)];

  p5.setup = () => {
    p5.createCanvas(width, height);
    console.log("hello from dots");

    for (let i = 0; i < config.numDots; i++) {
      dots.push(new Dot(config));
    }

    for (let i = 0; i < config.numMasterDots; i++) {
      masterDots.push(new MasterDot(config));
    }

    // for (var i = 0; i < 6; i++) {
    //   sliderGroup[i] = p5.createSlider(0, 400, 0);

    //   const h = p5.map(i, 0, 6, 5, 200);
    //   sliderGroup[i].position(10, 50 + h);
    //   sliderGroup[i].style("width", "80px");
    // }
  };

  p5.draw = () => {
    console.log(p5.frameRate());
    // drawGradientBackground(p5, "#18328B", "#084B38");
    // drawGradientBackground(p5, backgroundColours[0], backgroundColours[1]);
    // p5.background(0, 50);
    // p5.background(0, 100);
    p5.background(30);

    // let X = sliderGroup[0].value();
    // let Y = sliderGroup[1].value();
    // let Z = sliderGroup[2].value();
    // let centerX = sliderGroup[3].value();
    // let centerY = sliderGroup[4].value();
    // let centerZ = sliderGroup[5].value();

    dots.forEach((dot) => {
      dot.connect(dots);
      dot.show();
      dot.update();
      masterDots.forEach((masterDot) => {
        masterDot.applyVectors(dot);
      });
    });

    masterDots.forEach((masterDot) => {
      masterDot.update();
      masterDot.show();
    });
  };
};

export interface Config {
  p5: p5;
  speed: number;
  colours: string[];
  connectionDistance: number;
  numDots: number;
  numMasterDots: number;
}
