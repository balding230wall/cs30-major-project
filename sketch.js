// Bird Fighter
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redBirdImg;
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
let background1Img;
let background2Img;
let winScreenImg;

let mainProjectileSound;
let basicEnemiesHitSound;
let birdHitSound;
let bossHitSound;
let bossDefeatedSound;
let victorySound;
let defeatSound;

let mainMusic;
let bossFightMusic;
let mainMenuMusic;

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
let currentBackground;
  

let gameStart = false;
let gameEnded = true;
let gameWon = false;

let victorySoundPlayed = false;
let defeatSoundPlayed = false;
let bossDefeatSoundPlayed = false;
let startMusic = false;

let clownEnemies = [];
let crazyClownEnemies = [];
let robotEnemies = [];

let totalEnemies = 0;
let maxEnemiesAllowed = 9;
let score = 0;
let scoreToWin = 5;

function preload(){
  redBirdImg = loadImage("redBird.png");
  clownImg = loadImage("amusementclown.png");
  crazyClownImg = loadImage("amusementcrazyclown.png");
  amusementRobotImg = loadImage("amusementrobot.png");
  mainProjectileImg = loadImage("blueenergy.png");
  rocketProjectileImg = loadImage("rocketprojectile.png");
  clownProjectileImg = loadImage("clownprojectile.png");
  crazyClownProjectileImg = loadImage("crazyclownprojectile.png");
  mainMenuImg = loadImage("mainmenu.jpeg");
  lossScreenImg = loadImage("lossscreen.jpeg");
  heartImg = loadImage("heart.png");
  amusementBossImg = loadImage("amusementboss.png");
  bossProjectileImg = loadImage("bossprojectile.png");
  background1Img = loadImage("background1.png");
  background2Img = loadImage("background2.png");
  winScreenImg = loadImage("winscreen.jpeg");

  mainProjectileSound = loadSound("mainprojectilesound.flac");
  basicEnemiesHitSound = loadSound("basicenemieshitsound.wav");
  birdHitSound = loadSound("birdhitsound.mp3");
  bossHitSound = loadSound("bosshitsound.flac");
  bossDefeatedSound = loadSound("bossdefeatsound.mp3");
  victorySound = loadSound("victorysound.mp3");
  defeatSound = loadSound("defeatsound.mp3");

  mainMusic = loadSound("mainmusic.mp3");
  bossFightMusic = loadSound("bossfightmusic.mp3");
  mainMenuMusic = loadSound("mainmenumusic.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  currentBackground = background2Img;

  birdShip = new FriendlyCharacter(200, 200, redBirdImg);
  clownEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), clownImg);
  crazyClownEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), crazyClownImg);
  robotEnemy = new EnemyCharacter(windowWidth, random(0, windowHeight), amusementRobotImg);
  boss = new Boss(windowWidth - amusementBossImg.width/2 * bossScale, windowHeight - amusementBossImg.height/2 * bossScale, amusementBossImg);
}

function draw() {
  background(220);
  createMainMenu();
  createBackground();
  playMusic();
  createCharacters();
  createHearts();
  displayScore();
  endGame();
}

