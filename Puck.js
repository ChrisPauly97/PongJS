"use strict";
class Puck{
  constructor(r, xspeed, yspeed, x, y){
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
  }
  // Draws the puck at the position defined in update
	show(rand1, rand2, rand3) {
	  push();
		fill(rand1, rand2, rand3);
		ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
		pop();
	}
	// Reset the pucks color and position
	reset() {
		rand1 = random(0, 255);
		rand2 = random(0, 255);
		rand3 = random(0, 255);
		this.xspeed = 0;
		this.yspeed = 0;
		this.x = width/2;
		this.y = height/2;
		gameStart = false;
	}
	// Puck Modes
	slowMode() {
	  if (count >= 150 && count <= 350){
	    drawMode("Slow Mode");
	  }
		if (count >= 200 && count <= 350) {
			slow = true;
		} else {
			slow = false;
		}
	}
	flickerMode() {
		if (count >= 400 && count <= 700) {
			if (random(0, 1) > 0.85 && gameStart === true) {
				this.show(rand1, rand2, rand3);
			}
		}else if(count >= 350 && count <= 700){
      drawMode("Flicker Mode");
		}
		else {
		  this.show(rand1, rand2, rand3);
		}
	}
	update() {
		if (slow) {
			this.x = this.x + this.xspeed * 0.2;
			this.y = this.y + this.yspeed * 0.2;
		} else {
			this.x = this.x + this.xspeed;
			this.y = this.y + this.yspeed;
		}
	}
	xEdges() {
		if (this.x > width) {
			p1Score++;
			this.reset();
		} else if (this.x < 0) {
			p2Score++;
			this.reset();
		}
	}
	yEdges() {
		if (this.y - this.r < 0 || this.y + this.r > height) {
			this.yspeed = this.yspeed * -1;
		}
	}
	addMomentum() {
		if (downPressed === true || controlPressed === true && this.yspeed < 5) {
			this.yspeed += 3;
		} else if (upPressed === true || shiftPressed === true && this.yspeed < 5) {
			this.yspeed += -3;
		}
	}
	checkPaddles() {
		if (this.x - this.r -5 < LeftPaddle.x + LeftPaddle.Pwidth/2 &&
			this.y > LeftPaddle.y &&
			this.y < LeftPaddle.y + 80){
			 this.xspeed = this.xspeed * -1;
			 this.addMomentum();
			 if(random(0,1) > 0.8){
			  createPuck(LeftPaddle);
			 }
		} else if (this.x  + this.r -5 > RightPaddle.x - RightPaddle.Pwidth/2 &&
			this.y > RightPaddle.y &&
			this.y < RightPaddle.y + 80) {
			  this.xspeed = this.xspeed * -1;
			  this.addMomentum();
			  if(random(0,1) > 0.8){
          createPuck(RightPaddle);
			  }
			}
		}
	}