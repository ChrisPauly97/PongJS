// Defines an object
class Obj {

  constructor(ychange, x, y, width, height,moving = 0,invert = false) {
    this.ychange = ychange;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.moving = moving;
    this.invert = invert
  }

  // Draws the paddle on a given side
  show() {
    rect(this.x, this.y, this.width, this.height);
  }

  shouldInvert(){
    // Mode to invert the controls
    if (gameState.time >= 750 && gameState.time <= 1100) {
      drawMode("Invert Mode");
      this.invert = true;
    }else{
      this.invert = false;
    }
  }

  // Moves the paddle by a given value
  move(value,gameState,height) {
    if(this.invert){
      value *= -1;
    }
    if(gameState.slow){
      value *= 0.4;
    }
    this.moving = Math.sign(value);
    this.y += value;
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > height - this.height) {
      this.y = height - this.height;
    }
  }
}

module.exports.Obj = Obj;
