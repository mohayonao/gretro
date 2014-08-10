var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#getHeight", function() {

  it("should return canvas height", function() {
    var canvas = new gretro.Canvas(1, 100);

    expect(canvas.getHeight()).to.equal(100);
  });

});
