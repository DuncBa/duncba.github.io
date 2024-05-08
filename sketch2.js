let xDirectionArray = [1, 0, -1, 0];
let yDirectionArray = [0, 1, 0, -1];
let directionIndex = 0;
//caterpillar section locations
let cX = [];
let cY = [];
//length
let len = 3;
//size of each section
let diameter = 10;
//food
let fx = [];
let fy = [];
let Lost = 0;
let amount = 10;
let Speed = 2;
let moving = false;
let BGM
let bgr


function setup() {
  cX[0] = 35;
  cY[0] = 15;
  cX[1] = 25;
  cY[1] = 15;
  cX[2] = 15;
  cY[2] = 15;
  createCanvas(400, 510);
  for (let i = 0; i < amount; i++) {
    fx[i] = round(random(1, 40)) * 10 - 5;
    fy[i] = round(random(1, 40)) * 10 - 5;
  }
  frameRate(10);
  textSize(20);
  directions();

  lose = createButton("Play Again?");
  lose.position(-100, -100);
  lose.mousePressed(reset);
}

function keyPressed() {
  if (moving == false) {
    if (keyCode === RIGHT_ARROW && directionIndex != 2) {
      directionIndex = 0;
      moving = true;
    } //if
    if (keyCode === LEFT_ARROW && directionIndex != 0) {
      directionIndex = 2;
      moving = true;
    } //if
    if (keyCode === UP_ARROW && directionIndex != 1) {
      directionIndex = 3;
      moving = true;
    } //if
    if (keyCode === DOWN_ARROW && directionIndex != 3) {
      directionIndex = 1;
      moving = true;
    } //if
    if (keyIsDown(68) === true && directionIndex != 2) {
      directionIndex = 0;
      moving = true;
    } //if
    if (keyIsDown(65) === true && directionIndex != 0) {
      directionIndex = 2;
      moving = true;
    } //if
    if (keyIsDown(87) === true && directionIndex != 1) {
      directionIndex = 3;
      moving = true;
    } //if
    if (keyIsDown(83) === true && directionIndex != 3) {
      directionIndex = 1;
      moving = true;
    } //if
  }
  if (keyIsDown(32) === true) {
    Speed = 2;
  } else {
    Speed = 1;
  }
} //keyPressed

function caterpillar() {
  //decreasing for loop
  //remember for loops index from 0 to length minus 1
  for (let i = len - 1; i > 0; i--) {
    cX[i] = cX[i - 1];
    cY[i] = cY[i - 1];
  }
  cX[0] += xDirectionArray[directionIndex] * 10;
  cY[0] += yDirectionArray[directionIndex] * 10;
  for (let i = 0; i < len; i++) {
    fill("green");
    cX[i] = constrain(cX[i], 5, 400 - 5);
    cY[i] = constrain(cY[i], 5, 400 - 5);
    circle(cX[i], cY[i], diameter);
  }
  moving = false;
}

function food() {
  for (let i = 0; i < amount; i++) {
    if (fx[i] == cX[0] && fy[i] == cY[0]) {
      fx[i] = round(random(1, 40)) * 10 - 5;
      fy[i] = round(random(1, 40)) * 10 - 5;
      len += 1;
      for (let i = 0; i < len; i++) {
        if (fx[i] == cX[i] && fy[i] == cY[i]) {
          fx[i] = round(random(1, 40)) * 10 - 5;
          fy[i] = round(random(1, 40)) * 10 - 5;
          food();
        }
      }
    }
    fill("red");
    circle(fx[i], fy[i], diameter);
  }
}

function kill() {
  for (let i = 1; i < len; i++) {
    if (cX[0] == cX[i] && cY[0] == cY[i]) {
      fill("white");
      text("You Lose =(", 160, 190);
      Lost = 1;
      lose.position(165, 200);
      lose.mousePressed(reset);
    }
    if (len == 1600) {
      fill("white");
      text("You Win!! =)", 160, 190);
      Lost = 1;
      lose.position(165, 200);
    }
  }
}

function reset() {
  len = 3;
  directionIndex = 0;
  cX = [];
  cY = [];
  fx = [];
  fy = [];

  cX[0] = 35;
  cY[0] = 15;
  cX[1] = 25;
  cY[1] = 15;
  cX[2] = 15;
  cY[2] = 15;
  for (let i = 0; i < amount; i++) {
    fx[i] = round(random(1, 40)) * 10 - 5;
    fy[i] = round(random(1, 40)) * 10 - 5;
  }
  Lost = 0;
  lose.position(-100, -100);
}

function directions() {
  upb = createButton("↑");
  upb.position(170, 410);
  upb.size(75, 40);
  upb.style("font-size", "28px");
  upb.mousePressed(up);

  downb = createButton("↓");
  downb.position(170, 460);
  downb.size(75, 40);
  downb.style("font-size", "28px");
  downb.mousePressed(down);

  leftb = createButton("→");
  leftb.position(260, 460);
  leftb.size(75, 40);
  leftb.style("font-size", "28px");
  leftb.mousePressed(right);

  rightb = createButton("←");
  rightb.position(80, 460);
  rightb.size(75, 40);
  rightb.style("font-size", "28px");
  rightb.mousePressed(left);
}

function up() {
  if (directionIndex != 1) {
    directionIndex = 3;
  }
}

function down() {
  if (directionIndex != 3) {
    directionIndex = 1;
  }
}

function left() {
  if (directionIndex != 0) {
    directionIndex = 2;
  }
}

function right() {
  if (directionIndex != 2) {
    directionIndex = 0;
  }
}

function draw() {
  if (Lost == 0) {
    for (let s = 0; s < Speed; s++) {
      background("black");
      fill("white");
      text("Length: " + len, 25, 430);
      text("Score: " + (len - 3) * 10, 290, 430);
      noStroke();
      rect(0, 400, 400, 5);
      food();
      caterpillar();
      kill();
    }
  }
}
