var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#toMask", function() {

  it("should return Uint8Array contains 0 or 15", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.stroke(0).dot(0, 0);
    canvas.stroke(1).dot(0, 1);
    canvas.stroke(2).dot(0, 2);
    canvas.stroke(3).dot(0, 3);

    expect(canvas.toMask()).to.eql(new Uint8Array([
      0,
      15,
      15,
      15,
    ]));
  });

});

describe("CanvasRGB#toMask", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGB(1, 4);

    expect(function() {
      canvas.toMask();
    }).throw(Error)
  });

});

describe("CanvasRGBA#toMask", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGBA(1, 4);

    expect(function() {
      canvas.toMask();
    }).throw(Error)
  });

});
