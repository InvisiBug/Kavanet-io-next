import { type Config } from "../../";
import p5 from "p5";

export default class Zombie {
  p5;
  size;
  speed;
  colour;

  acceleration;
  velocity;
  pos;

  sliderGroup: p5.Element[] = [];

  constructor(config: Config) {
    this.p5 = config.p5;
    this.colour = this.p5.color(48, 135, 180);
    this.size = 20;
    this.speed = config.speed;

    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));

    this.velocity.setMag(config.speed);
  }

  create = () => {
    const canvas = (this.p5 as unknown as { canvas: HTMLCanvasElement }).canvas;
    const canvasParent = canvas.parentElement;

    if (!canvasParent) {
      return;
    }

    canvasParent.style.position = "relative";

    const controls = this.p5.createDiv();
    controls.parent(canvasParent);
    controls.style("position", "absolute");
    controls.style("top", "10px");
    controls.style("left", "20%");
    controls.style("right", "10px");
    controls.style("z-index", "10");
    controls.style("display", "flex");
    controls.style("align-items", "flex-start");
    controls.style("justify-content", "space-between");
    controls.style("gap", "12px");

    const labels = ["Zombie speed", "Human speed", "Hunter speed"];

    for (let i = 0; i < 3; i++) {
      const row = this.p5.createDiv();
      row.parent(controls);
      row.style("min-width", "0");
      row.style("flex", "1 1 0");

      const text: p5.Element = this.p5.createP(labels[i]);
      text.parent(row);
      text.style("margin", "0 0 4px");
      text.style("color", "white");
      text.style("white-space", "nowrap");
      text.style("font-size", "12px");

      const defaultValue = i === 0 ? this.speed + 0.2 : i === 1 ? this.speed + 0.1 : this.speed - 0.1;
      this.sliderGroup[i] = this.p5.createSlider(0, 2, defaultValue, 0.1);
      this.sliderGroup[i].parent(row);
      this.sliderGroup[i].style("width", "100%");
      this.sliderGroup[i].style("max-width", "180px");
    }
  };

  getVals = () => {
    return {
      zombieSpeed: this.sliderGroup[0].value(),
      humanSpeed: this.sliderGroup[1].value(),
      hunterSpeed: this.sliderGroup[2].value(),
    };
  };
}
