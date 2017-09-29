var PaddleIsMoving = 0;
var slow = false;
var invert = false;
var gameStart = false;
var count = 0;
var rand1 = 0;
var rand2 = 0;
var rand3 = 0;

function setup() {
  createCanvas(600,400);
  RightPaddle = new Paddle();
  LeftPaddle = new Paddle()
  Puck = new Puck();
}

function draw(){
  background(0);
  var i = 0;
  // 50% of the time if the
  // Allow the ball to disappear
  if(count >= 10 && count <= 300){
    if(random(0,1) > 0.9 && gameStart === true){
      Puck.show(rand1,rand2,rand3);
    }
  }else{
    Puck.show(rand1,rand2,rand3);
  }
  if (gameStart === false){
    Puck.show(rand1,rand2,rand3); 
  }

  // if(count >= 150 && count <= 300){
  // slow = true;
  // }else{
  //   slow =false;
  // }
  // if(count > random(1000,1200)&& count < random(1200,1500)){
  //   count = 0;
  //   invert = true;
  // }else{
  //   invert =false;
  // }
  Puck.update();
  Puck.checkPaddles();
  Puck.yEdges();
  Puck.xEdges();
  RightPaddle.update();
  LeftPaddle.update();
  RightPaddle.draw(570);
  LeftPaddle.draw(10);
  count++;
}

function Puck(){
  this.r = 12;
  this.reset = function(){ 
    rand1 = random(0,255);
    rand2 = random(0,255);
    rand3 = random(0,255);
    this.xspeed = 0;
    this.yspeed = 0;
    this.x = 300;
    this.y = 200;
    gameStart = false;
  }
  this.reset();
  // Updates the Position of the puck based on its speed
  this.update = function(){
    if(slow){
      this.x = this.x + this.xspeed * 0.2;
      this.y = this.y + this.yspeed * 0.2;
    }else{
      this.x = this.x + this.xspeed;
      this.y = this.y + this.yspeed;
    }
  }
  // Draws the puck at the position defined in update
  this.show = function(rand1,rand2,rand3){
    if(gameStart === false){
      push();
      fill(rand1,rand2,rand3);
      ellipse(this.x,this.y,2*this.r,2*this.r);
      pop();
    }else{
      push();
      fill(rand1,rand2,rand3);
      ellipse(this.x,this.y,2*this.r,2*this.r);
      pop();
    }
  }

  // Checks if a player has won
  this.xEdges = function(){
    if(this.x > 600){
      console.log('Player 1 Wins!');
      this.reset();
    } else if(this.x < 0){
      console.log('Player 2 Wins!');
      this.reset();     
    }
  }
  // If the puck hits the top or bottom edge, bounce off of it
  this.yEdges = function(){
    if(this.y < 0 || this.y > 400){
      this.yspeed = this.yspeed * -1;
    }
  }
  this.addMomentum = function(){
    //If the paddle was moving
    if(PaddleIsMoving == 1 && this.yspeed < 4){
      // Add half of the velocity of the paddle to the Puck's Vertical motion
      this.yspeed += 3.5;
    } else if (PaddleIsMoving == -1 && this.yspeed < 4){
      this.yspeed += -3.5;
    }
  }
  // Check if the Puck has hit a paddle and if so, change its speed and yposition accordingly
  this.checkPaddles = function(){
    // If the Puck collides with the left paddle
    if(this.x < 30 + this.r 
      && this.y > LeftPaddle.PaddleHeight 
      && this.y < LeftPaddle.PaddleHeight + 80){
      // Rebound off of it
      this.xspeed = this.xspeed * -1;
      this.addMomentum();
    // If the Puck collides with the right paddle
    } else if(this.x > 570 - this.r 
      && this.y > RightPaddle.PaddleHeight 
      && this.y < RightPaddle.PaddleHeight + 80){
      // Rebound from it
      this.xspeed = this.xspeed * -1;
      this.addMomentum();
    }
  }
}
// Defines a paddle object
function Paddle(){
  this.ychange = 0;
  this.PaddleHeight = 180;
  // Updates the position of the paddle
  this.update = function(){
      this.PaddleHeight += this.ychange;
      if(this.PaddleHeight < 0 ){
        this.PaddleHeight = 0;
      }
      if(this.PaddleHeight > 320){
        this.PaddleHeight = 320;
      }
    }
  // Draws the paddle on a given side
  this.draw = function(side){
    push();
    fill(255);
    rect(side,this.PaddleHeight,20,80);
    pop();
  }
  // Moves the paddle by a given value
  this.move = function(value){
      this.ychange = value;
  }
}

upPressed = false;
downPressed = false;
shiftPressed = false;
controlPressed = false;

function keyPressed(){
  if(keyCode == UP_ARROW){
    PaddleIsMoving = -1;
    upPressed = true;
    if(slow){
      RightPaddle.move(-2);
    } else if(invert){
      RightPaddle.move(7);
    } else{
     RightPaddle.move(-7);
    }
  }
  if(keyCode == SHIFT){
    PaddleIsMoving = -1;
    shiftPressed = true;
    if(slow){
      LeftPaddle.move(-2);
    }else if(invert){
      LeftPaddle.move(7);
    }else{
      LeftPaddle.move(-7);
    }
  }
  if(keyCode == DOWN_ARROW){
    PaddleIsMoving = 1;
    downPressed = true;
    if(slow){
      RightPaddle.move(2);
    }else if(invert){
      RightPaddle.move(-7);
    }else{
      RightPaddle.move(7);
    }
  }
  if(keyCode == CONTROL){
    PaddleIsMoving = 1;
    controlPressed = true;
    if(slow){
      LeftPaddle.move(2);
    }else if(invert){
      LeftPaddle.move(-7);
    }else{
      LeftPaddle.move(7);
    }
  }
  if(key == ' '){
    Puck.yspeed = 2;
    Puck.xspeed = 4;
    gameStart = true;
  }
}
//Function which means the paddles stop when the keys are released
function keyReleased(){
  if(keyCode == UP_ARROW){
    upPressed = false;
  }  
  if(keyCode == DOWN_ARROW){
    downPressed = false;
  }
  if(upPressed === false && downPressed === false){
    RightPaddle.move(0);
  }
  if(keyCode == SHIFT){
    shiftPressed = false;
  }
  if(keyCode == CONTROL){
    controlPressed = false;
  }
  if(controlPressed === false && shiftPressed === false){
    LeftPaddle.move(0);
  }
}