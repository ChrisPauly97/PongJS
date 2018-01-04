"use strict";

function drawControls() {
    push();
    fill(255);
    textSize(24);
    text("w", 10, 15);
    text("s", 10, 390);
    text("↑", 585, 14);
    text("↓", 585, 394);
    pop();
}

function drawScores() {
    push();
    fill(255);
    textSize(24);
    text("Player 1 Score: " + p1Score + "\n" + "Player 2 Score: " + p2Score, 210, 30);
    pop();
}

function drawMode(txt) {
    push();
    fill(255);
    textSize(24);
    text(txt, 230, 200);
}

function invertMode() {
  if (time >= 750 && time <= 1100) {
    drawMode("Invert Mode");
  }
  if (time > 800 && time < 1100) {
    invert = true;
  }else{
    invert = false;
  }
}
function flickerMode() {
  if (time >= 400 && time <= 700) {
    drawMode("Flicker Mode");
  }
  if (time >= 450 && time <= 700) {
    flicker = true;
  }else{
    flicker = false;
  }
}
function slowMode() {
  if (time >= 150 && time <= 350) {
    drawMode("Slow Mode");
  }
  if (time >= 200 && time <= 350) {
    slow = true;
  }else{
    slow = false;
  }
}
