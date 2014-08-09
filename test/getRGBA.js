var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#getRGBA", function() {

  it("should return RGBA hex code", function() {
    var canvas = new gretro.Canvas(8, 8);

    canvas.fill([ 0, 4, 8 ]).clear();

    expect(canvas.getRGBA( 0,  0)).to.equal(0xff007700);
    expect(canvas.getRGBA( 1,  0)).to.equal(0xff000000);
    expect(canvas.getRGBA(-1, -1)).to.equal(-1);
  });

});

describe("CanvasRGB#getRGBA", function() {

  it("should return RGBA hex code", function() {
    var canvas = new gretro.CanvasRGB(8, 8);

    canvas.fill([ 0, 4, 8 ]).clear();

    expect(canvas.getRGBA( 0,  0)).to.equal(0xff007700);
    expect(canvas.getRGBA( 1,  0)).to.equal(0xff000000);
    expect(canvas.getRGBA(-1, -1)).to.equal(-1);
  });

});

describe("CanvasRGBA#getRGBA", function() {

  it("should return RGBA hex code", function() {
    var canvas = new gretro.CanvasRGBA(8, 8);

    canvas.fill([ 0, 4, 8 ]).clear();

    expect(canvas.getRGBA( 0,  0)).to.equal(0x00007700);
    expect(canvas.getRGBA( 1,  0)).to.equal(0x00000000);
    expect(canvas.getRGBA(-1, -1)).to.equal(-1);
  });

});
