var PaddleIsMoving = 0;
function setup() {
  createCanvas(600,400);
  RightPaddle = new Paddle();
  LeftPaddle = new Paddle()
  Puck = new Puck();
}

function draw(){
  background(0);  
  Puck.update();
  Puck.show();
  Puck.checkPaddles();
  Puck.yEdges();
  Puck.xEdges();
  RightPaddle.update();
  LeftPaddle.update();
  RightPaddle.draw(570);
  LeftPaddle.draw(10);
}

function Puck(){
  this.reset = function(){
    this.xspeed = 0;
    this.yspeed = 0;
    this.x = 300;
    this.y = 200;
  }
  this.r = 12;
  this.reset();
  
  // Updates the Position of the puck based on its speed
  this.update = function(){
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }
  // Draws the puck at the position defined in update
  this.show = function(){
    ellipse(this.x,this.y,2*this.r,2*this.r);
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
    if(PaddleIsMoving == 1){
      // Add half of the velocity of the paddle to the Puck's Vertical motion
      this.yspeed += 3.5;
    } else if (PaddleIsMoving == -1){
      this.yspeed += -3.5;
    }
  }
  // Check if the Puck has hit a paddle and if so, change its speed and yposition accordingly
  this.checkPaddles = function(){
    // If the Puck collides with the left paddle
    if(this.x < 30 + this.r && this.y > LeftPaddle.PaddleHeight && this.y < LeftPaddle.PaddleHeight + 80){
      // Rebound off of it
      this.xspeed = this.xspeed * -1;
      this.addMomentum();
    // If the Puck collides with the right paddle
    } else if(this.x > 570 - this.r && this.y > RightPaddle.PaddleHeight && this.y < RightPaddle.PaddleHeight + 80){
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
    rect(side,this.PaddleHeight,20,80);
  }
  // Moves the paddle by a given value
  this.move = function(value){
      this.ychange = value;
  }
}
function moveUp(Paddle){
  Paddle.move(-7);
  PaddleIsMoving = -1;
}
function moveDown(Paddle){
  Paddle.move(7);
  PaddleIsMoving = -1;
}
// Defines the controls for the Paddles
function keyPressed(){
  if(keyCode == UP_ARROW){
    moveUp(RightPaddle);
  }
  if(keyCode == SHIFT){
    moveUp(LeftPaddle);
  }
  if(keyCode == DOWN_ARROW){
    moveDown(RightPaddle);
  }
  if(keyCode == CONTROL){
    moveDown(LeftPaddle);
  }
  // Start the game
  if(key == ' '){
    Puck.xspeed = 4;
    Puck.yspeed = 0;
  }
}
//Function which means the paddles stop when the keys are released
function keyReleased(){
  LeftPaddle.move(0);
  RightPaddle.move(0);
}