// Check Keyboard input and move paddles accordingly
function checkKeys() {
  PaddleIsMoving = 0;
  if (keyIsDown(UP_ARROW)){
    PaddleIsMoving = -1;
    Paddles[1].move(-7);
  }
  if (keyIsDown(87)){
    PaddleIsMoving = -1;
    Paddles[0].move(-7);
  }
  if (keyIsDown(DOWN_ARROW)){
    PaddleIsMoving = 1;
    Paddles[1].move(7);
  }
  if (keyIsDown(83)){
    PaddleIsMoving = 1;
    Paddles[0].move(7);
  }
  if(PaddleIsMoving != 0){
    return;
  }
  PaddleIsMoving = 0;
  Paddles[0].move(0);
  Paddles[1].move(0);
}
