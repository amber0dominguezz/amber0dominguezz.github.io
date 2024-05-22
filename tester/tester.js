let circleX = 320;
let circleY = 320;
let circleSize = 60;
let gameState = "L1"
let video;
let poseNet;
let pose;
let circle;
let score = 0;
let time = 30;

function preload () {
  facehere = loadImage('https://amber0dominguezz.github.io/images/IMG_4148.webp');
  
}

function setup() {
  createCanvas(640, 640);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  drawCircle();
}

function gotPoses(poses) {
  if(poses.length > 0) {
    pose = poses[0].pose;
  }
}


function draw() {
  image(video, 0, 0, width, height);

  if (pose) {
    // Draw the red dot on the nose
    noStroke();
    fill('rgb(255,0,0)');
    circle(pose.nose.x, pose.nose.y, 20);
    
    noFill();
    strokeWeight(6);
    stroke(0, 0, 255);

    // Check for collisions and update score
    if (dist(pose.nose.x, pose.nose.y, circleX, circleY) < circleSize / 2) {
      drawCircle();
    }
  }

  if (gameState=="L1"){
  levelOne();
  } 
  if (gameState=="L2"){
   levelTwo(); 
  }
  if (gameState=="L3"){
   levelThree(); 
  }
  if (gameState=="L4"){
    levelFour();
  }
  if (gameState=="L5"){
    levelFive();
  }
  
  text(("Score: " + score), width/2, 40);
  
 } // end draw


function levelOne() {
  image(video, 0, 0, width, height);
  image(facehere, 0, 0, 800, 600);

  if (pose) {
    var distToBall = dist(circleX, circleY, pose.nose.x, pose.nose.y);
    if (distToBall < 1 ) {
      gameState = "L1";
    }
  }
}

function levelTwo() {
  image(video, 0, 0, width, height);

  if (pose) {
    var distToBall = dist(circleX, circleY, pose.nose.x, pose.nose.y);
    if (distToBall < 2) {
      gameState = "L2";
    }
  }

  ellipse(circleX, circleY, circleSize, circleSize);
}
  
  function levelThree() {
  image(video, 0, 0, width, height);

  if (pose) {
    var distToBall = dist(circleX, circleY, pose.nose.x, pose.nose.y);
    if (distToBall < 3) {
      gameState = "L3";
    }
  }

  ellipse(circleX, circleY, circleSize, circleSize);
}
  
  
   function levelFour() {
   image(video, 0, 0, width, height);

  if (pose) {
    var distToBall = dist(circleX, circleY, pose.nose.x, pose.nose.y);
    if (distToBall < 4) {
      gameState = "L4";
    }
  }

  ellipse(circleX, circleY, circleSize, circleSize);
}

 function levelFive() {
 image(video, 0, 0, width, height);

  if (pose) {
    var distToBall = dist(circleX, circleY, pose.nose.x, pose.nose.y);
    if (distToBall < 5) {
      gameState = "L5";
    }
  }

  ellipse(circleX, circleY, circleSize, circleSize);
}
  
  
