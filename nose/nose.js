let x1, y1;
let lev = 1; 
let video;
let poseNet;
let pose;
let score = 0;
let time = 30; 
let targetSize = 50; 
let gameOverFlag = false;
let tryAgainButton; // Declare the button
let levelUpScore = 5; // Score needed to level up

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Hide the video element, but still capture it
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
  setInterval(timer, 1000); // Start the timer
}

function draw() {
  if (gameOverFlag) {
    gameOverScreen();
    return;
  }

  if (lev > 4) {
    youWonScreen(); // Show the "You Won!" page after Level 4
    return;
  }

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

    // Check for collision with the target circle
    if (dist(noseX, noseY, x1, y1) < targetSize / 2) {
      score++;
      draw_circle1(); // Draw a new circle
      if (score >= levelUpScore) {
        levelUp();
      }
    }
  }

  // Draw the target circle
  if (lev === 3) {
    noFill(); // Make the circle hollow for Level 3
    stroke(0, 0, 255);
    strokeWeight(4);
  } else if (lev === 4) {
    fill(0, 0, 255, 127); // Solid circle with 50% transparency for Level 4
    noStroke();
  } else {
    fill(0, 0, 255); // Solid circle for other levels
    noStroke();
  }
  ellipse(x1, y1, targetSize, targetSize);

  // Display the score, time, and level
  noStroke(); // Ensure no outline for text
  fill(0); // Black text for all levels
  textSize(32);
  text("Score: " + score, 10, 30);
  text("Time: " + time, 10, 70);
  text("Level: " + lev, 10, 110);

  // Check if time is up
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
  score = 0; // Reset score for the new level
  time = 30 - lev * 5; // Decrease time as levels increase

  // Adjust target size based on the level
  if (lev === 2) {
    targetSize = targetSize / 2; // Halve the target size for Level 2
  } else if (lev > 2) {
    targetSize = max(20, targetSize - 10); // Decrease target size for other levels, minimum 20
  }

  levelUpScore = 5; // Keep the score needed to level up at 5
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

  // Create the "Try Again" button
  if (!tryAgainButton) {
    tryAgainButton = createButton("Try Again");
    tryAgainButton.position((width / 2) - 50, (height / 2) + 100); // Center the button
    tryAgainButton.style("font-size", "20px"); // Optional: Style the button
    tryAgainButton.style("padding", "10px 20px"); // Optional: Add padding
    tryAgainButton.style("background-color", "#007BFF"); // Optional: Add background color
    tryAgainButton.style("color", "white"); // Optional: Add text color
    tryAgainButton.style("border", "none"); // Optional: Remove border
    tryAgainButton.style("border-radius", "5px"); // Optional: Add rounded corners
    tryAgainButton.mousePressed(resetGame); // Attach the reset function
  }
}

function youWonScreen() {
  background(0, 255, 0); // Green background for the "You Won!" page
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("You Won!", width / 2, height / 2 - 50);
  textSize(32);
  text("Congratulations on completing all levels!", width / 2, height / 2);

  // Create the "New Round?" button
  if (!tryAgainButton) {
    tryAgainButton = createButton("New Round?");
    tryAgainButton.position((width / 2) - 60, (height / 2) + 100); // Center the button
    tryAgainButton.style("font-size", "20px"); // Optional: Style the button
    tryAgainButton.style("padding", "10px 20px"); // Optional: Add padding
    tryAgainButton.style("background-color", "#007BFF"); // Optional: Add background color
    tryAgainButton.style("color", "white"); // Optional: Add text color
    tryAgainButton.style("border", "none"); // Optional: Remove border
    tryAgainButton.style("border-radius", "5px"); // Optional: Add rounded corners
    tryAgainButton.mousePressed(resetGame); // Attach the reset function
  }
}

function resetGame() {
  // Reset all game variables
  lev = 1;
  score = 0;
  time = 30;
  targetSize = 50;
  levelUpScore = 5;
  gameOverFlag = false;

  // Remove the "New Round?" or "Try Again" button
  if (tryAgainButton) {
    tryAgainButton.remove();
    tryAgainButton = null;
  }

  // Clear the canvas and redraw it
  clear();
  createCanvas(640, 480); // Recreate the canvas to ensure it is not cut off

  // Reset text alignment and size
  textAlign(LEFT, BASELINE); // Reset text alignment to default
  textSize(32); // Reset text size to default for the game
}
