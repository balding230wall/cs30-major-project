// Bird Fighter
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redBirdImg;
let parkBackgroundImg;
let flippedBackgroundImg;
let clownImg;
let crazyClownImg;
let amusementRobotImg;
let mainProjectileImg;
let rocketProjectileImg;
let clownProjectileImg;
let crazyClownProjectileImg;
let mainMenuImg;
let lossScreenImg;
let heartImg;
let amusementBossImg;
let bossProjectileImg;

let birdShip;
let clownEnemy;
let crazyClownEnemy;
let robotEnemy;
let boss;

let characterScale = 0.2;
let projectileScale = 0.1;
let heartScale = 0.05;
let bossScale = 1.5;

let backgroundX = 0;

let gameStart = false;
let gameEnded = true;

let clownEnemies = [];
let crazyClownEnemies = [];
let robotEnemies = [];

let totalEnemies = 0;
let maxEnemiesAllowed = 9;
let score = 0;
let scoreToWin = 5;

function preload(){
  redBirdImg = loadImage("redBird.png");
  parkBackgroundImg = loadImage("amusementparkbackground.png");
  flippedBackgroundImg = loadImage("flippedbackgroundimage.png");
  clownImg = loadImage("amusementclown.png");
  crazyClownImg = loadImage("amusementcrazyclown.png");
  amusementRobotImg = loadImage("amusementrobot.png");
  mainProjectileImg = loadImage("blueenergy.png");
  rocketProjectileImg = loadImage("rocketprojectile.png");
  clownProjectileImg = loadImage("clownprojectile.png");
  crazyClownProjectileImg = loadImage("crazyclownprojectile.png");
  mainMenuImg = loadImage("mainmenu.png");
  lossScreenImg = loadImage("lossscreen.png");
  heartImg = loadImage("heart.png");
  amusementBossImg = loadImage("amusementboss.png");
  bossProjectileImg = loadImage("amusementboss.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  birdShip = new FriendlyCharacter(200, 200, redBirdImg);
  clownEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), clownImg);
  crazyClownEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), crazyClownImg);
  robotEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), amusementRobotImg);
  boss = new Boss(windowWidth, windowHeight, amusementBossImg);
}

function draw() {
  background(220);
  createMainMenu();
  createBackground();
  createCharacters();
  createHearts();
  displayScore();
  endGame();
}

