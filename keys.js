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
	if (keyCode == 87) {
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
	if (keyCode == 83) {
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
		Pucks[0].yspeed = 0;//random(-4,4);
		Pucks[0].xspeed = 4;
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
	if (keyCode == 87) {
		shiftPressed = false;
	}
	if (keyCode == 83) {
		controlPressed = false;
	}
	if (controlPressed === false && shiftPressed === false) {
		LeftPaddle.move(0);
	}
}