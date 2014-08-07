var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#ellipse", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should draw an ellipse", function() {
    var result = canvas.ellipse(3, 3, 3, 2, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,__,__,
      $$,__,__,__,__,__,$$,__,
      $$,__,__,__,__,__,$$,__,
      $$,__,__,__,__,__,$$,__,
      __,$$,$$,$$,$$,$$,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should draw an ellipse", function() {
    var result = canvas.ellipse(3, 3, 3, 2, $$, true);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,__,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
