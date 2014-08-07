var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#circle", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should draw a circle", function() {
    var result = canvas.circle(3, 3, 3, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,$$,$$,$$,__,__,__,
      __,$$,__,__,__,$$,__,__,
      $$,__,__,__,__,__,$$,__,
      $$,__,__,__,__,__,$$,__,
      $$,__,__,__,__,__,$$,__,
      __,$$,__,__,__,$$,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should fill a circle", function() {
    var result = canvas.circle(3, 3, 3, $$, true);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,$$,$$,$$,__,__,__,
      __,$$,$$,$$,$$,$$,__,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
