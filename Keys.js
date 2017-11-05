"use strict";

function checkKeys() {
  if (keyIsDown(UP_ARROW) && invert == false) {
    PaddleIsMoving = -1;
    RightPaddle.move(-7);
  } else if(keyIsDown(UP_ARROW) && invert == true){
    PaddleIsMoving = 1;
    RightPaddle.move(7);
  }else{
    RightPaddle.move(0);
    PaddleIsMoving = 0
  }
  if (keyIsDown(87) && invert == false) {
    PaddleIsMoving = -1;
    LeftPaddle.move(-7);
  } else if(keyIsDown(87) && invert == true) {
    PaddleIsMoving = 1;
    LeftPaddle.move(7);
  }else{
    LeftPaddle.move(0);
    PaddleIsMoving = 0;
  }
  if (keyIsDown(DOWN_ARROW) && invert == false) {
    PaddleIsMoving = 1
    RightPaddle.move(7);
  } else if(keyIsDown(DOWN_ARROW) && invert == true){
    PaddleIsMoving = -1;
    RightPaddle.move(-7);
  }else{
    RightPaddle.move(0);
    PaddleIsMoving = 0
  }
  if (keyIsDown(83) && invert == false) {
    PaddleIsMoving = 1
    LeftPaddle.move(7);
  } else if(keyIsDown(83) && invert == true){
    PaddleIsMoving = -1;
    LeftPaddle.move(-7);
  }else{
    LeftPaddle.move(0);
    PaddleIsMoving = 0
  }
}
