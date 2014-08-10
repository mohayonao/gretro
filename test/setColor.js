var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#setColor", function() {

  it("should set RGB hex color code", function() {
    var canvas = new gretro.Canvas(1, 1);
    var result = canvas.setColor(1, 0x2ecc71);

    expect(result, "should return self").to.equal(canvas);
    expect(canvas.getColor(1)).to.equal(0x22cc77);
  });

});
