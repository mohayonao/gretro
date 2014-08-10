var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("Canvas#text", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(16, 8);
  });

  it("should draw a text", function() {
    var result = canvas.stroke($$).noFill().text("ABC", 0, 0);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,$$,$$,$$,__,__, $$,$$,$$,$$,__,__, __,$$,$$,$$,
      $$,__,__,__,$$,__, $$,__,__,__,$$,__, $$,__,__,__,
      $$,__,__,__,$$,__, $$,__,__,__,$$,__, $$,__,__,__,
      $$,__,__,__,$$,__, $$,$$,$$,$$,__,__, $$,__,__,__,
      $$,$$,$$,$$,$$,__, $$,__,__,__,$$,__, $$,__,__,__,
      $$,__,__,__,$$,__, $$,__,__,__,$$,__, $$,__,__,__,
      $$,__,__,__,$$,__, $$,$$,$$,$$,__,__, __,$$,$$,$$,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should NOT be able to fill an character", function() {
    var result = canvas.noStroke().fill($$).text("ABC", 0, 0);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
      __,__,__,__,__,__, __,__,__,__,__,__, __,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
