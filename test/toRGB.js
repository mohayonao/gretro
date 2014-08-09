var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("#toRGB", function() {

  it("should return Uint8Array contains RGB data", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.stroke(1).dot(0, 0);
    canvas.stroke(2).dot(0, 1);
    canvas.stroke(3).dot(0, 2);
    canvas.stroke(4).dot(0, 3);

    expect(canvas.toRGB()).to.eql(new Uint8Array([
      0x00, 0x00, 0x77,
      0x77, 0x00, 0x00,
      0x77, 0x00, 0x77,
      0x00, 0x77, 0x00,
    ]));
  });

});
