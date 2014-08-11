var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#toIndexedColor", function() {

  it("should return Uint8Array contains index color", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.stroke(1).point(0, 0);
    canvas.stroke(2).point(0, 1);
    canvas.stroke(3).point(0, 2);
    canvas.stroke(4).point(0, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      1,
      2,
      3,
      4,
    ]));
  });

});

describe("CanvasRGB#toIndexedColor", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGB(1, 4);

    expect(function() {
      canvas.toIndexedColor();
    }).throw(Error)
  });

});

describe("CanvasRGBA#toIndexedColor", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGBA(1, 4);

    expect(function() {
      canvas.toIndexedColor();
    }).throw(Error)
  });

});
