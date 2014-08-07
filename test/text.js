var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#text", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(16, 8);
  });

  it("should draw a text", function() {
    var result = canvas.text("ABC", 0, 0, $$);

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

});