function createMainMenu(){
  if (!gameStart && gameEnded){
    image(mainMenuImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  }
}

function createBackground() {
  if (gameStart && !gameEnded){
    image(flippedBackgroundImg, backgroundX + windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    image(parkBackgroundImg, backgroundX + windowWidth/2 + windowWidth, windowHeight/2, windowWidth, windowHeight);

    if (backgroundX <= windowWidth * -1){
      backgroundX = 0;
    }
    if (score < scoreToWin){
      backgroundX -= 2;
    }
  }
}

function createCharacters(){
  if (gameStart && !gameEnded){
      
    if (birdShip.health > 0){
      birdShip.update();
      birdShip.display();
    }
    if (score < scoreToWin){
      if (totalEnemies <= maxEnemiesAllowed){

        if (frameCount % 120 === 0){
          clownEnemies.push (new EnemyCharacter(windowWidth, random(0, windowHeight), clownImg));
          totalEnemies += 1;
        }
      
        if (frameCount % 120 === 0){
          crazyClownEnemies.push (new EnemyCharacter(windowWidth, random(0, windowHeight), crazyClownImg));
          totalEnemies += 1;
        }

        if (frameCount % 120 === 0){
          robotEnemies.push (new EnemyCharacter(windowWidth, random(0, windowHeight), amusementRobotImg));
          totalEnemies += 1;
        }
      }
    }
    else{
      clownEnemies = [];
      crazyClownEnemies = [];
      robotEnemies = [];

      bossFunctions();
    }

    enemyFunctions(clownEnemies, "clown");
    enemyFunctions(crazyClownEnemies, "crazyClown");
    enemyFunctions(robotEnemies, "robot");
  
  }
}

function enemyFunctions(enemyArray, enemyType){
  for (let i = enemyArray.length - 1; i >= 0; i--){
    let enemy = enemyArray[i];

    if (enemy.alive){
      enemy.update();
      enemy.display();

      if (frameCount % 60 === 0){
        
        if (enemyType === "clown"){
          enemy.clownFire();
        }
        
        if (enemyType === "crazyClown"){
          enemy.crazyClownFire();
        }

        if (enemyType === "robot"){
          enemy.robotFire();
        }
      }

      enemyProjHitPlayer(enemy);
      playerProjHitEnemy(enemy);
    }

    else{
      enemyArray.splice(i, 1);
      totalEnemies -= 1;
      score += 1;
    }
  }
}

function bossFunctions(){
  if (boss.health > 0){
    boss.display();
  }
  if (frameCount % 60 === 0){
    boss.bossFire();
  }

  enemyProjHitPlayer(boss);
  playerProjHitBoss(boss);
}

function createHearts(){
  if (gameStart && !gameEnded){
    for (let i = 0; i < birdShip.health; i++){
      image(heartImg, (heartImg.width/2 + i * heartImg.width) * heartScale, heartImg.height/2 * heartScale, heartImg.width * heartScale, heartImg.height * heartScale);
    }
  }
}

function displayScore(){
  if (gameStart && !gameEnded){
    textSize(25);
    text("Score: " + score, heartImg.width/4 * heartScale, heartImg.height * heartScale * 1.25);
  }
}

function mouseClicked(){
  if (!gameStart && gameEnded){
    gameStart = true;
    gameEnded = false;
  }

  if (gameStart && !gameEnded){
    birdShip.fire();
  }

  if (gameStart && gameEnded){
      
    gameStart = false;
    
    birdShip.health = 3;
    totalEnemies = 0;
    score = 0;

    clownEnemies.push(new EnemyCharacter(windowWidth, random(0, windowHeight), clownImg));
    crazyClownEnemies.push(new EnemyCharacter(windowWidth, random(0, windowHeight), crazyClownImg));
    robotEnemies.push(new EnemyCharacter(windowWidth, random(0, windowHeight), amusementRobotImg));
    totalEnemies += 3;
  }
}

function isColliding(character, projectile){
  let characterWidth = character.image.width * characterScale;
  let characterHeight = character.image.height * characterScale;

  let projectileWidth = projectile.image.width * projectileScale;
  let projectileHeight = projectile.image.height * projectileScale;

  let xDistance = abs(character.x - projectile.x);
  let yDistance = abs(character.y - projectile.y);

  let isOverlappingX = xDistance < characterWidth/2 + projectileWidth/2;
  let isOverlappingY = yDistance < characterHeight/2 + projectileHeight/2;

  return isOverlappingX && isOverlappingY;
}

function isColliding2(boss, projectile){
  let bossWidth = boss.image.width * bossScale;
  let bossHeight = boss.image.height * bossScale;

  let projectileWidth = projectile.image.width * projectileScale;
  let projectileHeight = projectile.image.height * projectileScale;

  let xDistance = abs(boss.x - projectile.x);
  let yDistance = abs(boss.y - projectile.y);

  
  let isOverlappingX = xDistance < bossWidth/2 + projectileWidth/2;
  let isOverlappingY = yDistance < bossHeight/2 + projectileHeight/2;

  return isOverlappingX && isOverlappingY;
}

function enemyProjHitPlayer(enemy){
  for (let i = enemy.projectileArray.length - 1; i >= 0; i--){
    let projectile = enemy.projectileArray[i];
    if (isColliding(birdShip, projectile)){
      enemy.projectileArray.splice(i, 1);
      birdShip.health --;
    }
  }
}

function playerProjHitEnemy(enemy){
  for (let i = birdShip.projectileArray.length - 1; i >= 0; i--){
    let projectile = birdShip.projectileArray[i];
    if (isColliding(enemy, projectile)){
      birdShip.projectileArray.splice(i, 1);
      enemy.alive = false;
    }
  }
}

function playerProjHitBoss(enemy){
  for (let i = birdShip.projectileArray.length - 1; i >= 0; i--){
    let projectile = birdShip.projectileArray[i];
    if (isColliding2(enemy, projectile)){
      birdShip.projectileArray.splice(i, 1);
      boss.health --;
    }
  }
}


function endGame(){
  if (birdShip.health <= 0){
    gameEnded = true;
    image(lossScreenImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  }
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

    for (let projectile of this.projectileArray){
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
  constructor(x, y, theImage, health){
    super(x, y, theImage);

    this.health = 3;
  }

  update(){
    this.x = mouseX;
    this.y = mouseY;
  }

  fire(){
    let thatFriendlyProjectile = new FriendlyProjectile(this.x + this.image.width * characterScale * 0.5, this.y, 10, 0, mainProjectileImg);
    this.projectileArray.push(thatFriendlyProjectile);
  }
}

class EnemyCharacter extends Character{
  constructor(x, y, theImage, dx, dy){
    super(x, y, theImage);

    this.dx = random(-10, -5);
    this.dy = random(-5, 5);
    this.alive = true;
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

  clownFire(){
    let thatEnemyProjectile = new EnemyProjectile(this.x - this.image.width * characterScale * 0.5, this.y, -10, 0, clownProjectileImg);
    this.projectileArray.push(thatEnemyProjectile);
  }

  crazyClownFire(){
    let anotherEnemyProjectile = new EnemyProjectile(this.x - this.image.width * characterScale * 0.5, this.y, -10, 0, crazyClownProjectileImg);
    this.projectileArray.push(anotherEnemyProjectile);
  }

  robotFire(){
    let oneMoreEnemyProjectile = new EnemyProjectile(this.x - this.image.width * characterScale * 0.5, this.y, -10, 0, rocketProjectileImg);
    this.projectileArray.push(oneMoreEnemyProjectile);
  }
}

class Boss extends Character{
  constructor(x, y, theImage){
    super(x, y, theImage);

    this.health = 50;
  }

  display(){
    image(amusementBossImg, windowWidth - amusementBossImg.width/2 * bossScale, windowHeight - amusementBossImg.height/2 * bossScale, amusementBossImg.width * bossScale, amusementBossImg.height * bossScale);
  }

  bossFire(){
    let bossEnemyProjectile = new EnemyProjectile(this.x - this.image.width * bossScale * 0.5, this.y, -10, 0, bossProjectileImg);
    this.projectileArray.push(bossEnemyProjectile);
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

class BossProjectiles extends Projectiles{
  constructor(x, y, dx, dy, theImage){
    super(x, y, dx, dy, theImage);
  }
}

