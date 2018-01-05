"use strict";
// Defines a puck object
class Puck {
  constructor(r, xspeed, yspeed, x, y,updated) {
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
    this.updated = updated;
  }

  // Draws the puck at the position defined in update
  show() {
    fill(255);
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }

  // Move the puck according to its velocity
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
    this.updated = true;
  }

  // Reset the pucks color and position
  reset() {
    this.xspeed = 5;
    this.yspeed = 4;
    this.x = width / 2;
    this.y = height / 2;
    gameStart = false;
  }

  // Puck Mode
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
  
  // Check if the puck hits the top or bottom of the screen
  yEdges() {
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.yspeed = this.yspeed * -1;
    }
  }

  // if a paddle is moving during a collision, add speed to the puck
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
  }
}
