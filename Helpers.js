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
    fill(255);
    textSize(24);
    text("Player 1 Score: " + p1Score + "\n" + "Player 2 Score: " + p2Score, (width/2) - 90, 30);
    pop();
}

// Display the current mode
function drawMode(txt) {
    push();
    fill(255);
    textSize(24);
    text(txt, (width/2)-70, height/2);
}

// Mode to invert the controls
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

// Mode to cause the pucks to flicker
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

// Mode to slow down pucks
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
