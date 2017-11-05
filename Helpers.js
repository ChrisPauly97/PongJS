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
  if (count >= 600 && count <= 1000) {
    drawMode("Invert Mode");
  }
  if (count > 700 && count < 1000) {
    invert = true;
  } else {
    invert = false;
  }
}

function slowMode() {
  if (count >= 150 && count <= 350) {
    drawMode("Slow Mode");
  }
  if (count >= 200 && count <= 350) {
    slow = true;
  } else {
    slow = false;
  }
}

function resetCount() {
  if (count > 1500) {
    count = 0;
  } else {
    count++;
  }
}
