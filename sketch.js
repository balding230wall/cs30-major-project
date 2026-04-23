// Bird Fighter
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redBirdImg;
let parkBackgroundImg;

function preload(){
  redBirdImg = loadImage("redBird.png");
  parkBackgroundImg = loadImage("amuesmentPark.png");

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(parkBackgroundImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  image(redBirdImg, mouseX, mouseY, redBirdImg.width * 0.2, redBirdImg.height * 0.2);

}
