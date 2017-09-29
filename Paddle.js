"use strict";
// Defines a paddle object
class Paddle {
  constructor(ychange,x,y,Pwidth,Pheight){
    this.ychange = ychange;
    this.x = x;
    this.y = y;
    this.Pwidth = Pwidth;
    this.Pheight = Pheight;
  }
	// Updates the position of the paddle
	update() {
		this.y += this.ychange;
		if (this.y < 0) {
			this.y = 0;
		} else if (this.y > 320) {
			this.y = 320;
		}
	}
	// Draws the paddle on a given side
	draw() {
		rect(this.x, this.y, this.Pwidth, this.Pheight);
	}
	// Moves the paddle by a given value
	move(value) {
		this.ychange = value;
	}
}