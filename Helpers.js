// Display the controls
function drawControls() {
  push();
  fill(255);
  textSize(24);
  text("w", 10, 15);
  text("s", 10, 390);
  text("↑", width - 15, 14);
  text("↓", width - 15, 394);
  pop();
}

// Display the scores
function drawScores() {
  push();
  textAlign(CENTER)
  fill(255);
  textSize(24);
  text("Player 1 Score: " + gameState.p1Score + "\n" + "Player 2 Score: " + gameState.p2Score, (width/2), 30);
  pop();
}

// Display the current mode
function drawMode(txt) {
  push();
  textAlign(CENTER)
  fill(255);
  textSize(24);
  text(txt, (width/2), 90);
  pop();
}
