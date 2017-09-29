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
		if (count >= random(0, 150) && count <= random(150, 300)) {
			slow = true;
		} else {
			slow = false;
		}
	}

	flickerMode() {
		if (count >= random(0, 500) && count <= random(500, 700)) {
			if (random(0, 1) > 0.9 && gameStart === true) {
				Puck.show(rand1, rand2, rand3);
			}
		} else {
			Puck.show(rand1, rand2, rand3);
		}
	}

	// Updates the Position of the puck
	// based on its speed
	update() {
		if (slow) {
			this.x = this.x + this.xspeed * 0.2;
			this.y = this.y + this.yspeed * 0.2;
		} else {
			this.x = this.x + this.xspeed;
			this.y = this.y + this.yspeed;
		}
	}

	// Checks if a player has won
	xEdges() {
		if (this.x > width) {
			p1Score++;
			this.reset();
		} else if (this.x < 0) {
			p2Score++;
			this.reset();
		}
	}

	// If the puck hits the top or bottom edge, bounce off of it
	yEdges() {
		if (this.y - this.r < 0 || this.y + this.r > height) {
			this.yspeed = this.yspeed * -1;
		}
	}

	addMomentum() {
		//If the paddle was moving
		if (downPressed === true || controlPressed === true && this.yspeed < 4) {
			// Add half of the velocity of the paddle to the Puck's Vertical motion
			this.yspeed += 3;
		} else if (upPressed === true || shiftPressed === true && this.yspeed < 4) {
			this.yspeed += -3;
		}
	}
	// Check if the Puck has hit a paddle and if so, change its speed and yposition accordingly
	checkPaddles() {
		// If the Puck collides with the left paddle
		if (this.x < 15 + this.r &&
			this.y > LeftPaddle.y &&
			this.y < LeftPaddle.y + 80) {
			  if(this.x - this.r < LeftPaddle.x){
			    // Rebound off of it
			    this.xspeed = this.xspeed * -1;
			    this.addMomentum();
			  }

			// If the Puck collides with the right paddle
		} else if ((this.x > 585 - this.r &&
				this.y > RightPaddle.y &&
				this.y < RightPaddle.y + 80)) {
			  if(this.x + this.r > RightPaddle.x){
			    // Rebound off of it
			    this.xspeed = this.xspeed * -1;
			    this.addMomentum();
			  }
		}
	}
}