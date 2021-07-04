const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;


var ninja,ninjaRunning;
var ninjaCollided;
var bg,bgImage;
var chest,chestImg;
var stand,standImg;
var edges;
var score = 0;
var obstacle1,obstacle1Img,obstacle2,obstacle2Img;
var gameEndBg;
var reset,resetImg;

var play = 1;
var end = 0;
var gameState = play;


function preload(){
  ninjaRunning = loadAnimation("Images/ninja1.png","Images/ninja2.png","Images/ninja3.png","Images/ninja4.png","Images/ninja5.png",
  "Images/ninja6.png");
  ninjaCollided = loadAnimation("Images/ninja1.png");
  bgImage = loadImage("Images/bgImageJungle.jpeg");
  chestImg = loadImage ("Images/chest.png");
  standImg = loadImage("Images/stand (3).png")
  obstacle1Img = loadImage("Images/spikeBallimage.png");
  obstacle2Img = loadImage("Images/spikes.png");
  gameEndBg = loadImage("Images/gameOver4.jpg");
  resetImg = loadImage("Images/resetButton.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-200);
  engine = Engine.create();
  world = engine,world;

   bg = createSprite(displayWidth/2-20,displayHeight/2-100,610,610);
   bg.addImage(bgImage);
   bg.scale = 3.4;

   ninja = createSprite(100,500,1,1);
   ninja.addAnimation("running",ninjaRunning)
   ninja.scale = 0.5;
   ninja.setCollider("circle",0,0,220)
   ninja.debug=false;

   reset = createSprite(780,550,1,1);
    reset.addImage(resetImg);
    reset.scale = 0.4;
    reset.visible = false;

  edges = createEdgeSprites();

  stand_group = new Group();
  chest_group = new Group();
  obstacle1_group = new Group();
  obstacle2_group = new Group();
}

function draw() {
  background("pink");

  if(gameState === play){
    bg.velocityX=-5;

    if(bg.x<500){
      bg.x =displayWidth/2;
    }
    
    ninja.velocityY = ninja.velocityY+1;
    
    if(keyDown("SPACE")&& ninja.y<900){
      ninja.velocityY = -10;
    }

    if(ninja.isTouching(chest_group)){
      chest_group.destroyEach();
      score = score+1;
    }
  
   if(ninja.isTouching(obstacle1_group)){
     obstacle1_group.destroyEach();
     score = score-1;
   }

   ninja.collide(edges);
   ninja.collide(stand_group);

   if(ninja.isTouching(obstacle2_group)){
    obstacle2_group.destroyEach();
    gameState = end;
  }

 
  }

  spawnStand();
  spawnChest();
  spawnObstacle1();
  spawnObstacle2();

  if(gameState === end){
    stand_group.destroyEach();
    stand.velocityX = 0;
    chest_group.destroyEach();
    chest.velocityX = 0;
    obstacle1_group.destroyEach();
    obstacle1.velocityX = 0;
    obstacle2_group.destroyEach();
    obstacle2.velocityX = 0;
    bg.velocityX = 0;
    bg.visible = false;
    ninja.changeAnimation("collided",ninjaCollided);
    ninja.visible = false;
    reset.visible = true;
    background(gameEndBg);
    
  if(mousePressedOver(reset)){
    replay();
  }
  }

  drawSprites();

  textSize(40); 
fill("white");  
text("Score: "+score,100,100)



}

function spawnStand(){
  if(frameCount%100 === 0){
    stand = createSprite(1300,0,1,1);
    stand.addImage(standImg);
    stand.scale = 1;
    stand.velocityX = -5;
    stand.y= Math.round(random(450,650));
    stand_group.add(stand);
  }
}

function spawnChest(){
  if(frameCount%300 === 0){
    chest = createSprite(1300,0,1,1);
    chest.addImage(chestImg);
    chest.scale = 0.3;
    chest.velocityX = -5;
    chest.y = Math.round(random(300,400));
    chest_group.add(chest);
  }
}

function spawnObstacle1(){
  if(frameCount%350 === 0){
    obstacle1 = createSprite(1300,0,1,1);
   obstacle1.addImage(obstacle1Img);
   obstacle1.scale = 0.3;
   obstacle1.velocityX = -5;
   obstacle1.y = Math.round(random(150,370));
   obstacle1_group.add(obstacle1);
  }
}

function spawnObstacle2(){
  if(frameCount%450 === 0){
    obstacle2 = createSprite(1300,0,1,1);
    obstacle2.addImage(obstacle2Img);
    obstacle2.scale = 0.3;
    obstacle2.velocityX = -5;
    obstacle2.x = stand.x;
    obstacle2.y = stand.y-10;
    obstacle2_group.add(obstacle2);
  }
}

function replay(){
   gameState = play;
   bg.visible = true;
   ninja.visible = true;
   ninja.changeAnimation("running",ninjaRunning);
   ninja.x = 100;
   ninja.y = 200;
   reset.visible = false;
   score = 0;
}