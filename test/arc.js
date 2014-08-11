var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

describe("Canvas#arc", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("NOT IMPLEMENTED YET", function() {
    expect(function() {
      canvas.arc();
    }).to.throw(Error);
  });

});
