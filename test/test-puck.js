var expect = require('chai').expect;
var Puck = require('../Puck.js').Puck;
var gameState = require('../gameState.js').gameState;
var Obj = require('../Obj.js').Obj;
var Paddles = [];
var puck = new Puck(12, 5, 4, 200, 300,false);
// Left Paddle
Paddles.push(new Obj(0, 5, 180, 30, 80,0,false));
var width = 800
var height = 500


describe('Puck Function Testing', function(){
  var gS = new gameState(0,p1Score = 0,p2Score = 0,false);


  it('Should check if pucks position after reset is correct',() => {
    puck.reset(800, 500);
    expect(puck.x).to.be.equal(400);
    expect(puck.y).to.be.equal(250);
  });

  it('Should return true since puck is within screen', ()=>{
    onScreen = puck.xEdges(width)
    expect(onScreen).to.be.equal(true);
  });

  it("Should return false since 1000 is offScreen in the X direction", ()=> {
    puck.x = 1000;
    onScreen = puck.xEdges(width,gS)
    expect(onScreen).to.be.equal(false);
  });

  it("Should return true since 300 is onScreen in the Y direction", ()=> {
    puck.y = 300;
    onScreen = puck.yEdges(height);
    expect(onScreen).to.be.equal(true);
  });

  it("Should return false since 600 is offScreen in the Y direction", ()=>{
    puck.y = 600;
    onScreen = puck.yEdges(height);
    expect(onScreen).to.be.equal(false);
  });

  it("Should return false as the pucks new x will not equal its old x after updating",()=> {
    x = puck.x;
    y = puck.y;
    puck.update(gS)
    expect(puck.x).not.to.be.equal(x)
  });

  it("Should increase the speed of the ball relative to the paddles movement",() => {
    Paddles[0].moving = -1;
    speed = puck.yspeed;
    puck.addMomentum(Paddles[0]);
    expect(puck.yspeed).not.to.be.equal(speed);
  });
});
describe('Puck Function Testing', function(){
  var gS = new gameState(0,p1Score = 0,p2Score = 0,false);
  it('move should move the paddles Y by the value provided',()=>{
    y = Paddles[0].y;
    Paddles[0].move(3,gS,height);
    expect(Paddles[0].y).not.to.be.equal(y)
  });
});
