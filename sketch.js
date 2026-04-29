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
let amusementRobotImg;
let mainProjectileImg;
let rocketProjectileImg;
let clownProjectileImg;
let crazyClownProjectileImg;

function preload(){
  redBirdImg = loadImage("redBird.png");
  parkBackgroundImg = loadImage("amusementparkbackground.png");
  clownImg = loadImage("amusementclown.png");
  crazyClownImg = loadImage("amusementcrazyclown.png");
  amusementRobotImg = loadImage("amusementrobot.png");
  mainProjectileImg = loadImage("blueenergy.png");
  rocketProjectileImg = loadImage("rocketprojectile.png");
  clownProjectileImg = loadImage("clownprojectile.png");
  crazyClownProjectileImg = loadImage("crazyclownprojectile.png");

}

class Projectiles{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = -5;
  }

  display(){
    image(rocketProjectileImg, amusementRobotImg.x - amusementRobotImg.width * 0.1, amusementRobotImg.y, rocketProjectileImg.width * 0.1, rocketProjectileImg.height * 0.1);
    image(clownProjectileImg, clownImg.x - clownImg.width * 0.1, clownImg.y, clownProjectileImg.width * 0.1, clownProjectileImg.height * 0.1);
    image(crazyClownProjectileImg, crazyClownImg.x - crazyClownImg.width * 0.1, crazyClownImg.y, crazyClownProjectileImg.width * 0.1, crazyClownProjectileImg.height * 0.1);
  }

  update(){
    this.x += this.dx;
  }
}

class Characters{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = -5;
    this.dy = random(-2, 2);
  }
  
  display(){
    image(clownImg, windowWidth - 100, windowHeight - 300, clownImg.width * 0.2, clownImg.height * 0.2);
    image(crazyClownImg, windowWidth - 100, windowHeight - 200, crazyClownImg.width * 0.2, crazyClownImg.height * 0.2);
    image(amusementRobotImg, windowWidth - 100, windowHeight - 100, amusementRobotImg.width * 0.2, amusementRobotImg.height * 0.2);
  }

  update(){
    this.x += this.dx;
    this.y += this.dy;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  createImages();
}

function createImages() {
  image(parkBackgroundImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  image(redBirdImg, mouseX, mouseY, redBirdImg.width * 0.2, redBirdImg.height * 0.2);
  image(mainProjectileImg, mouseX + redBirdImg.width * 0.1, mouseY, mainProjectileImg.width * 0.1, mainProjectileImg.height * 0.1);
}

function mouseClicked(){
  image(mainProjectileImg, mouseX + redBirdImg.width * 0.1, mouseY, mainProjectileImg.width * 0.1, mainProjectileImg.height * 0.1);
}
