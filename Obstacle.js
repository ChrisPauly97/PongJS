"use strict";
class Obstacle{
    constructor(x,y,Owidth,Oheight){
        this.x = x;
        this.y = y;
        this.Owidth = Owidth;
        this.Oheight = Oheight;
    }


    // Draws the paddle on a given side
    show() {
      push();
        fill(255);
        rect(this.x, this.y, this.Owidth, this.Oheight);
      pop();
    }


}
