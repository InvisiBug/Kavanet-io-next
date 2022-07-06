/* eslint-disable */
class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hit = false;
    this.t = 0;
    // this.sound = new Audio('pop2.mp3');
  }
  draw() {
    if (!this.hit) star(this.x, this.y, 6, 14, 5);
    if (this.hit && this.t < 50) {
      for (let i = 0; i < 7; i++) {
        push();
        translate(this.x + this.t * cos((i * 2 * PI) / 7), this.y + this.t * sin((i * 2 * PI) / 7));
        rotate((i * 2 * PI) / 30 + PI / 2);
        star(0, 0, (6 / (this.t + 5)) * 5, (14 / (this.t + 5)) * 5, 5);
        pop();
      }
      this.t += 2;
    }
  }
}

let p = {
  pos: {
    x: 200,
    y: 200,
    prevx: 200,
    prevy: 200,
  },
  vel: {
    x: 0,
    y: 0,
  },
  pend: {
    x: 200,
    y: 0,
    l: 75,
    amp: 1,
  },
  state: "swing",
};

let coins = [];

let coinpos = [0, 0];

let platforms = [];

let platformLength = 200;

// console.log(coins)

function setup() {
  createCanvas(800, 620);
  for (let i = 0; i < 25; i++) {
    // coins.push([random(-1000, 6500), random(100, 300)])
    // coins.push([random(-1000, 6500), random(300, 550)])
    // coins.push([random(-1000, 6500), random(300, 550)])

    if (i % 2 == 0) {
      platforms.push([i * 300 - 1000, random(150, 300)]);
      coins.push([new Star(random(i * 300 - 1000, i * 300 + 150 - 1000), random(320, 420))]);
    }
    if (i % 2 == 1) {
      platforms.push([i * 300 - 1000, random(10, 20)]);
      coins.push([new Star(random(i * 300 - 1000, i * 300 + 150 - 1000), random(100, 200))]);
    }
  }
  console.log(coins[0][0]);
  th = 0;
  thstart = 1;
  pth = 0;
  t = 0;
  easing = 0;
  score = 0;
  combo = 0;
}

