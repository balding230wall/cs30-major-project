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

let birdShip;
let clownEnemy;
let crazyClownEnemy;

let characterScale = 0.2;
let projectileScale = 0.1;

let backgroundX = 0;


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


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  birdShip = new Character(200, 200, redBirdImg);
  clownEnemy = new Character(500, 500, clownImg);
  crazyClownEnemy = new Character(500, 200, crazyClownImg);
}

function draw() {
  background(220);
  createImages();
  birdShip.display();
  birdShip.update();
  clownEnemy.display();
  crazyClownEnemy.display();

  backgroundX -= 2;
}

function createImages() {
  image(parkBackgroundImg, backgroundX + windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  image(parkBackgroundImg, backgroundX + windowWidth/2 + windowWidth, windowHeight/2, windowWidth, windowHeight);

  if (backgroundX <= windowWidth * -1){
    backgroundX = 0;
  }
}

function mouseClicked(){
  birdShip.fire();
}

class Character{
  constructor(x, y, theImage){
    this.x = x;
    this.y = y;
    this.image = theImage;
    this.projectileArray = [];
  }
  
  display(){
    image(this.image, this.x, this.y, this.image.width * characterScale, this.image.height * characterScale);

    for(let projectile of this.projectileArray){
      if (projectile.isOnScreen()){
        projectile.update();
        projectile.display();
      }
      else {
        this.projectileArray.splice(this.projectileArray.indexOf(projectile), 1);
      }
    }
  }

  update(){
    this.x = mouseX;
    this.y = mouseY;
  }

  fire(){
    let thatProjectile = new Projectiles(this.x + this.image.width * characterScale * 0.5, this.y, 5, 0, mainProjectileImg);
    this.projectileArray.push(thatProjectile);
  }
}

class Projectiles{
  constructor(x, y, dx, dy, theImage) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image = theImage;
  }

  display(){
    image(this.image, this.x, this.y, this.image.width * projectileScale, this.image.height * projectileScale);
  }

  update(){
    this.x += this.dx;
  }

  isOnScreen(){
    return this.x > 0 && this.x < windowWidth;
  }
}
