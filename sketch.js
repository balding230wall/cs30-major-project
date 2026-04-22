// Bird Fighter
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redBirdImg;

function preload(){
  redBirdImg = loadImage("redBird.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(redBirdImg, mouseX, mouseY, redBirdImg.width * 0.2, redBirdImg.height * 0.2);

}
