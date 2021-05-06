var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running;
var ground;

var bg,bg_img;
var stump,stump_img;
var star,star_img;
var obstaclesGroup,starGroup;
var score;

function preload(){
  player_running=loadAnimation("player1.png","player2.png","player3.png","player4.png","player5.png","player6.png","player7.png","player8.png")
  bg_img=loadImage("images/bg.jpg");
  star_img=loadImage("images/star.png");
  stump_img=loadImage("images/stump.png");
}

function setup() {
  createCanvas(800, 800);
  
 bg=createSprite(400,400,800,800);
 bg.addImage("behind",bg_img);
 bg.x=bg.width/2;
 bg.velocityX=-3;

  player = createSprite(200,760,20,50);
  player.addAnimation("running", player_running);
  //player.addAnimation("collided", player_collided);
  //trex.scale = 0.5;
  
  ground = createSprite(400,780,800,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX =-6;
  
  obstaclesGroup=new Group();
  starGroup=new Group();
  score=0;
}

function draw() {
  //trex.debug = true;
  background(255);

  text("Score: "+ score, 500,50);
  ground.velocityX = -6;
  bg.velocityX=-6;
  if (gameState===PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    if (bg.x < 0){
      bg.x = bg.width/2;
    }

   score = score + Math.round(getFrameRate()/60);
     

    console.log(player.y);
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    player.collide(ground);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END){
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    star = createSprite(800,120,40,10);
    star.y = Math.round(random(80,120));
  star.addImage("power",star_img);
    star.scale = 0.5;
    star.velocityX = -3;
    
     //assign lifetime to the variable
    star.lifetime = 268;
    
    //adjust the depth
    star.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    starGroup.add(star);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var stump = createSprite(800,165,10,40);
    stump.addImage("stone",stump_img);
    //obstacle.debug = true;
    stump.velocityX = -6;
    stump = Math.round(random(0,750));
    //generate random obstacles
    
    //assign scale and lifetime to the obstacle           
    stump.scale = 0.5;
    stump.lifetime = 135;
    //add each obstacle to the group
    obstaclesGroup.add(stump);
  }
}

function reset(){
  
  obstaclesGroup.destroyEach();
  starGroup.destroyEach();
  
  //player.changeAnimation("running",player_running);
  
 
  
  score = 0;
  
}