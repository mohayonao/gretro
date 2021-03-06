var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#toRGBA", function() {

  it("should return Uint8Array contains RGBA data with specified alpha", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.stroke(1).point(0, 0);
    canvas.stroke(2).point(0, 1);
    canvas.stroke(3).point(0, 2);
    canvas.stroke(4).point(0, 3);

    expect(canvas.toRGBA()).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0xff,
      0x77, 0x00, 0x00, 0xff,
      0x77, 0x00, 0x77, 0xff,
      0x00, 0x77, 0x00, 0xff,
    ]));
  });

});

describe("CanvasRGB#toRGBA", function() {

  it("should return Uint8Array contains RGBA data", function() {
    var canvas = new gretro.CanvasRGB(1, 4);

    canvas.stroke(1).point(0, 0);
    canvas.stroke(2).point(0, 1);
    canvas.stroke(3).point(0, 2);
    canvas.stroke(4).point(0, 3);

    expect(canvas.toRGBA()).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0xff,
      0x77, 0x00, 0x00, 0xff,
      0x77, 0x00, 0x77, 0xff,
      0x00, 0x77, 0x00, 0xff,
    ]));
  });

});

describe("CanvasRGBA#toRGBA", function() {

  it("should return Uint8Array contains RGBA data", function() {
    var canvas = new gretro.CanvasRGBA(1, 4);

    canvas.stroke(1).point(0, 0);
    canvas.stroke(2).point(0, 1);
    canvas.stroke(3).point(0, 2);
    canvas.stroke(4).point(0, 3);

    expect(canvas.toRGBA()).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0x00,
      0x77, 0x00, 0x00, 0x00,
      0x77, 0x00, 0x77, 0x00,
      0x00, 0x77, 0x00, 0x00,
    ]));
  });

});
