var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#getRawData", function() {

  it("should return raw data", function() {
    var canvas = new gretro.Canvas(4, 4);

    canvas.fill([ 2, 4, 8 ]).clear();

    expect(canvas.getRawData()).to.eql(new Uint8Array([
      4, 2, 4, 2,
      2, 4, 2, 4,
      4, 2, 4, 2,
      2, 4, 2, 4,
    ]));
  });

});
