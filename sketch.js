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
  birdShip = new Character(mouseX, mouseY, redBirdImg);
}

function draw() {
  background(220);
  createImages();
  birdShip.display();
}

function createImages() {
  image(parkBackgroundImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
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
    image(this.image, this.x, this.y);

    for(let projectile of this.projectileArray){
      if (projectile.isOnScreen){
        projectile.update();
        projectile.display();
      }
      else {
        this.projectileArray.splice(this.projectileArray.indexOf(projectile), 1);
      }
    }
  }

  fire(){
    let thatProjectile = new Projectiles(this.x, this.y, 5, 0, mainProjectileImg);
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
    image(this.image, this.x, this.y);
  }

  update(){
    this.x += this.dx;
  }

  isOnScreen(){
    return this.x > 0;
  }
}
