// Check Keyboard input and move paddles accordingly
function checkKeys() {
  for(let paddle of Paddles){
    paddle.moving = 0;
    if (keyIsDown(UP_ARROW)){
      paddle.moving = -1;
      Paddles[1].move(-7,gameState,height);
    }
    if (keyIsDown(87)){
      paddle.moving = -1;
      Paddles[0].move(-7,gameState,height);
    }
    if (keyIsDown(DOWN_ARROW)){
      paddle.moving = 1;
      Paddles[1].move(7,gameState,height);
    }
    if (keyIsDown(83)){
      paddle.moving = 1;
      Paddles[0].move(7,gameState,height);
    }
    if(paddle.moving != 0){
      return;
    }
    paddle.moving = 0;
    Paddles[0].move(0,gameState,height);
    Paddles[1].move(0,gameState,height);
  }

}
