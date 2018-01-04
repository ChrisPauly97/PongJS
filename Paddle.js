"use strict";
// Defines a paddle object
class Obj {
  constructor(ychange, x, y, width, height) {
    this.ychange = ychange;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  // Draws the paddle on a given side
  show() {
    //fill(	255,105,180)
    rect(this.x, this.y, this.width, this.height);
  }
  // Moves the paddle by a given value
  move(value) {
    if(invert){
      value *= -1;
    }
    this.y += value;
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > 320) {
      this.y = 320;
    }
}
