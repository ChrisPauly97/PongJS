"use strict";
// Defines a paddle object
class Paddle {
    constructor(ychange, x, y, Pwidth, Pheight) {

        this.ychange = ychange;
        this.x = x;
        this.y = y;
        this.Pwidth = Pwidth;
        this.Pheight = Pheight;

    }


    // Draws the paddle on a given side
    show() {
        rect(this.x, this.y, this.Pwidth, this.Pheight);
    }


    // Moves the paddle by a given value
    move(value) {
        this.y += value;

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > 320) {
            this.y = 320;
        }
    }
}