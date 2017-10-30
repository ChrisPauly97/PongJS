"use strict";
var slow, invert, gameStart;
var count = 0,i = 0,PaddleIsMoving = 0;
var p1Score = 0, p2Score = 0;
var rand1,rand2,rand3;
var RightPaddle, LeftPaddle;
var width = 600;
var height = 400;
var Pucks = [];
var alivePucks = [];

function setup() {
  createCanvas(600,400);
	Pucks.push(new Puck(12, 4, 0, 300, 200));
  RightPaddle = new Paddle(0,585,180,10,80);
	LeftPaddle = new Paddle(0,5,180,10,80);
	Pucks[0].reset();
}

function createPuck(Paddle){
  if(Paddle.x === 5){
    alivePucks.push(new Puck(12,3,2,Paddle.x +Paddle.Pwidth/2 + 30,Paddle.y +40))
  }else if(Paddle.x === 585){
    alivePucks.push(new Puck(12,-3,2,Paddle.x -Paddle.Pwidth/2 - 12,Paddle.y +40))
  }
}

function draw() {
  alivePucks = []
	background(0);
	drawControls();
	Scores();
	if(keyIsDown(UP_ARROW)){
    PaddleIsMoving = -1
	  RightPaddle.move(-7);
	}else{
	  RightPaddle.move(0);
    PaddleIsMoving = 0
	}
	if(keyIsDown(87)){
    PaddleIsMoving = -1
	  LeftPaddle.move(-7);
	}else{
	  LeftPaddle.move(0);
    PaddleIsMoving = 0
	}
	if(keyIsDown(DOWN_ARROW)){
    PaddleIsMoving = 1
	  RightPaddle.move(7);
	}else{
	  RightPaddle.move(0);
    PaddleIsMoving = 0
	}
	if(keyIsDown(83)){
    PaddleIsMoving = 1
	  LeftPaddle.move(7);
	}else{
	  LeftPaddle.move(0);
    PaddleIsMoving = 0
	}
  // For every Puck
  for(i = 0; i < Pucks.length ; i++){
    //If its onscreen
    if(Pucks[i].xEdges()){
        // Add it to the alive pucks list
        alivePucks.push(Pucks[i]);
    }
  }
  // For all pucks on screen
  for(i = 0; i < alivePucks.length; i++){
    // Update them
    alivePucks[i].update();
    alivePucks[i].flickerMode();
    alivePucks[i].slowMode();
    alivePucks[i].yEdges();
    alivePucks[i].checkPaddles();
  }
  if(alivePucks.length == 1 && alivePucks[0].xEdges() === false){
    alivePucks[0].reset();
  }
  Pucks = []
  arrayCopy(alivePucks,0,Pucks,0,alivePucks.length)

  //Paddle Functions
	RightPaddle.show();
	LeftPaddle.show();

	if (count > 1500) {
		count = 0;
	} else {
		count++;
	}
}
function drawControls(){
  push();
    fill(255);
    textSize(24);
    text("w",10,15);
    text("s",10,390);
    text("↑",585,14);
    text("↓",585,394);
  pop();
}
function Scores() {
	push();
		fill(255);
		textSize(24);
		text("Player 1 Score: " + p1Score + "\n" + "Player 2 Score: " + p2Score, 210, 30);
	pop();
}
function drawMode(txt){
  push();
  fill(255);
  textSize(24);
  text(txt,230, 200);
}
function invertMode() {
  if (count >= 600 && count <= 1000){
    drawMode("Invert Mode");
  }
	if (count > 700 && count < 1000) {
		invert = true;
	} else {
		invert = false;
	}
}
