var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("#toRGBA", function() {

  it("should return Uint8Array contains RGBA data", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.stroke(1).dot(0, 0);
    canvas.stroke(2).dot(0, 1);
    canvas.stroke(3).dot(0, 2);
    canvas.stroke(4).dot(0, 3);

    expect(canvas.toRGBA()).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0xff,
      0x77, 0x00, 0x00, 0xff,
      0x77, 0x00, 0x77, 0xff,
      0x00, 0x77, 0x00, 0xff,
    ]));
  });

  it("should return Uint8Array contains RGBA data with specified alpha", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.stroke(1).dot(0, 0);
    canvas.stroke(2).dot(0, 1);
    canvas.stroke(3).dot(0, 2);
    canvas.stroke(4).dot(0, 3);

    expect(canvas.toRGBA(0xaa)).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0xaa,
      0x77, 0x00, 0x00, 0xaa,
      0x77, 0x00, 0x77, 0xaa,
      0x00, 0x77, 0x00, 0xaa,
    ]));
  });

});