function createMainMenu(){
  if (!gameStart && gameEnded && !gameWon){
    image(mainMenuImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  }
}

function createBackground() {
  if (gameStart && !gameEnded){
    image(currentBackground, backgroundX + windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    image(currentBackground, backgroundX + windowWidth/2 + windowWidth, windowHeight/2, windowWidth, windowHeight);

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

      if (frameCount % 120 === 0){
        if (enemyType === "clown"){
          enemy.clownFire();
        }
      }

      if (frameCount % 60 === 0){
        if (enemyType === "crazyClown"){
          enemy.crazyClownFire();
        }
      }

      if (frameCount % 180 === 0){
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
    boss.update();
    boss.display();
  }
  
  if (boss.enteredScreen){
    if (frameCount % 12 === 0){
      boss.bossFire();
    }
    enemyProjHitPlayer(boss);
    playerProjHitBoss(boss);
  }

  displayBossHealth();
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

function displayBossHealth(){
  if (score >= scoreToWin && boss.health > 0){
    textSize(25);
    text("Boss Health: " + boss.health, windowWidth - 200, 50);

    rect(windowWidth/3 * 2, 70, windowWidth, 20);

    push();
    fill("red");
    rect(windowWidth/3 * 2, 70, boss.health * (windowWidth/150), 20);
    pop();
  }
}

function keyPressed(){
  if (key === "b"){
    if (currentBackground === background2Img){
      currentBackground = background1Img;
    }
    else if (currentBackground === background1Img){
      currentBackground = background2Img;
    }
  }
}

function mouseClicked(){
  userStartAudio();

  if (!gameStart && gameEnded && !startMusic){
    startMusic = true;
    return;
  }

   if (!gameStart && gameEnded && startMusic){
    gameStart = true;
    gameEnded = false;
   }

  if (gameStart && !gameEnded){
    birdShip.fire();
    mainProjectileSound.play();
  }

  if (gameStart && gameEnded && !victorySound.isPlaying() && !defeatSound.isPlaying()){
      
    gameStart = false;

    if (gameWon){
      gameWon = false;
    }
    
    birdShip.health = 3;
    totalEnemies = 0;
    score = 0;
    boss.health = 50;
    boss.x = windowWidth + boss.image.width;
    boss.enteredScreen = false;
    victorySoundPlayed = false;
    defeatSoundPlayed = false;
    bossDefeatSoundPlayed = false;

    clownEnemies = [];
    crazyClownEnemies = [];
    robotEnemies = [];
  }
}

function playMusic(){
  if (!gameStart && gameEnded){
    if (!mainMenuMusic.isPlaying()){
      mainMenuMusic.loop();
    }
  }

  if (gameStart && !gameEnded){
    mainMenuMusic.stop();
    if (!mainMusic.isPlaying() && score < scoreToWin){
      mainMusic.loop();
    }
    if (!bossFightMusic.isPlaying() && score >= scoreToWin){
      mainMusic.stop();
      bossFightMusic.loop();
    }
  }

  if (gameStart && gameEnded && gameWon){
    if (!victorySoundPlayed){
      mainMusic.stop();
      bossFightMusic.stop();
      victorySound.play();
      victorySoundPlayed = true;
    }
  }
  
  if (gameStart && gameEnded && !gameWon){
    if (!defeatSoundPlayed){
      mainMusic.stop();
      bossFightMusic.stop();
      defeatSound.play();
      defeatSoundPlayed = true;
    }
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
      birdHitSound.play();
    }
  }
}

function playerProjHitEnemy(enemy){
  for (let i = birdShip.projectileArray.length - 1; i >= 0; i--){
    let projectile = birdShip.projectileArray[i];
    if (isColliding(enemy, projectile)){
      birdShip.projectileArray.splice(i, 1);
      enemy.alive = false;
      basicEnemiesHitSound.play();
    }
  }
}

function playerProjHitBoss(enemy){
  for (let i = birdShip.projectileArray.length - 1; i >= 0; i--){
    let projectile = birdShip.projectileArray[i];
    if (isColliding2(enemy, projectile)){
      birdShip.projectileArray.splice(i, 1);
      boss.health --;
      bossHitSound.play();
    }
  }
}


function endGame(){
  if (birdShip.health <= 0){
    gameEnded = true;
    image(lossScreenImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  }

  if (boss.health <= 0){
    if (!bossDefeatSoundPlayed){
      bossDefeatedSound.play();
      bossDefeatSoundPlayed = true;
    }
    gameEnded = true;
    gameWon = true;
    image(winScreenImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
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

    this.x = windowWidth + this.image.width;

    this.targetXPosition = windowWidth - this.image.width/2 * bossScale;
    this.targetYPosition = windowHeight - amusementBossImg.height/2 * bossScale;

    this.y = this.targetYPosition;

    this.enteredScreen = false;
  }

  update(){
    if (!this.enteredScreen){
      this.x -= 3;
      backgroundX -= 3;

      if (this.x <= this.targetXPosition){
        this.x = this.targetXPosition;
        this.enteredScreen = true;
      }
    }
  }

  display(){
    image(this.image, this.x, this.y, amusementBossImg.width * bossScale, amusementBossImg.height * bossScale);
  
    for (let projectile of this.projectileArray){
      if (projectile.isOnScreen()){
        projectile.update();
        projectile.display();
      }
      else{
        this.projectileArray.splice(this.projectileArray.indexOf(projectile), 1);
      }
    }
  }

  bossFire(){
    let randomDx = random(-12, -8);
    let randomDy = random(-6, 6);

    let bossEnemyProjectile = new EnemyProjectile(this.x - this.image.width * bossScale * 0.5, this.y, randomDx, randomDy, bossProjectileImg);
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
    this.y += this.dy;
  }

  isOnScreen(){
    return this.x > 0 && this.x < windowWidth && this.y > 0 && this.y < windowHeight;
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

