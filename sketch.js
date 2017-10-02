"use strict";
var slow = false;
var invert = false;
var gameStart = false;
var count = 0,i = 0,PaddleIsMoving = 0;
var p1Score = 0, p2Score = 0;
var rand1,rand2,rand3;
var RightPaddle;
var LeftPaddle;
var Pucks = [];
var width = 600;
var height = 400;

function setup() {
  createCanvas(600, 400);
	Pucks.push(new Puck(12, 0, 0, width/2, height/2));
  RightPaddle = new Paddle(0,585,180,10,80);
	LeftPaddle = new Paddle(0,5,180,10,80);
	for(i = 0;i < Pucks.length; i++){
	  Pucks[i].reset();
	}
}
function createPuck(Paddle){
  Pucks.push(new Puck(12,-10,0,Paddle.x -Paddle.Pwidth/2 - 12,Paddle.y +40))
}
function draw() {
	background(0);
	drawControls();
	Scores();
	// If the game is not running
	//draw the puck in the center
	if (gameStart === false) {
		Pucks[0].show(rand1,rand2,rand3);
	}

	// Modes
	//invertMode();
  for(i = 0; i< Pucks.length; i++){
    //Pucks[i].flickerMode();
	  //Pucks[i].slowMode();
  	// Puck Functions
  	Pucks[i].update();
  	Pucks[i].checkPaddles();
  	Pucks[i].yEdges();
  	Pucks[i].xEdges();
  	Pucks[i].show();
  }

  //Paddle Functions
	RightPaddle.update();
	LeftPaddle.update();
	RightPaddle.draw();
	LeftPaddle.draw();

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
    text("↑",590,15);
    text("↓",590,395);
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