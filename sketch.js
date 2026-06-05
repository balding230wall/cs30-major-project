// Bird Fighter
// Chuyan Wang
// June 12, 2026
//
// Extra for Experts:
// - Added background music and sound effects

//initiating images
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

//initiating sound effects
let mainProjectileSound;
let basicEnemiesHitSound;
let birdHitSound;
let bossHitSound;
let bossDefeatedSound;
let victorySound;
let defeatSound;

//initiating music
let mainMusic;
let bossFightMusic;
let mainMenuMusic;

//initiating characters
let birdShip;
let clownEnemy;
let crazyClownEnemy;
let robotEnemy;
let boss;

//setting scale to shrink down images
let characterScale = 0.2;
let projectileScale = 0.1;
let heartScale = 0.05;
let bossScale = 1.5;

//setting background variables
let backgroundX = 0;
let currentBackground;
  
//creating game state properties
let gameStart = false;
let gameEnded = true;
let gameWon = false;

//sets boleans that help control the game
let victorySoundPlayed = false;
let defeatSoundPlayed = false;
let bossDefeatSoundPlayed = false;
let startMusic = false;
let spawnBird = false;

//creaing arrays for normal enemies
let clownEnemies = [];
let crazyClownEnemies = [];
let robotEnemies = [];

//setting parameters that control enemy numbers and score to win
let totalEnemies = 0;
let maxEnemiesAllowed = 9;
let score = 0;
let scoreToWin = 5;

