import p5, { Vector } from "p5";
import { SimSettings } from "./index";

export default class DNA {
  p5;
  genes: Array<p5.Vector> = [];

  speed;
  simSettings;

  constructor(simSettings: SimSettings, newGenes: Array<p5.Vector> | null = null) {
    this.simSettings = simSettings;
    this.p5 = simSettings.p5;
    this.speed = simSettings.speed;

    //* Generate random genes if none are provided
    if (newGenes) {
      this.genes = newGenes;
    } else {
      for (let i = 0; i < this.simSettings.lifespan; i++) {
        const vector = Vector.random2D();
        vector.setMag(this.speed);
        this.genes.push(vector);
      }
    }
  }

  //* Mutate a section of this DNA object
  // Has a chance to create random data in each position in the gene array
  mutation = () => {
    for (let i = 0; i < this.genes.length; i++) {
      const val = this.p5.random(1);

      if (val < 0.01) {
        this.genes[i] = Vector.random2D();
        this.genes[i].setMag(this.speed);
      }
    }
  };

  //* Boogie and create some new genes
  // Gene array is created by randomly choosing a gene from parent 1 or 2
  // Then returned
  boogieWith = (partner: DNA) => {
    let newGenes: Array<p5.Vector> = [];

    const mid = this.p5.floor(this.p5.random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    return new DNA(this.simSettings, newGenes);
  };
}
