var ballx = 400;
var bally = 300;
var ballSize = 70;
var score = 0;
var gameState= "L1";
var capture;

function preload() {
  facehere = loadImage('https://amber0dominguezz.github.io/images/IMG_4148.webp');
  
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER);
  textSize(20);
  capture = createCapture(VIDEO);
  capture.size(400, 400);
  capture.hide();
  
} // end setup


function draw() {
  background(220);
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


function levelOne(){
  text("Level 1", width/2, height-20);
  image(capture, 0, 0, width, height);
  image(facehere, 0, 0, 800, 600);
  var distToBall= dist(ballx, bally, mouseX, mouseY);
  if (distToBall <ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score +1;
  }
  if(score>0){

  gameState= "L2";
  
  }
  
  ellipse(ballx, bally, ballSize, ballSize);
  
  
} // end level one

function levelTwo(){
  background(200, 100, 2000);
  text("Level 2", width/2, height-20);
  var distToBall= dist(ballx, bally, mouseX, mouseY);
  if (distToBall <ballSize/2){
    ballx = random(width);
    bally = random(height);
    ballSize = ballSize -4;
    score = score +1;
  }
  if(score>15){

   gameState = "L3";
   
  }
  
  ellipse(ballx, bally, ballSize, ballSize);
  image(capture, ballx-ballSize/2, bally-ballSize/2, ballSize, ballSize);
} // end level two

function levelThree(){
  background (170);
  text("Level 3", width/2, height-20);
  var distToBall= dist(ballx, bally, mouseX, mouseY);
  if (distToBall <ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score +1;
  }
  if(score>25){
    
    gameState = "L4";

  }
  
  ellipse(ballx, bally, ballSize, ballSize);
  image(capture, ballx-ballSize/2, bally-ballSize/2, ballSize, ballSize);
} // end level three
 
function levelFour(){
  background (0);
  text("Level 4", width/2, height-20);
  fill('white');
  var distToBall= dist(ballx, bally, mouseX, mouseY);
  if (distToBall <ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score +1;
  }
  if(score>35){
    
    gameState = "L5";

  }
  
  ellipse(ballx, bally, ballSize, ballSize);
  image(capture, ballx-ballSize/2, bally-ballSize/2, ballSize, ballSize);
} // end level four

function levelFive(){
  background (random(255));
  text("Level 5", width/2, height-20);
  var distToBall= dist(ballx, bally, mouseX, mouseY);
  if (distToBall <ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score +1;
  }
  if(score>100){
    
  }
  
  ellipse(ballx, bally, ballSize, ballSize);
  image(capture, ballx-ballSize/2, bally-ballSize/2, ballSize, ballSize);
} // end level five