function preload(){
  //loading images
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

  //loading sound effects
  mainProjectileSound = loadSound("mainprojectilesound.flac");
  basicEnemiesHitSound = loadSound("basicenemieshitsound.wav");
  birdHitSound = loadSound("birdhitsound.mp3");
  bossHitSound = loadSound("bosshitsound.flac");
  bossDefeatedSound = loadSound("bossdefeatsound.mp3");
  victorySound = loadSound("victorysound.mp3");
  defeatSound = loadSound("defeatsound.mp3");

  //loading images
  mainMusic = loadSound("mainmusic.mp3");
  bossFightMusic = loadSound("bossfightmusic.mp3");
  mainMenuMusic = loadSound("mainmenumusic.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  //setting background to image
  currentBackground = background2Img;

  //creating new characters
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
  //create main menu if game has not yet started
  if (!gameStart && gameEnded && !gameWon){
    image(mainMenuImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  }
}

function createBackground() {
  //if game has started, create background with 2 images side by side
  if (gameStart && !gameEnded){
    image(currentBackground, backgroundX + windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    image(currentBackground, backgroundX + windowWidth/2 + windowWidth, windowHeight/2, windowWidth, windowHeight);

    //resets backgroundx to create endless scrolling ability
    if (backgroundX <= windowWidth * -1){
      backgroundX = 0;
    }
    //shift images to the left to create scrolling effect
    if (score < scoreToWin){
      backgroundX -= 2;
    }
  }
}

function createCharacters(){
  //if game has started
  if (gameStart && !gameEnded){
    
    //display and update birdship if it is alive
    if (birdShip.health > 0){
      birdShip.update();
      birdShip.display();
    }
    //if boss fight has not been triggered and max enemies count has not been reached
    if (score < scoreToWin){
      if (totalEnemies < maxEnemiesAllowed){

        //create a new clown enemy every 2 seconds and push it into the array
        if (frameCount % 120 === 0){
          clownEnemies.push (new EnemyCharacter(windowWidth, random(0, windowHeight), clownImg));
          totalEnemies += 1;
        }
      
        //create a new crazyclown enemy every 2 seconds and push it into the array
        if (frameCount % 120 === 0){
          crazyClownEnemies.push (new EnemyCharacter(windowWidth, random(0, windowHeight), crazyClownImg));
          totalEnemies += 1;
        }

        //create a new robot enemy every 2 seconds and push it into the array
        if (frameCount % 120 === 0){
          robotEnemies.push (new EnemyCharacter(windowWidth, random(0, windowHeight), amusementRobotImg));
          totalEnemies += 1;
        }
      }
    }
    else{
      //erase all normal enemies if the boss fight has been triggered
      clownEnemies = [];
      crazyClownEnemies = [];
      robotEnemies = [];

      //initiate boss functions
      bossFunctions();
    }

    //initiate all normal enemy functions if the game is still going on and if the boss fight has not yet been triggered
    enemyFunctions(clownEnemies, "clown");
    enemyFunctions(crazyClownEnemies, "crazyClown");
    enemyFunctions(robotEnemies, "robot");
  
  }
}

function enemyFunctions(enemyArray, enemyType){
  //iterating through every normal enemy in its array
  for (let i = enemyArray.length - 1; i >= 0; i--){
    let enemy = enemyArray[i];

    //if the enemy is alive, update and display
    if (enemy.alive){
      enemy.update();
      enemy.display();

      //if the enemy is a clown, it fires every 2 seconds
      if (frameCount % 120 === 0){
        if (enemyType === "clown"){
          enemy.clownFire();
        }
      }

      //if the enemy is a crazyclown, it fires every second
      if (frameCount % 60 === 0){
        if (enemyType === "crazyClown"){
          enemy.crazyClownFire();
        }
      }

      //if the enemy is a robot, it fires every 3 seconds
      if (frameCount % 180 === 0){
        if (enemyType === "robot"){
          enemy.robotFire();
        }
      }

      //detect if a player has hit the enemy or if the enmy has hit the player
      enemyProjHitPlayer(enemy);
      playerProjHitEnemy(enemy);
    }

    else{
      //if the enemy is killed, splice from the array, -1 total enemy count, +1 score
      enemyArray.splice(i, 1);
      totalEnemies -= 1;
      score += 1;
    }
  }
}

function bossFunctions(){
  //if the boss is alive, update and display
  if (boss.health > 0){
    boss.update();
    boss.display();
  }
  
  //if the boss is fully on screen and the boss fight has officially started, it fires 5 times a second
  if (boss.enteredScreen){
    if (frameCount % 12 === 0){
      boss.bossFire();
    }
    //detect if a player has hit the boss or if the boss has hit the player
    enemyProjHitPlayer(boss);
    playerProjHitBoss(boss);
  }

  //display the boss's health
  displayBossHealth();
}

function createHearts(){
  //if the game has started, create and display hearts
  if (gameStart && !gameEnded){
    for (let i = 0; i < birdShip.health; i++){
      image(heartImg, (heartImg.width/2 + i * heartImg.width) * heartScale, heartImg.height/2 * heartScale, heartImg.width * heartScale, heartImg.height * heartScale);
    }
  }
}

function displayScore(){
  //if the game has started, display the score
  if (gameStart && !gameEnded){
    push();
    fill("purple");
    textSize(25);
    text("Score: " + score, heartImg.width/4 * heartScale, heartImg.height * heartScale * 1.25);
    pop();
  }
}

function displayBossHealth(){
  //condition if the boss fight has been initiated and the boss is not dead
  if (score >= scoreToWin && boss.health > 0){
    //creates text saying boss health
    push();
    fill("purple");
    textSize(25);
    text("Boss Health: " + boss.health, windowWidth - 200, 50);
    pop();

    //creates an empty health bar
    rect(windowWidth/3 * 2, 70, windowWidth, 20);

    //creates the red health bar that goes down with the boss's health
    push();
    fill("red");
    rect(windowWidth/3 * 2, 70, boss.health * (windowWidth/150), 20);
    pop();
  }
}

function keyPressed(){
  //switch between backgrounds if the 'b' key is pressed
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
  //start audio
  userStartAudio();

  //if the game has not yet begun
  if (!gameStart && gameEnded){
    
    //if the game has been loaded up for the first time, the first click starts the main menu music
    if(!startMusic){
      startMusic = true;
      return;
    }
    //if this is not the first click after the game has been loaded up, it starts the game
    else{
      gameStart = true;
      gameEnded = false;
    }
  }

  //if the game has been started
  if (gameStart && !gameEnded){
    //the first click spawns the bird
    if (!spawnBird){
      spawnBird = true;
      return;
    }
    //all other clicks after the bird has been spawned makes the bird fire and plays the sound effect
    else{
      birdShip.fire();
      mainProjectileSound.play();
    }
  }

  //if the game has ended and either the victory sound or the defeat sound has finished playing (to prevent instantly clicking through the win or loss screen)
  if (gameStart && gameEnded && !victorySound.isPlaying() && !defeatSound.isPlaying()){
    //reset state to game has not started
    gameStart = false;

    //if the game was won, reset state to the game not yet won
    if (gameWon){
      gameWon = false;
    }
    
    //resets all conditions needed for a fresh clean start again 
    birdShip.health = 3;
    totalEnemies = 0;
    score = 0;
    boss.health = 50;
    boss.x = windowWidth + boss.image.width;
    boss.enteredScreen = false;
    victorySoundPlayed = false;
    defeatSoundPlayed = false;
    bossDefeatSoundPlayed = false;
    spawnBird = false;

    //empty out all arrays for next game
    clownEnemies = [];
    crazyClownEnemies = [];
    robotEnemies = [];
    birdShip.projectileArray = [];
    boss.projectileArray = [];
  }
}

function playMusic(){
  //loop main menu music if the game has not yet started
  if (!gameStart && gameEnded){
    if (!mainMenuMusic.isPlaying()){
      mainMenuMusic.loop();
    }
  }

  //if the game has been started
  if (gameStart && !gameEnded){
    //stop main menu music and loop the default music while playing 
    mainMenuMusic.stop();
    if (!mainMusic.isPlaying() && score < scoreToWin){
      mainMusic.loop();
    }

    //stop the default music and loop the boss fight music if the boss fight has been triggered
    if (!bossFightMusic.isPlaying() && score >= scoreToWin){
      mainMusic.stop();
      bossFightMusic.loop();
    }
  }

  //if the game has been won, stop the boss fight music and play the victory sound
  if (gameStart && gameEnded && gameWon){
    if (!victorySoundPlayed){
      bossFightMusic.stop();
      victorySound.play();
      victorySoundPlayed = true;
    }
  }
  
  //if the game has been lost, stop the default and boss fight music and play the defeat sound
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
  //creates hit detetcion between characters and projectiles

  //sets character width and height
  let characterWidth = character.image.width * characterScale;
  let characterHeight = character.image.height * characterScale;

  //sets projectile width and height
  let projectileWidth = projectile.image.width * projectileScale;
  let projectileHeight = projectile.image.height * projectileScale;

  //finds the distance between a character and a projectile
  let xDistance = abs(character.x - projectile.x);
  let yDistance = abs(character.y - projectile.y);

  //detects when the projectile and the character is overlapping
  let isOverlappingX = xDistance < characterWidth/2 + projectileWidth/2;
  let isOverlappingY = yDistance < characterHeight/2 + projectileHeight/2;

  //detects hit if both the character and the projectile x and y are overlapping
  return isOverlappingX && isOverlappingY;
}

function isColliding2(boss, projectile){
  //creates hit detetcion between the boss and projectiles

  //sets boss width and height
  let bossWidth = boss.image.width * bossScale;
  let bossHeight = boss.image.height * bossScale;

  //sets projectile width and height
  let projectileWidth = projectile.image.width * projectileScale;
  let projectileHeight = projectile.image.height * projectileScale;

  //finds the distance between the boss and a projectile
  let xDistance = abs(boss.x - projectile.x);
  let yDistance = abs(boss.y - projectile.y);

  //detects when the projectile and the boss is overlapping
  let isOverlappingX = xDistance < bossWidth/2 + projectileWidth/2;
  let isOverlappingY = yDistance < bossHeight/2 + projectileHeight/2;

  //detects hit if both the boss and the projectile x and y are overlapping
  return isOverlappingX && isOverlappingY;
}

function enemyProjHitPlayer(enemy){
  //if an enemy has hit the player

  //iterate through the enemy projectile array
  for (let i = enemy.projectileArray.length - 1; i >= 0; i--){
    let projectile = enemy.projectileArray[i];

    //if a projectile has hit the player, splice the projectile, decrease the birdship health, and play hit sound
    if (isColliding(birdShip, projectile)){
      enemy.projectileArray.splice(i, 1);
      birdShip.health --;
      birdHitSound.play();
    }
  }
}

function playerProjHitEnemy(enemy){
  //if the player has hit a normal enemy

  //iterate through the birdship projectile array
  for (let i = birdShip.projectileArray.length - 1; i >= 0; i--){
    let projectile = birdShip.projectileArray[i];

    //if a projectile has hit a normal enemy, splice the projectile, update the enemy to be dead, and play hit sound
    if (isColliding(enemy, projectile)){
      birdShip.projectileArray.splice(i, 1);
      enemy.alive = false;
      basicEnemiesHitSound.play();
    }
  }
}

function playerProjHitBoss(enemy){
  //if the player has hit the boss

  //iterate through the birdship projectile array
  for (let i = birdShip.projectileArray.length - 1; i >= 0; i--){
    let projectile = birdShip.projectileArray[i];

    //if a projectile has hit the boss, splice the projectile, decrease the boss's health, and play hit sound
    if (isColliding2(enemy, projectile)){
      birdShip.projectileArray.splice(i, 1);
      boss.health --;
      bossHitSound.play();
    }
  }
}


function endGame(){
  //if the birdship has lost all of its health, end the game and display the loss screen
  if (birdShip.health <= 0){
    gameEnded = true;
    image(lossScreenImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  }

  //if the boss has been defeated
  if (boss.health <= 0){
    //play the boss defeated sound
    if (!bossDefeatSoundPlayed){
      bossDefeatedSound.play();
      bossDefeatSoundPlayed = true;
    }
    //end the game and display the win screen
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

