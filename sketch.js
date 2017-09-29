"use strict";
var PaddleIsMoving = 0;
var slow = false;
var invert = false;
var gameStart = false;
var count = 0;
var p1Score = 0;
var p2Score = 0;
var rand1;
var rand2;
var rand3;
var i = 0;
var RightPaddle;
var LeftPaddle;
var width = 600;
var height = 400;

function setup() {

	createCanvas(600, 400);
	Puck = new Puck(12, 0, 0, width/2, height/2);
  RightPaddle = new Paddle(0,585,180,10,80);
	LeftPaddle = new Paddle(0,5,180,10,80);
	Puck.reset();
}
function draw() {
	background(0);
	Scores();
	// If the game is not running
	//draw the puck in the center
	if (gameStart === false) {
		Puck.show(rand1,rand2,rand3);
	}

	//Modes
// 	invertMode();
// 	Puck.flickerMode();
// 	Puck.slowMode();

	// Puck Functions
	Puck.show(rand1,rand2,rand3);
	Puck.update();
	Puck.checkPaddles();
	Puck.yEdges();
	Puck.xEdges();

  //Paddle Functions
	RightPaddle.update();
	LeftPaddle.update();
	RightPaddle.draw();
	LeftPaddle.draw();

	if (count > 2000) {
		count = 0;
	} else {
		count++;
	}
}

function Scores() {
	push();
		fill(255);
		textSize(24);
		text("Player 1 Score: " + p1Score + "\n" + "Player 2 Score: " + p2Score, 210, 30);
	pop();
}

//All General control functions Beyond this point
var upPressed = false;
var downPressed = false;
var shiftPressed = false;
var controlPressed = false;

function keyPressed() {
	if (keyCode == UP_ARROW) {
		PaddleIsMoving = -1;
		upPressed = true;
		if (slow) {
			RightPaddle.move(-2);
		} else if (invert) {
			RightPaddle.move(7);
		} else {
			RightPaddle.move(-7);
		}
	}
	if (keyCode == SHIFT) {
		PaddleIsMoving = -1;
		shiftPressed = true;
		if (slow) {
			LeftPaddle.move(-2);
		} else if (invert) {
			LeftPaddle.move(7);
		} else {
			LeftPaddle.move(-7);
		}
	}
	if (keyCode == DOWN_ARROW) {
		PaddleIsMoving = 1;
		downPressed = true;
		if (slow) {
			RightPaddle.move(2);
		} else if (invert) {
			RightPaddle.move(-7);
		} else {
			RightPaddle.move(7);
		}
	}
	if (keyCode == CONTROL) {
		PaddleIsMoving = 1;
		controlPressed = true;
		if (slow) {
			LeftPaddle.move(2);
		} else if (invert) {
			LeftPaddle.move(-7);
		} else {
			LeftPaddle.move(7);
		}
	}
	if (key == ' ') {
		Puck.yspeed = 0;
		Puck.xspeed = 4;
		gameStart = true;
	}
}
//Function which means the paddles stop when the keys are released
function keyReleased() {
	if (keyCode == UP_ARROW) {
		upPressed = false;
	}
	if (keyCode == DOWN_ARROW) {
		downPressed = false;
	}
	if (upPressed === false && downPressed === false) {
		RightPaddle.move(0);
	}
	if (keyCode == SHIFT) {
		shiftPressed = false;
	}
	if (keyCode == CONTROL) {
		controlPressed = false;
	}
	if (controlPressed === false && shiftPressed === false) {
		LeftPaddle.move(0);
	}
}

function invertMode() {
	if (count > random(1000, 1200) && count < random(1200, 1500)) {
		invert = true;
	} else {
		invert = false;
	}
}