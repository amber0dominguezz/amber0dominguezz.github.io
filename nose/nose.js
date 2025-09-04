let x1, y1;
let lev = 1; 
let video;
let poseNet;
let pose;
let score = 0;
let time = 30; 
let targetSize = 50; 
let gameOverFlag = false;
let tryAgainButton; 
let levelUpScore = 5; 

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); 
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  draw_circle1();
}

function draw_circle1() {
  x1 = floor(random(50, width - 50));
  y1 = floor(random(50, height - 50));
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
  if (gameOverFlag) {
    gameOverScreen();
    return;
  }

  if (lev > 4) {
    youWonScreen(); 
    return;
  }

  background(220);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height); 
  pop();

  if (pose) {
    noStroke();
    fill(255, 0, 0);
    let noseX = width - pose.nose.x; 
    let noseY = pose.nose.y;
    ellipse(noseX, noseY, 20, 20); 

    
    if (dist(noseX, noseY, x1, y1) < targetSize / 2) {
      score++;
      draw_circle1(); 
      if (score >= levelUpScore) {
        levelUp();
      }
    }
  }

  
  if (lev === 3) {
    noFill(); 
    stroke(0, 0, 255);
    strokeWeight(4);
  } else if (lev === 4) {
    fill(0, 0, 255, 127);
    noStroke();
  } else {
    fill(0, 0, 255); 
    noStroke();
  }
  ellipse(x1, y1, targetSize, targetSize);

  
  noStroke(); 
  fill(0); 
  textSize(32);
  text("Score: " + score, 10, 30);
  text("Time: " + time, 10, 70);
  text("Level: " + lev, 10, 110);

  
  if (time <= 0) {
    gameOverFlag = true;
  }
}

function timer() {
  if (time > 0) {
    time--;
  }
}

function levelUp() {
  lev++;
  score = 0; 
  time = 30 - lev * 5; 

  
  if (lev === 2) {
    targetSize = targetSize / 2; 
  } else if (lev > 2) {
    targetSize = max(20, targetSize - 10); 
  }

  levelUpScore = 5; 
}

function gameOverScreen() {
  background(255, 0, 0);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2 - 50);
  textSize(32);
  text("Final Level: " + lev, width / 2, height / 2);
  text("Final Score: " + score, width / 2, height / 2 + 50);

 
  if (!tryAgainButton) {
    tryAgainButton = createButton("Try Again");
    tryAgainButton.position((width / 2) - 50, (height / 2) + 100); 
    tryAgainButton.style("font-size", "20px"); 
    tryAgainButton.style("padding", "10px 20px"); 
    tryAgainButton.style("background-color", "#007BFF"); 
    tryAgainButton.style("color", "white"); 
    tryAgainButton.style("border", "none"); 
    tryAgainButton.style("border-radius", "5px"); 
    tryAgainButton.mousePressed(resetGame); 
  }
}

function youWonScreen() {
  background(0, 255, 0); 
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("You Won!", width / 2, height / 2 - 50);
  textSize(32);
  text("Congratulations on completing all levels!", width / 2, height / 2);

  if (!tryAgainButton) {
    tryAgainButton = createButton("New Round?");
    tryAgainButton.position((width / 2) - 60, (height / 2) + 100); 
    tryAgainButton.style("font-size", "20px"); 
    tryAgainButton.style("padding", "10px 20px"); 
    tryAgainButton.style("background-color", "#007BFF"); 
    tryAgainButton.style("color", "white"); 
    tryAgainButton.style("border", "none"); 
    tryAgainButton.style("border-radius", "5px"); 
    tryAgainButton.mousePressed(resetGame); 
  }
}

function resetGame() {
  lev = 1;
  score = 0;
  time = 30;
  targetSize = 50;
  levelUpScore = 5;
  gameOverFlag = false;

  if (tryAgainButton) {
    tryAgainButton.remove();
    tryAgainButton = null;
  }

  clear();
  createCanvas(640, 480);
  textAlign(LEFT, BASELINE);
  textSize(32); 
}
