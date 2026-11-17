import p5 from "p5";
import Dot, { buildDotGrid } from "./dot";
import { generateColours, getCanvasSize, getCanvasContainer } from "../helpers";
import MasterDot from "./masterDot";
import blackHoleImg from "./blackhole2.png";
// import { drawGradientBackground } from "../../helpers";

const connectionDistance = 150;

export const sketch = (p5: p5) => {
  const { width, height } = getCanvasSize(getCanvasContainer(p5));
  const numColours = 5; // Max 5

  const sliderGroup: p5.Element[] = [];

  const dots: Dot[] = [];
  const masterDots: MasterDot[] = [];
  let showSpatialGrid = false;

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.noLoop();

    const canvasContainer = getCanvasContainer(p5);
    if (!canvasContainer) {
      console.error("Unable to find the dots simulation canvas container.");
      return;
    }

    const gridToggle = p5.createCheckbox(" Show spatial grid", showSpatialGrid);
    gridToggle.parent(canvasContainer);
    gridToggle.style("position", "absolute");
    gridToggle.style("top", "12px");
    gridToggle.style("left", "12px");
    gridToggle.style("z-index", "1");
    gridToggle.style("padding", "8px 10px");
    gridToggle.style("border-radius", "8px");
    gridToggle.style("background", "rgba(0, 0, 0, 0.65)");
    gridToggle.style("color", "white");

    const checkboxInput = gridToggle.elt.querySelector("input");
    if (checkboxInput instanceof HTMLInputElement) {
      checkboxInput.addEventListener("change", () => {
        showSpatialGrid = checkboxInput.checked;
      });
    }

    p5.loadImage(blackHoleImg)
      .then((loadedBlackHoleImg) => {
        const config: Config = {
          p5: p5,
          speed: 0.2,
          colours: generateColours(p5, 5),
          connectionDistance,
          numDots: width / 10,
          numMasterDots: 10,
          blackHoleImg: loadedBlackHoleImg,
          backgroundColours: [],
          imageSize: 30,
        };

        config.backgroundColours = [p5.random(config.colours), p5.random(config.colours)];

        for (let i = 0; i < config.numDots; i++) {
          dots.push(new Dot(config));
        }

        for (let i = 0; i < config.numMasterDots; i++) {
          masterDots.push(new MasterDot(config));
        }

        p5.loop();
      })
      .catch((error: unknown) => {
        console.error("Unable to load the dots simulation image.", error);
      });

    // for (var i = 0; i < 6; i++) {
    //   sliderGroup[i] = p5.createSlider(0, 400, 0);

    //   const h = p5.map(i, 0, 6, 5, 200);
    //   sliderGroup[i].position(10, 50 + h);
    //   sliderGroup[i].style("width", "80px");
    // }
  };

  p5.draw = () => {
    // drawGradientBackground(p5, "#18328B", "#084B38");
    // drawGradientBackground(p5, backgroundColours[0], backgroundColours[1]);
    // p5.background(0, 50);
    // p5.background(0, 100);
    p5.background(30);

    if (showSpatialGrid) {
      p5.push();
      p5.stroke(255, 255, 255, 45);
      p5.strokeWeight(1);
      for (let x = 0; x <= p5.width; x += connectionDistance) {
        p5.line(x, 0, x, p5.height);
      }
      for (let y = 0; y <= p5.height; y += connectionDistance) {
        p5.line(0, y, p5.width, y);
      }
      p5.pop();
    }

    // let X = sliderGroup[0].value();
    // let Y = sliderGroup[1].value();
    // let Z = sliderGroup[2].value();
    // let centerX = sliderGroup[3].value();
    // let centerY = sliderGroup[4].value();
    // let centerZ = sliderGroup[5].value();

    dots.forEach((dot) => {
      dot.update();
      masterDots.forEach((masterDot) => {
        masterDot.applyVectors(dot);
      });
    });

    const dotGrid = buildDotGrid(dots, connectionDistance);
    dots.forEach((dot) => {
      dot.connect(dotGrid);
      dot.show();
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
  blackHoleImg: p5.Image;
  backgroundColours: string[];
  imageSize: number;
}
