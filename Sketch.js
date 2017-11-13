"use strict";
var slow, invert, gameStart;
var count = 0,
    i = 0,
    PaddleIsMoving = 0;
var p1Score = 0,
    p2Score = 0;
var rand1, rand2, rand3;
var RightPaddle, LeftPaddle;
var width = 600;
var height = 400;
var Pucks = [],
    alivePucks = [],
    Obstacles = [];

function setup() {
    createCanvas(600, 400);
    Pucks.push(new Puck(12, 4, 0, 300, 200));
    RightPaddle = new Paddle(0, 563, 180, 30, 80);
    LeftPaddle = new Paddle(0, 5, 180, 30, 80);
    Obstacles.push(new Obstacle(300, 200, 30, 80));
    Pucks[0].reset();
}

function draw() {
    alivePucks = []
    background(0);
    drawControls();
    drawScores();
    checkKeys();
    // For every Puck
    for (i = 0; i < Pucks.length; i++) {
        //If its onscreen
        if (Pucks[i].xEdges()) {
            // Add it to the alive pucks list
            alivePucks.push(Pucks[i]);
        }
    }
    // For all pucks on screen
    for (i = 0; i < alivePucks.length; i++) {
        // Update them
        alivePucks[i].update();
        if (count >= 400 && count <= 700) {
            alivePucks[i].flickerMode();
        } else {
            alivePucks[i].show();
        }
        alivePucks[i].yEdges();
        // alivePucks[i].checkObstacles();
        alivePucks[i].checkPaddles();
    }
    if (alivePucks.length == 1 && alivePucks[0].xEdges() === false) {
        alivePucks[0].reset();
    }
    Pucks = [];
    arrayCopy(alivePucks, 0, Pucks, 0, alivePucks.length);
    slowMode();
    invertMode();
    //Obstacles[0].show();
    // for (i = 0; i < Obstacles.length; i++) {
    //     Obstacles[i].show();
    // }

    //Paddle Functions
    RightPaddle.show();
    LeftPaddle.show();
    resetCount();
}

// Add a new puck to the game
function createPuck(Paddle) {
    if (Paddle.x === 5) {
        alivePucks.push(new Puck(12, 3, 2, Paddle.x + Paddle.Pwidth / 2 + 30, Paddle.y + 40))
    } else if (Paddle.x === 563) {
        alivePucks.push(new Puck(12, -3, 2, Paddle.x - Paddle.Pwidth / 2 - 12, Paddle.y + 40))
    }
}