let x1, y1;
let lev = 1;
let video;
let poseNet;
let pose;
let score = 0;
let time = 30;
var s = " ";

function setup() {
  createP("A red dot will appear on your nose. Get it in the big blue circles to get a point.");
  createP("Get 10 points or over in each level to win!");
  createP("There are 4 levels altogether!");
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Hide the video element, but still capture it
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
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height); // Draw the video feed
  pop();

  if (pose) {
    noStroke();
    fill(255, 0, 0);
    let noseX = width - pose.nose.x; // Invert the x-coordinate
    let noseY = pose.nose.y;
    ellipse(noseX, noseY, 20, 20); // Draw red dot on nose

    // Check for collision with circle 1
    if (dist(noseX, noseY, x1, y1) < 25) {
      score++;
      draw_circle1(); // Draw a new circle
    }
  }

  // Draw the blue circles
  fill(0, 0, 255);
  ellipse(x1, y1, 50, 50);

  // Display the score
  fill(0);
  textSize(32);
  text("Score: " + score, 10, 30);
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
      }, 2000);
    }
    if (lev == 2) {
      s = "Level 3!!!";
    }
  }
}
