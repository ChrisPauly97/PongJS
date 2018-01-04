"use strict";
var gameStart, time, posX, posY, updated;
var Pucks = [],
  alivePucks = [],
  Obstacles = [],
  Paddles = [];
var i = 0,
  PaddleIsMoving = 0,
  p1Score = 0,
  p2Score = 0;
var width = 600;
var height = 400;
var invert, flicker, slow;

function setup() {
  drawControls();
  createCanvas(600, 400);

  Pucks.push(new Puck(12, 5, 4, 300, 200));
  Paddles.push(new Obj(0, 5, 180, 30, 80));
  Paddles.push(new Obj(0, 563, 180, 30, 80));

  for(i = 0; i < 3; i++){
    Obstacles.push(new Obj(0,random(50,550), random(50,350), 20, 50));
  }
}

function draw() {
  updated = false;
  time = window.frameCount % 1100;
  alivePucks = []

  background(0);
  drawScores();
  checkKeys();
  // Special Modes
  slowMode();
  invertMode();
  flickerMode();

  for (let puck of Pucks) {
    if (puck.xEdges()) {
      alivePucks.push(puck);
    }
  }
  Pucks = [];

  for (let alive of alivePucks) {
    alive.yEdges();
    if (flicker == true) {
      alive.flickerMode();
    } else {
      alive.show();
    }

    for (let paddle of Paddles) {
      paddle.show();
      puckCollision(alive, paddle);
    }

    for (let obstacle of Obstacles) {
      obstacle.show();
      puckCollision(alive, obstacle)
    }
  }

  for( let obstacle of Obstacles){
    if(PaddleIsMoving == -1){
      obstacle.move(3);
    }else if(PaddleIsMoving == 1){
      obstacle.move(-3);
    }
  }

  if (alivePucks.length == 1 && alivePucks[0].xEdges() === false) {
    alivePucks[0].reset();
  }

  arrayCopy(alivePucks, 0, Pucks, 0, alivePucks.length);
}

function collides(posX, posY, object, puck) {
  var DeltaX = posX - Math.max(object.x, Math.min(posX, object.x + object.width));
  var DeltaY = posY - Math.max(object.y, Math.min(posY, object.y + object.height));
  return ((DeltaX * DeltaX + DeltaY * DeltaY) < (puck.r * puck.r))
}

function puckCollision(puck, paddle) {
  posX = puck.x + puck.xspeed;
  posY = puck.y + puck.yspeed;

  if (collides(posX, puck.y, paddle, puck)) {
    puck.xspeed *= -1;
    puck.addMomentum();
    createPuck(paddle);
  } else if(!updated) {
    puck.update('x');
  }

  if (collides(puck.x, posY, paddle, puck)) {
    puck.yspeed *= -1;
    puck.addMomentum();
    createPuck(paddle);
  } else if(!updated){
    puck.update('y');
  }

  updated = true
}

function createPuck(Paddle) {

  if (random(0, 1) > 0.9) {

    if (Paddle.x === 5) {
      alivePucks.push(new Puck(12, 3, 2, Paddle.x + Paddle.width / 2 + 30, Paddle.y + 40))
    } else if (Paddle.x === 563) {
      alivePucks.push(new Puck(12, -3, 2, Paddle.x - Paddle.width / 2, Paddle.y + 40))
    }
  }
}
