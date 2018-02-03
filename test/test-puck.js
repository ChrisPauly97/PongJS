var modules = require('./modules.js');
var expect = require('chai').expect;
var Paddles = [],alivePucks = [];

var puck = new modules.Puck.Puck(12, 5, 4, 200, 300,false);
Paddles.push(new modules.Obj.Obj(0, 5, 180, 30, 80,0,false));
var gS = new modules.gameState(0,p1Score = 0,p2Score = 0,false,800,500);


describe('Puck Function Testing', function(){
  describe('Puck On Screen', ()=>{
    it('Should return true since puck is within screen', ()=>{
      var puck = new modules.Puck.Puck(12, 5, 4, 200, 300,false);
      onScreen = puck.xEdges(gS)
      expect(onScreen).to.be.equal(true);
    });
    it("Should return false since 1000 is offScreen in the X direction", ()=> {
      puck.x = 1000;
      onScreen = puck.xEdges(gS)
      expect(onScreen).to.be.equal(false);
    });

    it("Should return true since 300 is onScreen in the Y direction", ()=> {
      puck.y = 300;
      onScreen = puck.yEdges(gS);
      expect(onScreen).to.be.equal(true);
    });

    it("Should return false since 600 is offScreen in the Y direction", ()=>{
      puck.y = 600;
      onScreen = puck.yEdges(gS);
      expect(onScreen).to.be.equal(false);
    });
  });

  it('Should check if pucks position after reset is correct',() => {
    puck.reset(gS);
    expect(puck.x).to.be.equal(gS.width/2);
    expect(puck.y).to.be.equal(gS.height/2);
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

  it("Should increase player 1's score since x > width", ()=>{
    puck.x = 900;
    p1 = gS.p1Score;
    puck.xEdges(gS);
    expect(gS.p1Score).not.to.be.equal(p1);
  });
  //Fix this test, class puck is not allowed to be instantiated within method
  // it("Should increase the length of alive Pucks by 1", ()=>{
  //   modules.createPuck(Paddles[0]);
  //   expect(alivePucks.length).to.be.equal(1);
  // });

});
describe('Paddle Function Testing', function(){
  it('move should move the paddles Y by the value provided',()=>{
    y = Paddles[0].y;
    Paddles[0].move(3,gS);
    expect(Paddles[0].y).not.to.be.equal(y)
  });

  it('should report true if puck and paddle collide',()=>{
    puck.x = Paddles[0].x;
    puck.y = Paddles[0].y;
    posX = puck.x + puck.xspeed;
    posY = puck.y + puck.yspeed;
    collision = modules.collides(posX,posY,Paddles[0],puck);
    expect(collision).to.be.equal(true);
  });
  it('should report false if puck and paddle do not collide',()=>{
    puck.x = 300;
    posX = puck.x + puck.xspeed;
    collision = modules.collides(posX,posY,Paddles[0],puck);
  });
});
