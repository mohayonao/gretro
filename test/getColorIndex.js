var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#getColorIndex", function() {

  it("should return color index", function() {
    var canvas = new gretro.Canvas(8, 8);

    canvas.fill([ 0, 4, 8 ]).clear();

    expect(canvas.getColorIndex( 0,  0)).to.equal( 4);
    expect(canvas.getColorIndex( 1,  0)).to.equal( 0);
    expect(canvas.getColorIndex(-1, -1)).to.equal(-1);
  });

});

describe("CanvasRGB#getColorIndex", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGB(1, 4);

    expect(function() {
      canvas.getColorIndex(0, 0);
    }).throw(Error)
  });

});

describe("CanvasRGBA#getColorIndex", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGBA(1, 4);

    expect(function() {
      canvas.getColorIndex(0, 0);
    }).throw(Error)
  });

});
