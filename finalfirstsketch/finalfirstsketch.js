var img;
var initials ='ji';
var choice = '1';
var screenbg = 250;
var lastscreenshot=61;

function preload() {
  img = loadImage('https://amber0dominguezz.github.io/images/IMG_4128.webp');
  ogkitty = loadImage('https://amber0dominguezz.github.io/images/IMG_4129.webp');
  gkitty = loadImage('https://amber0dominguezz.github.io/images/IMG_4130.webp');
  pkitty = loadImage('https://amber0dominguezz.github.io/images/IMG_4131.webp');
  sjsukitty = loadImage('https://amber0dominguezz.github.io/images/IMG_4132.webp')
  flowercrown = loadImage('https://amber0dominguezz.github.io/images/IMG_4136.webp')
  glasses = loadImage('https://amber0dominguezz.github.io/images/IMG_4138.webp')
  crown = loadImage('https://amber0dominguezz.github.io/images/IMG_4139.webp')
  popcorn = loadImage('https://amber0dominguezz.github.io/images/IMG_4140.webp')
  bow = loadImage('https://amber0dominguezz.github.io/images/IMG_4141.webp')
  flower = loadImage('https://amber0dominguezz.github.io/images/IMG_4142.webp')


}

function setup() {
createCanvas(800, 800);  // canvas size
background(img); 
}

function draw() {
  if (keyIsPressed) {
    choice = key; // set choice to the key that was pressed
    clear_print(); // check to see if it is clear screen or save image
  }
  if (mouseIsPressed){
    newkeyChoice(choice);  // if the mouse is pressed call newkeyChoice
  }
}

function newkeyChoice(toolChoice) { //toolchoice is the key that was pressed
  // the key mapping if statements that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of 
  // graphic function

 if (toolChoice == '1' ) {  // first tool
    image(ogkitty, mouseX-300, mouseY-270, 600, 600);
    
  } else if (toolChoice == '2') { // second tool
    image(gkitty, mouseX-300, mouseY-270, 600, 600);
    
  } else if (toolChoice == '3') { // third tool
    image(pkitty, mouseX-300, mouseY-270, 600, 600);
   5
  } else if (toolChoice == '4') {
    image(sjsukitty, mouseX-300, mouseY-270, 600, 600);
    
  } else if (key == '5') { 
    image(flowercrown, mouseX-300, mouseY-150, 600, 600);
    
  } else if (toolChoice == '6') {
    image(glasses, mouseX-300, mouseY-250, 600, 600);
    
  } else if (toolChoice == '7') {
    image(crown, mouseX-150, mouseY-150, 300, 300);
    
  } else if (toolChoice == '8') {
    image(popcorn, mouseX-150, mouseY-150, 300, 300);
    
  } else if (toolChoice == '9') {
    image(bow, mouseX-150, mouseY-150, 300, 300);
    
  } else if (toolChoice == '0') {
    image(flower, mouseX-150, mouseY-150, 300, 300);
    
  }
 }

function clear_print() {
// this will do one of two things, x clears the screen by resetting the background
// p calls the routine saveme, which saves a copy of the screen
  if (key == 'x' || key == 'X') {
    background(img); 
  } else if (key == 'p' || key == 'P') {
     saveme();  
  }
}

function saveme(){
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) { 
    saveCanvas(filename, 'jpg');
    key="";
  }
  lastscreenshot=second();
  
}
