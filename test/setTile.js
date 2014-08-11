var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#setTile", function() {

  it("should set tile pattern code", function() {
    var canvas = new gretro.Canvas(8, 8);
    var result = canvas.setTile(16, 0xf0f0);

    expect(result, "should return self").to.equal(canvas);
    expect(canvas.getTile(16)).to.equal(0xf0f0);
  });

  it("should NOT set tile pattern code if tileIndex <= 15", function() {
    var canvas = new gretro.Canvas(8, 8);
    var result = canvas.setTile(0, 0xf0f0);

    expect(result, "should return self").to.equal(canvas);
    expect(canvas.getTile(0)).to.equal(0x0000);
  });

});
