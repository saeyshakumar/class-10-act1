var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY= -10
    }
    ghost.velocityY = ghost.velocityY+ 0.8
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      score = score+1
      ghost.velocityY = 0;
    }
    
   if(ghost.y>600 || ghost.isTouching(invisibleBlockGroup)) {
     ghost.destroy
     gameState = "end"
   }
    drawSprites();
    textSize(25)
    fill("cyan")
    text("Score: "+ score, 400,50)
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    score = 0
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    door= createSprite(200,-50)
    climber = createSprite(200,10)
    invisibleBlock = createSprite(200,15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    door.x = Math.round(random(120,400))
    climber.x = door.x
    invisibleBlock.x = door.x
    door.addImage("doorimg",doorImg)
    climber.addImage("climberimg", climberImg)
    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY=1
    door.depth = ghost.depth
    ghost.depth += 1
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

