var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var endImg, end_ ;
//gameStates
var PLAY = 1;
var END = 0;
var gameState;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  
}

function setup(){
 
   gameState = PLAY;
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.debug=true;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

 console.log(windowWidth);
  
  if(gameState===PLAY) {
  
  background(0);
  
        if(windowWidth==526) {
        console.log("going");
        boy.x = World.mouseX; }
        else 
        {
        if(touches.length > 0) {
          boy.x = touches[0];
          touches = null;
        } 
        }  
    
    
    
    console.log(windowWidth);
    
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      treasureCollection = treasureCollection + 1;
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      treasureCollection = treasureCollection + 5;
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      treasureCollection = treasureCollection + 3;
      jwelleryG.destroyEach();
      
      
    }
    else {
    
      if(swordGroup.isTouching(boy)) {
        
        console.log("boy touching sword") 
        //treasureCollection = 0;
        swordGroup.destroyEach();
        gameState = END;
      boy.visible=false;
      path.velocityY = 0;
      cashG.destroyEach();
      jwelleryG.destroyEach();
      diamondsG.destroyEach(); 
      diamondsG.setVelocityYEach(0);
      cashG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
      gameOver();
      console.log(gameState);
    }
    }
   
    
  }
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-200,height-10);

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),height-200, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 300 == 0) {
  var diamonds = createSprite(Math.round(random(70, width-30),height-70, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 250 == 0) {
  var jwellery = createSprite(Math.round(random(90, width-40),height-90, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 700 == 0) {
  var sword = createSprite(Math.round(random( width-90),height-80, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function gameOver () 
{
        end_ = createSprite(width/2,height/2,20,20);
      end_.addAnimation("end",endImg);
}