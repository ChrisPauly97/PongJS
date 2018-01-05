var gameStart, time, posX, posY;
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

  Pucks.push(new Puck(12, 5, 4, 300, 200,false));
  Paddles.push(new Obj(0, 5, 180, 30, 80));
  Paddles.push(new Obj(0, 563, 180, 30, 80));

  for(i = 0; i < 3; i++){
    Obstacles.push(new Obj(0,random(150,350), random(100,300), 20, 50));
  }
}

function draw() {
  // Timer to allow special modes to repeat
  time = window.frameCount % 1100;
  alivePucks = []
//
  background(0);
  drawScores();
  checkKeys();
  // Special Modes
  slowMode();
  invertMode();
  flickerMode();

  // Limit the number of pucks on screen at any time.
  if(Pucks.length > 3){
    Pucks.length = 3;
  }
  // Save only the on screen pucks
  for (let puck of Pucks) {
    puck.updated = false;
    if (puck.xEdges()) {
      alivePucks.push(puck);
    }
  }
  Pucks = [];

  // Check if the pucks collide with paddles or obstacles
  for (let alive of alivePucks) {
    for (let paddle of Paddles) {
      paddle.show();
      puckCollision(alive, paddle);
    }

    for (let obstacle of Obstacles) {
      obstacle.show();
      puckCollision(alive, obstacle)
    }

    // Update Pucks
    alive.yEdges();
    if (flicker == true) {
      alive.flickerMode();
    } else {
      alive.show();
    }

    if(alive.updated == false){
      alive.update('x')
      alive.update('y')
    }

  }
  // Move the obstacle inversely based on the paddles movement.
  for( let obstacle of Obstacles){
    if(PaddleIsMoving == -1){
      obstacle.move(3);
    }else if(PaddleIsMoving == 1){
      obstacle.move(-3);
    }
  }

  // If the last puck goes off-screen, reset
  if (alivePucks.length == 1 && alivePucks[0].xEdges() == false) {
    alivePucks[0].reset();
  }

  arrayCopy(alivePucks, 0, Pucks, 0, alivePucks.length);
}

// Calculate the distance between the puck and the object and check if a collision has occurred
function collides(posX, posY, object, puck) {
  var DeltaX = posX - Math.max(object.x, Math.min(posX, object.x + object.width));
  var DeltaY = posY - Math.max(object.y, Math.min(posY, object.y + object.height));
  return ((DeltaX * DeltaX + DeltaY * DeltaY) < (puck.r * puck.r))
}

function puckCollision(puck, paddle) {

  // The next X and Y of the puck
  posX = puck.x + puck.xspeed;
  posY = puck.y + puck.yspeed;

  // Collision on the X axis
  if (collides(posX, puck.y, paddle, puck)) {
    puck.xspeed *= -1;
    puck.addMomentum();
    createPuck(paddle);
  }

  // Collision on the y-axis
  if (collides(puck.x, posY, paddle, puck)) {
    puck.yspeed *= -1;
    puck.addMomentum();
    createPuck(paddle);
  }
}

// Create a new Puck at the given paddle
function createPuck(Paddle) {
  if (random(0, 1) > 0.9) {
    if (Paddle.x === Paddles[0].x) {
      alivePucks.push(new Puck(12, random(1,3),random(1,2), Paddle.x + Paddle.width / 2 + 30, Paddle.y + 40,false))
    } else if (Paddle.x === Paddles[1].x) {
      alivePucks.push(new Puck(12, random(-1,-3),random(1,2), Paddle.x - Paddle.width / 2, Paddle.y + 40,false))
    }
  }
}
