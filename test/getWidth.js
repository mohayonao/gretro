var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#getWidth", function() {

  it("should return canvas width", function() {
    var canvas = new gretro.Canvas(100, 1);

    expect(canvas.getWidth()).to.equal(100);
  });

});
