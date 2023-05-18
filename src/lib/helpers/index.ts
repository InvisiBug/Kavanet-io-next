import { PageMetaData } from "src/lib/types";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateTestCard = ({ title, subTitle, status, slug }: Args): any => {
  return {
    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      subTitle: {
        rich_text: [
          {
            text: { content: subTitle },
          },
        ],
      },
      status: {
        select: { name: status },
      },
      slug: {
        rich_text: [
          {
            text: { content: slug },
          },
        ],
      },
    },
  };
};

export const getPageMetaData = (rawCardInfo: any) => {
  const { properties } = rawCardInfo;

  let data: PageMetaData = {};

  for (const property in properties) {
    switch (property) {
      case "title":
        data.title = properties[property]?.title[0]?.text?.content;
        break;

      case "slug":
        data.slug = properties[property]?.rich_text[0]?.text.content;
        break;

      case "subTitle":
        data.subTitle = properties[property]?.rich_text[0]?.text.content;
        break;

      case "thumbnail":
        const uploadedImage = properties[property]?.files[0]?.file?.url;
        const linkedImage = properties[property]?.files[0]?.external?.url;

        data.thumbnail = uploadedImage ? uploadedImage : linkedImage;
        break;

      case "tags":
        const tags: string[] = [];

        properties[property].multi_select.forEach((element: any) => {
          tags.push(element.name);
        });

        if (tags.length > 0) {
          data.tags = tags;
        }
        break;

      case "status":
        data.status = properties[property].select?.name;
        break;

      case "description":
        data.description = properties[property]?.rich_text[0]?.text.content;
        break;

      case "coverImage":
        const uploadedImage2 = properties[property]?.files[0]?.file?.url;
        const linkedImage2 = properties[property]?.files[0]?.external?.url;

        data.coverImage = uploadedImage2 ? uploadedImage2 : linkedImage2;
        break;

      case "cardType":
        data.cardType = properties[property].select?.name;
    }
  }

  return data;
};

export const getImageBlockUrl = (data: any) => {
  const { image } = data;
  return image?.file?.url ? image?.file?.url : image?.external?.url;
};

interface Args {
  title: string;
  subTitle: string;
  status: string;
  slug: string;
}

////////////////////////////////////////////////////////////////////////
//
// ######  #######
// #     # #
// #     # #
// ######  ######
// #             #
// #       #     #
// #        #####
//
///////////////////////////////////////////////////////////////////////

import p5, { Vector } from "p5";
import colours from "nice-color-palettes";

export const generateColours = (p5: p5, numColours: number) => {
  return p5.shuffle(colours[Math.floor(p5.random(0, colours.length))]).slice(0, numColours);
};

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

export const constrain = (p5: p5, pos: Vector, velocity: Vector, acceleration: Vector) => {
  acceleration.set(0, 0); // fixes the no boundry issue
  if (pos.x <= 0) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = 1;
  } else if (pos.x >= p5.width) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = p5.width - 1;
  } else if (pos.y <= 0) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = 1;
  } else if (pos.y >= p5.height) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = p5.height - 1;
  }
};

export const constrainCircle = (p5: p5, pos: Vector, velocity: Vector, acceleration: Vector, size: number) => {
  // acceleration.set(0, 0); // fixes the no boundry issue
  if (pos.x - size / 2 <= 0) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = 1 + size / 2;
  } else if (pos.x + size / 2 >= p5.width) {
    velocity.mult(p5.createVector(-1, 1));
    pos.x = p5.width - 1 - size / 2;
  } else if (pos.y - size / 2 <= 0) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = 1 + size / 2;
  } else if (pos.y + size / 2 >= p5.height) {
    velocity.mult(p5.createVector(1, -1));
    pos.y = p5.height - 1 - size / 2;
  }
};

export const myColours = ["#302F2D", "#464543", "#274666", "#24829F", "#86A95B"];

export const showFPS = (p5: p5) => {
  p5.push();
  p5.textSize(32);
  p5.fill(255);
  p5.strokeWeight(5);
  p5.stroke(0);
  p5.fill(255);
  p5.text(`${p5.frameRate().toFixed(0)}FPS`, 10, 30);
  p5.pop();
};
