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
let robotEnemy;

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
  birdShip = new FriendlyCharacter(200, 200, redBirdImg);
  clownEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), clownImg);
  crazyClownEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), crazyClownImg);
  robotEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), amusementRobotImg);
}

function draw() {
  background(220);
  createImages();

  birdShip.display();
  birdShip.update();

  clownEnemy.display();
  clownEnemy.update();

  crazyClownEnemy.display();
  crazyClownEnemy.update();

  robotEnemy.display();
  robotEnemy.update();

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
}

class FriendlyCharacter extends Character{
    update(){
    this.x = mouseX;
    this.y = mouseY;
  }

  fire(){
    let thatFriendlyProjectile = new FriendlyProjectile(this.x + this.image.width * characterScale * 0.5, this.y, 5, 0, mainProjectileImg);
    this.projectileArray.push(thatFriendlyProjectile);
  }
}

class EnemyCharacter extends Character{
  constructor(x, y, theImage, dx, dy){
    super(x, y, theImage);

    this.dx = random(-10, -5);
    this.dy = random(-5, 5);
  }

    update(){
      this.x += this.dx;
      this.y += this.dy;
      
      if (this.x <= windowWidth/2 || this.x >= windowWidth){
        this.dx *= -1;
      }
      if (this.y <= 0 || this.y >= windowHeight){
        this.dy *= -1;
      }
  }

  fire(){
    let thatEnemyProjectile = new EnemyProjectile(this.x + this.image.width * characterScale * 0.5, this.y, 5, 0, clownProjectileImg);
    this.projectileArray.push(thatEnemyProjectile);
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

class FriendlyProjectile extends Projectiles{
  constructor(x, y, dx, dy, theImage){
    super(x, y, dx, dy, theImage);
  }
}

class EnemyProjectile extends Projectiles{
  constructor(x, y, dx, dy, theImage){
    super(x, y, dx, dy, theImage);
  }
}
