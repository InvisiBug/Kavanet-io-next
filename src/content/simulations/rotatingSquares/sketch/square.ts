import { Config } from ".";

export default class Square {
  p5;
  colour;

  startingDistance;
  distance;
  rotation;

  thickness;
  _length;

  startingNoisePos;
  noisePos;
  noise;

  constructor(config: Config) {
    this.p5 = config.p5;
    this.colour = this.p5.color(this.p5.random(config.colours));

    this.distance = this.p5.random(250, 750);
    this.startingDistance = this.distance;
    this.rotation = this.p5.random(this.p5.radians(360));

    this.thickness = this.p5.random(20);
    this._length = this.p5.random(100);

    this.startingNoisePos = this.p5.random(100);
    this.noisePos = this.startingNoisePos;

    this.noise = 0;
  }

  updateColours = (colours: string[]) => {
    this.colour = this.p5.color(this.p5.random(colours));
  };

  update = () => {
    this.noisePos += 0.0001;
    this.noise = this.p5.noise(this.noisePos);

    this.rotation = this.p5.map(this.noise, 0.4, 0.9, this.p5.radians(0 - 90), this.p5.radians(360 - 90));
    this.distance = this.noise * this.startingDistance;
  };

  show = () => {
    this.p5.push();

    this.p5.rotate(this.rotation);

    this.p5.noFill();
    this.p5.stroke(this.colour);
    this.p5.strokeWeight(2);

    this.p5.rectMode(this.p5.CENTER);
    this.p5.rect(this.distance, 0, this.thickness, this._length);

    this.p5.pop();
  };
}
