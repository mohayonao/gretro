var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#clone", function() {

  it("should return a cloned canvas", function() {
    var canvas = new gretro.Canvas(8, 8);

    canvas.setColor(2, 0x123456);
    canvas.stroke(2).circle(4, 4, 3);

    var cloned = canvas.clone();

    expect(cloned).to.not.equal(canvas);
    expect(cloned.getRawData()).to.not.equal(canvas.getRawData());
    expect(cloned.toRGB()).to.eql(canvas.toRGB());
    expect(cloned.getColor(2)).to.equal(canvas.getColor(2));
  });

});
