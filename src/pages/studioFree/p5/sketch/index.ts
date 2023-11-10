import { P5CanvasInstance, ReactP5Wrapper, SketchProps } from "react-p5-wrapper";
import { Gym, ActivitiesEntity } from "../types";
import { parseSchedule } from "../utils";

type MySketchProps = SketchProps & {
  sketchProps: Gym;
};

export const sketch = (p5: P5CanvasInstance<MySketchProps>) => {
  const config = {
    p5,
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(50);
  };

  // @ts-ignore:next-line (updateWithProps does exist but not in the typings)
  p5.updateWithProps = ({ sketchProps }: { sketchProps: Gym }) => {
    const { activities } = sketchProps;

    const schedule = parseSchedule(activities);

    console.log(schedule);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: P5CanvasInstance<MySketchProps>;
}