function draw() {
  background(220);
  textSize(20);
  stroke(0);
  fill(0);
  text(score, 10, 20);
  // console.log(-coinpos[0] + width/2, -coinpos[0] + p.pend.x)
  if (p.state == "swing" && round(easing) != round(-coinpos[0] + width / 2 - (-coinpos[0] + p.pend.x))) {
    if (round(easing) > round(-coinpos[0] + width / 2 - (-coinpos[0] + p.pend.x))) {
      easing -= 1;
    } else {
      easing += 1;
    }
  }
  translate(easing, 0);

  if (p.state == "swing") {
    if (p.pend.amp > 0.1) p.pend.amp *= 0.997;
    th += 0.053 * thstart;
    pth = p.pend.amp * sin(th) + PI / 2;

    p.pos.x = p.pend.x + p.pend.l * cos(pth);
    p.pos.y = p.pend.y + p.pend.l * sin(pth);

    p.vel.x = p.pos.x - p.pos.prevx;
    if (abs(p.vel.x) > 10) p.vel.x = (p.vel.x / abs(p.vel.x)) * 10;
    if (abs(p.vel.x) < 1) p.vel.x = (p.vel.x / abs(p.vel.x)) * 1;
    p.vel.y = p.pos.y - p.pos.prevy;

    p.pos.prevx = p.pos.x;
    p.pos.prevy = p.pos.y;

    fill(0);
    line(p.pos.x, p.pos.y, p.pend.x, p.pend.y);
    circle(p.pos.x, p.pos.y, 20);

    translate(coinpos[0], coinpos[1]);
    fill(175);
    for (let i = 0; i < platforms.length; i++) {
      rect(platforms[i][0], platforms[i][1], platformLength, 10);
    }
    fill("red");
    rect(-10000, 600, 20000, 20);
    fill("yellow");

    for (let i = 0; i < coins.length; i++) {
      if (dist(p.pos.x, p.pos.y, coinpos[0] + coins[i][0].x, coinpos[1] + coins[i][0].y) < 15 && coins[i][0].hit == false) {
        // coins.splice(i, 1)
        score += 1;
        coins[i][0].hit = true;
      }
      coins[i][0].draw();
    }
  }
  if (p.state == "fall") {
    if (p.pos.x - coinpos[0] < -1050) {
      p.vel.x *= -1;
    }

    if (p.pos.x - coinpos[0] > 6550) {
      p.vel.x *= -1;
    }

    // console.log(coinpos)
    // p.pos.x += p.vel.x;
    coinpos[0] -= p.vel.x;
    p.pos.y += p.vel.y;

    p.vel.y += 0.1;

    fill(0);
    circle(p.pos.x, p.pos.y, 20);
    // if(combo){
    //   text('x' + combo, p.pos.x - 10 - 25 * p.vel.x/abs(p.vel.x), p.pos.y)
    // }

    translate(coinpos[0], coinpos[1]);
    fill("red");

    rect(-10000, 600, 20000, 20);
    fill(175);

    for (let i = 0; i < platforms.length; i++) {
      rect(platforms[i][0], platforms[i][1], platformLength, 10);
      if (
        p.pos.x > coinpos[0] + platforms[i][0] &&
        p.pos.x < coinpos[0] + platforms[i][0] + platformLength &&
        platforms[i][1] - p.pos.y < 10 &&
        platforms[i][1] - p.pos.y > 0 &&
        p.vel.y > 0
      ) {
        p.vel.y = -p.vel.y * 0.5;
        p.pos.y += p.vel.y * 2;
      }
    }

    fill("yellow");
    for (let i = 0; i < coins.length; i++) {
      if (dist(p.pos.x, p.pos.y, coinpos[0] + coins[i][0].x, coinpos[1] + coins[i][0].y) < 15 && coins[i][0].hit == false) {
        // coins.splice(i, 1)
        score += 1;
        coins[i][0].hit = true;
      }
      coins[i][0].draw();
    }
  }

  if (p.pos.y > 590) {
    p.state = "dead";
    fill(0);
    circle(p.pos.x, p.pos.y, 20);

    stroke("red");
    textSize(60);
    text("SPLAT!", p.pend.x, p.pend.y + 200);
    textSize(18);
    text("click to restart", p.pend.x + 50, p.pend.y + 220);

    translate(coinpos[0], coinpos[1]);

    fill("red");
    rect(-10000, 600, 20000, 20);

    fill(175);

    for (let i = 0; i < platforms.length; i++) {
      rect(platforms[i][0], platforms[i][1], platformLength, 10);
    }

    fill("yellow");
    for (let i = 0; i < coins.length; i++) {
      if (dist(p.pos.x, p.pos.y, coinpos[0] + coins[i][0], coinpos[1] + coins[i][1]) < 13) {
        coins.splice(i, 1);
      } else {
        circle(coins[i][0], coins[i][1], 10);
      }
    }
  }
}

