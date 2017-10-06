"use strict";
var slow, invert, gameStart;
var count = 0,i = 0,PaddleIsMoving = 0;
var p1Score = 0, p2Score = 0;
var rand1,rand2,rand3;
var RightPaddle, LeftPaddle;
var Pucks = [];
var width = 600;
var height = 400;

function setup() {
  createCanvas(width,height);
	Pucks.push(new Puck(12, 4, 0, width/2, height/2));
  RightPaddle = new Paddle(0,585,180,10,80);
	LeftPaddle = new Paddle(0,5,180,10,80);
	for(i = 0;i < Pucks.length; i++){
	  Pucks[i].reset();
	}
}

function createPuck(Paddle){
  Pucks.push(new Puck(12,-3,2,Paddle.x -Paddle.Pwidth/2 - 12,Paddle.y +40))
}

function draw() {
	background(0);
	drawControls();
	Scores();
	if (gameStart === false) {
		Pucks[0].show(rand1,rand2,rand3);
	}
	if(keyIsDown(UP_ARROW)){
	  RightPaddle.move(-7);
	}else{
	  RightPaddle.move(0);
	}
	if(keyIsDown(87)){
	  LeftPaddle.move(-7);
	}else{
	  LeftPaddle.move(0);
	}
	if(keyIsDown(DOWN_ARROW)){
	  RightPaddle.move(7);
	}else{
	  RightPaddle.move(0);
	}
	if(keyIsDown(83)){
	  LeftPaddle.move(7);
	}else{
	  LeftPaddle.move(0);
	}
	//invertMode();
  for(i = 0; i< Pucks.length; i++){
    //Pucks[i].flickerMode();
	  Pucks[i].slowMode();
  	// Puck Functions
  	Pucks[i].update();
  	Pucks[i].checkPaddles();
  	Pucks[i].yEdges();
    Pucks[i].xEdges();
    Pucks[i].show();
  }
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