// Bird Fighter
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redBirdImg;
let parkBackgroundImg;
let clownImg;
let crazyClownImg;
let amuesmentRobotImg;

function preload(){
  redBirdImg = loadImage("redBird.png");
  parkBackgroundImg = loadImage("amuesmentPark.png");
  clownImg = loadImage("amuesmentclown.png");
  crazyClownImg = loadImage("amuesmentcrazyclown.png");
  amuesmentRobotImg = loadImage("amuesmentrobot.png");

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(parkBackgroundImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  image(redBirdImg, mouseX, mouseY, redBirdImg.width * 0.2, redBirdImg.height * 0.2);
  image(clownImg, windowWidth - 100, windowHeight - 300, clownImg.width * 0.2, clownImg.height * 0.2);
  image(crazyClownImg, windowWidth - 100, windowHeight - 200, crazyClownImg.width * 0.2, crazyClownImg.height * 0.2);
  image(amuesmentRobotImg, windowWidth - 100, windowHeight - 100, amuesmentRobotImg.width * 0.2, amuesmentRobotImg.height * 0.2);

}