function keyPressed() {
  let underPlatform = false;
  let platformHeight = 0;
  for (let i = 0; i < platforms.length; i++) {
    if (
      p.pos.x > coinpos[0] + platforms[i][0] &&
      p.pos.x < coinpos[0] + platforms[i][0] + platformLength &&
      p.pos.y > coinpos[1] + platforms[i][1] + 13
    ) {
      underPlatform = true;
      platformHeight = platforms[i][1] + 10;
    }
  }

  if (p.state == "fall" && p.pos.y > 13 && underPlatform) {
    if (p.pos.x) p.pend.x = p.pos.x;
    p.pend.y = platformHeight;
    p.pend.l = p.pos.y - p.pend.y;
    th = 0;
    thstart = -p.vel.x / abs(p.vel.x);
    pth = PI / 2;
    p.pend.amp = (max(0.5, abs(p.vel.x)) * 100) / p.pend.l ** 1.2;
    p.pend.amp = min(1.7, p.pend.amp);
    // console.log(p.pend.amp)
    p.state = "swing";
    combo = 0;
  }

  if (p.state == "dead") {
    p = {
      pos: {
        x: 200,
        y: 200,
        prevx: 200,
        prevy: 200,
      },
      vel: {
        x: 0,
        y: 0,
      },
      pend: {
        x: 200,
        y: 0,
        l: 75,
        amp: 1,
      },
      state: "swing",
    };

    coins = [];

    coinpos = [0, 0];

    platforms = [];

    // console.log(coins)
    for (let i = 0; i < 25; i++) {
      // coins.push([random(-1000, 6500), random(100, 300)])
      // coins.push([random(-1000, 6500), random(300, 550)])
      // coins.push([random(-1000, 6500), random(300, 550)])

      if (i % 2 == 0) {
        platforms.push([i * 300 - 1000, random(150, 300)]);
        coins.push([new Star(random(i * 300 - 1000, i * 300 + 150 - 1000), random(320, 420))]);
      }
      if (i % 2 == 1) {
        platforms.push([i * 300 - 1000, random(10, 20)]);
        coins.push([new Star(random(i * 300 - 1000, i * 300 + 150 - 1000), random(100, 200))]);
      }
    }
    th = 0;
    thstart = 1;
    pth = 0;
    t = 0;
    easing = 0;
    stroke(0);
    score = 0;
  }
}

function keyReleased() {
  if (p.pos.y > 0 && p.state == "swing") {
    p.state = "fall";
    p.vel.y -= 2;
    // p.vel.x *= 2
  }
}

function mousePressed() {
  let underPlatform = false;
  let platformHeight = 0;
  for (let i = 0; i < platforms.length; i++) {
    if (
      p.pos.x > coinpos[0] + platforms[i][0] &&
      p.pos.x < coinpos[0] + platforms[i][0] + platformLength &&
      p.pos.y > coinpos[1] + platforms[i][1] + 13
    ) {
      underPlatform = true;
      platformHeight = platforms[i][1] + 10;
    }
  }

  if (p.state == "fall" && p.pos.y > 13 && underPlatform) {
    if (p.pos.x) p.pend.x = p.pos.x;
    p.pend.y = platformHeight;
    p.pend.l = p.pos.y - p.pend.y;
    th = 0;
    thstart = -p.vel.x / abs(p.vel.x);
    pth = PI / 2;
    p.pend.amp = (max(0.5, abs(p.vel.x)) * 100) / p.pend.l ** 1.2;
    p.pend.amp = min(1.7, p.pend.amp);
    // console.log(p.pend.amp)
    p.state = "swing";
    combo = 0;
  }

  if (p.state == "dead") {
    p = {
      pos: {
        x: 200,
        y: 200,
        prevx: 200,
        prevy: 200,
      },
      vel: {
        x: 0,
        y: 0,
      },
      pend: {
        x: 200,
        y: 0,
        l: 75,
        amp: 1,
      },
      state: "swing",
    };

    coins = [];

    coinpos = [0, 0];

    platforms = [];

    // console.log(coins)
    for (let i = 0; i < 25; i++) {
      // coins.push([random(-1000, 6500), random(100, 300)])
      // coins.push([random(-1000, 6500), random(300, 550)])
      // coins.push([random(-1000, 6500), random(300, 550)])

      if (i % 2 == 0) {
        platforms.push([i * 300 - 1000, random(150, 300)]);
        coins.push([new Star(random(i * 300 - 1000, i * 300 + 150 - 1000), random(320, 420))]);
      }
      if (i % 2 == 1) {
        platforms.push([i * 300 - 1000, random(10, 20)]);
        coins.push([new Star(random(i * 300 - 1000, i * 300 + 150 - 1000), random(100, 200))]);
      }
    }
    th = 0;
    thstart = 1;
    pth = 0;
    t = 0;
    easing = 0;
    stroke(0);
    score = 0;
  }
}

function mouseReleased() {
  if (p.pos.y > 0 && p.state == "swing") {
    p.state = "fall";
    p.vel.y -= 2;
    // p.vel.x *= 2
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
