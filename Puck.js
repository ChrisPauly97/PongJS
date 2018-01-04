"use strict";
class Puck {
  constructor(r, xspeed, yspeed, x, y) {
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
  }

  // Draws the puck at the position defined in update
  show() {
    fill(255);
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }

  update(axis) {
    if (axis == 'x') {
      if (slow) {
        this.x += this.xspeed * 0.4;
      } else {
        this.x += this.xspeed;
      }
    } else if (axis == 'y') {
      if (slow) {
        this.y += this.yspeed * 0.4;
      } else {
        this.y += this.yspeed;
      }
    }
  }

  // Reset the pucks color and position
  reset() {
    this.xspeed = 5;
    this.yspeed = 4;
    this.x = width / 2;
    this.y = height / 2;
    gameStart = false;
  }

  // Puck Modes
  flickerMode() {
    if (random(0, 1) > 0.85) {
      this.show();
    }
  }

  // Puck Checks
  xEdges() {
    if (this.x > width) {
      p1Score++;
      return false;
    } else if (this.x < 0) {
      p2Score++;
      return false;
    } else {
      return true;
    }
  }

  yEdges() {
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.yspeed = this.yspeed * -1;
    }
  }

  addMomentum() {
    if (invert) {
      if (PaddleIsMoving == -1) {
        this.yspeed += 3;
      } else if (PaddleIsMoving == 1) {
        this.yspeed += -3;
      }
    } else {
      if (PaddleIsMoving == -1) {
        this.yspeed += -3;
      } else if (PaddleIsMoving == 1) {
        this.yspeed += 3;
      }
    }


    checkPaddles() {
        if (this.x + this.r > RightPaddle.x + 5) {
            return;
        } else if (this.x - this.r < LeftPaddle.x + LeftPaddle.Pwidth - 5) {
            return;
        }

        if ((this.x - this.r) < (LeftPaddle.x + LeftPaddle.Pwidth) &&
            this.y + this.r > LeftPaddle.y &&
            this.y - this.r < LeftPaddle.y + LeftPaddle.Pheight) {

            this.xspeed = this.xspeed * -1;
            this.addMomentum();

            if (random(0, 1) > 0.8) {
                createPuck(LeftPaddle);
            }

        } else if ((this.x + this.r) > RightPaddle.x &&
            this.y + this.r > RightPaddle.y &&
            this.y - this.r < RightPaddle.y + RightPaddle.Pheight) {

            this.xspeed = this.xspeed * -1;
            this.addMomentum();

            if (random(0, 1) > 0.8) {
                createPuck(RightPaddle);
            }
        }
    }
}
