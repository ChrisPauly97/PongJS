var Pucks = [],
  alivePucks = [],
  Obstacles = [],
  Paddles = [];

function setup() {
  gameState = new gameState(window.frameCount,p1Score = 0,p2Score = 0)
  drawControls();
  createCanvas(800,500);

  // Create the initial puck
  Pucks.push(new Puck(12, 5, 4, width/2, height/2,false));
  // Create the left paddle
  Paddles.push(new Obj(0, 5, 180, 30, 80));
  // Create the right paddle
  Paddles.push(new Obj(0, width-40, 180, 30, 80));

  for(i = 0; i < 3; i++){
    Obstacles.push(new Obj(0,random(width/4,width*0.75), random(height/4,height*0.75), 20, 50));
  }
}

function draw() {
  background(0);
  let totalFrames = 1100;
  // Resets the time to 0 when it reaches totalFrames
  gameState.time = window.frameCount % totalFrames;
  gameState.slowMode();

  drawScores();
  checkKeys();
  getAlivePucks();
  Pucks = []
  handleCollisions();
  updateAlivePucks();
  //updateObstacles();
  noPucks();

  arrayCopy(alivePucks, 0, Pucks, 0, alivePucks.length);
  alivePucks = []
}

// If the last puck goes off-screen, reset
function noPucks(){

  if (alivePucks.length == 1 && !alivePucks[0].xEdges()) {
    alivePucks[0].reset();
  }
}

// Update and show all pucks
function updateAlivePucks(){

  for(let alive of alivePucks){
    alive.yEdges();
    alive.shouldFlicker();

    if (alive.flicker == true){
      if(random(0, 1) > 0.85) alive.show();
    } else {
      alive.show();
    }

    if(!alive.updated){
      alive.update();
    }
  }
}

// Adds all the pucks to the alivePucks array
function getAlivePucks(){
  let maxPucks = 3
  // Limit the number of pucks on screen at any time.
  if(Pucks.length > maxPucks){
    Pucks.length = maxPucks;
  }

  // Save only the on screen pucks
  for (let puck of Pucks) {
    puck.updated = false;
    if (puck.xEdges()) {
      alivePucks.push(puck);
    }
  }
}

// Checks for collisions within the canvas
function handleCollisions(){

  for (let alive of alivePucks) {
    for (let paddle of Paddles) {
      paddle.shouldInvert();
      paddle.show();
      puckCollision(alive, paddle);
    }

    for (let obstacle of Obstacles) {
      obstacle.show();
      puckCollision(alive, obstacle);
    }
  }
}

// Calculate the distance between the puck and the object and check if a collision has occurred
function collides(posX, posY, object, puck) {

  var DeltaX = posX - Math.max(object.x, Math.min(posX, object.x + object.width));
  var DeltaY = posY - Math.max(object.y, Math.min(posY, object.y + object.height));
  return ((DeltaX * DeltaX + DeltaY * DeltaY) < (puck.r * puck.r));

}

function puckCollision(puck, obj) {
  // The next X and Y of the puck
  let posX = puck.x + puck.xspeed;
  let posY = puck.y + puck.yspeed;
  // Collision on the X axis
  if (collides(posX, puck.y, obj, puck)) {
    puck.xspeed *= -1;
    if(obj.moving){
      puck.addMomentum();
    }
    createPuck(obj);
  }

  // Collision on the y-axis
  if (collides(puck.x, posY, obj, puck)) {
    puck.yspeed *= -1;
    if(obj.moving){
      puck.addMomentum();
    }
    createPuck(obj);
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
