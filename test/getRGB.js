var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#getRGB", function() {

  it("should return RGB hex code", function() {
    var canvas = new gretro.Canvas(8, 8);

    canvas.fill([ 0, 4, 8 ]).clear();

    expect(canvas.getRGB( 0,  0)).to.equal(0x007700);
    expect(canvas.getRGB( 1,  0)).to.equal(0x000000);
    expect(canvas.getRGB(-1, -1)).to.equal(-1);
  });

});

describe("CanvasRGB#getRGB", function() {

  it("should return RGB hex code", function() {
    var canvas = new gretro.CanvasRGB(8, 8);

    canvas.fill([ 0, 4, 8 ]).clear();

    expect(canvas.getRGB( 0,  0)).to.equal(0x007700);
    expect(canvas.getRGB( 1,  0)).to.equal(0x000000);
    expect(canvas.getRGB(-1, -1)).to.equal(-1);
  });

});
