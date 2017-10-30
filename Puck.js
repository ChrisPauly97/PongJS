"use strict";
class Puck{

  constructor(r, xspeed, yspeed, x, y){
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
    this.toRemove = false;
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
		this.xspeed = 4;
		this.yspeed = 2;
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
			if (random(0, 1) > 0.85) {
				this.show(rand1, rand2, rand3);
			}
		}else if(count >= 350 && count <= 700){
      drawMode("Flicker Mode");
      this.show(rand1, rand2, rand3);
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
		if (this.x > 600) {
			p1Score++;
      return false;
    } else if (this.x < 0) {
			p2Score++;
      return false;
		} else{
      return true;
    }
	}
	yEdges() {
		if (this.y - this.r < 0 || this.y + this.r > height) {
			this.yspeed = this.yspeed * -1;
		}
	}
	addMomentum() {
		if (PaddleIsMoving == -1) {
			this.yspeed += -3;
		} else if (PaddleIsMoving == 1) {
			this.yspeed += 3;
		}
	}
	checkPaddles() {
		if ((this.x - this.r) < (LeftPaddle.x + LeftPaddle.Pwidth/2) &&
			this.y + this.r > LeftPaddle.y &&
			this.y - this.r < LeftPaddle.y + 80){
			 this.xspeed = this.xspeed * -1;
			 this.addMomentum();
       if(random(0,1) > 0.8){
			   createPuck(LeftPaddle);
       }
		} else if (this.x  + this.r == RightPaddle.x - RightPaddle.Pwidth/2 &&
			this.y + this.r > RightPaddle.y &&
			this.y - this.r < RightPaddle.y + 80) {
			  this.xspeed = this.xspeed * -1;
			  this.addMomentum();
        if(random(0,1) > 0.8){
          createPuck(RightPaddle);
        }
			}
		}
	}
