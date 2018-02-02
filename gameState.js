class gameState{
  constructor(time, p1Score, p2Score,slow = false){
    this.time = time;
    this.p1Score = p1Score;
    this.p2Score = p2Score;
    this.slow = slow;
  }
  incrementP1Score(){
    this.p1Score++;
  }
  incrementP2Score(){
    this.p1Score++;
  }
  slowMode() {
    if (this.time >= 150 && this.time <= 350) {
      drawMode("Slow Mode");
    }
    if (this.time >= 200 && this.time <= 350) {
      this.slow = true;
    }else{
      this.slow = false;
    }
  }
}

module.exports.gameState = gameState;
