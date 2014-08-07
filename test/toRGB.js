var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("#toRGB", function() {

  it("should return Uint8Array contains RGB data", function() {
    var canvas = new gretro.Canvas(1, 4);

    canvas.dot(0, 0, 1);
    canvas.dot(0, 1, 2);
    canvas.dot(0, 2, 3);
    canvas.dot(0, 3, 4);

    expect(canvas.toRGB()).to.eql(new Uint8Array([
      0x00, 0x00, 0x77,
      0x77, 0x00, 0x00,
      0x77, 0x00, 0x77,
      0x00, 0x77, 0x00,
    ]));
  });

});
