let x1, y1;
let lev = 1;
let video;
let poseNet;
let pose;
let c1;
let score = 0;
let time = 30;
var s = " ";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  draw_circle1();
}

function draw_circle1() {
  x1 = floor(random(50, 350));
  y1 = floor(random(50, 350));
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelReady() {
  console.log("Model has been readied");
  setInterval(timer, 1000);
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);
  if (pose) {
    // Draw the red dot on the nose
    noStroke();
    fill('rgb(255,0,0)');
    circle(pose.nose.x, pose.nose.y, 20);
    noFill();
    strokeWeight(6);
    stroke(0, 0, 255);
    
    // Drawing circle based on level
    c1 = createVector(x1, y1);
    let circleSize = lev === 4 ? 35 : 70;
    ellipse(c1.x, c1.y, circleSize);

    // Check for collisions and update score
    if (dist(pose.nose.x, pose.nose.y, c1.x, c1.y) < 35) {
      score++;
      draw_circle1();
    }
  }

  // Display score, time, and level
  var SCORE = "Score: " + score;
  noStroke();
  fill('rgba(255,255,255,0.4)');
  rect(0, 0, width, height);
  fill('rgb(0,0,0)');
  textSize(40);
  textAlign(LEFT, TOP);
  text(SCORE, 10, 10);
  textAlign(RIGHT, TOP);
  text(time, 600, 10);
  textAlign(CENTER, TOP);
  text("Level " + lev, 335, 10);

  // Level advancement conditions
  if (score > 9) {
    if (lev <= 4) {
      gameOver1();
      time = 20;
    }
  }

  // Game over condition
  if (time == 0) {
    if (score < 10) {
      lev = 5;
      s = "Better luck next time!👍";
      gameOver1();
    }
  }
}

function timer() {
  if (time > 0) {
    time--;
  }
}

function gameOver1() {
  background(255, 255, 0);
  if (score >= 10) {
    if (lev == 1) {
      s = "Level 2!!!";
      setTimeout(() => {
        score = 0;
        background('rgba(0,0,0,1)');
        lev = 2;
        time = 20;
      }, 2000)
    }
    if (lev == 2) {
      s = "Level 3!!!";
      setTimeout(() => {
        score = 0;
        background('rgba(0,0,0,1)');
        time = 20;
        lev = 3;
      }, 2000)
    }
    if (lev == 3) {
      s = "Level 4!!!";
      setTimeout(() => {
        score = 0;
        background('rgba(0,0,0,1)');
        time = 20;
        lev = 4;
      }, 2000)
    }
    if (lev == 4) {
      s = "Well done!!!";
      noLoop();
    }
  }
  if (lev == 5) {
    text(s, 310, 200);
    noLoop();
  }
  background(255, 255, 0);
  textSize(30);
  fill('rgb(0,0,0)');
  text(s, 310, 200);
}
