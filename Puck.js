
// Defines a puck object
class Puck {
  constructor(r, xspeed, yspeed, x, y,updated,flicker = false) {
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
    this.updated = updated;
    this.flicker = flicker;
  }

  // Draws the puck at the position defined in update
  show() {
    fill(255);
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }

  // Move the puck according to its velocity
  update(gameState) {
    this.updated = false;
    if (gameState.slow) {
      this.x += this.xspeed * 0.4;
      this.y += this.yspeed * 0.4;
      this.updated = true;
    } else {
      this.x += this.xspeed;
      this.y += this.yspeed;
      this.updated = true;
    }
  }

  // Reset the pucks color and position
  reset(gameState) {
    this.xspeed = 5;
    this.yspeed = 4;
    this.x = gameState.width / 2;
    this.y = gameState.height / 2;
  }

  // Puck Checks
  xEdges(gameState) {
    if (this.x > gameState.width) {
      gameState.p1Score++;
      return false;
    } else if (this.x < 0) {
      gameState.p2Score++;
      return false;
    } else {
      return true;
    }
  }

  // Check if the puck hits the top or bottom of the screen
  yEdges(gameState) {
    if (this.y - this.r < 0 || this.y + this.r > gameState.height) {
      this.yspeed = this.yspeed * -1;
      return false;
    }
    return true;
  }

  // Check if the puck should flicker
  shouldFlicker(){
    if (gameState.time >= 400 && gameState.time <= 700) {
      drawMode("Flicker Mode");
      this.flicker = true;
    }else{
      this.flicker = false;
    }
  }

  // if a paddle is moving during a collision, add speed to the puck
  addMomentum(paddle) {
      if (paddle.invert) {
        if (paddle.moving == -1) {
          this.yspeed += 3;
        } else if (paddle.moving == 1) {
          this.yspeed += -3;
        }
      } else {
        if (paddle.moving == -1) {
          this.yspeed += -3;
        } else if (paddle.moving == 1) {
          this.yspeed += 3;
        }
      }
    }
    export class Puck;

}
