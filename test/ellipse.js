var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("Canvas#ellipse", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to stroke an ellipse", function() {
    var result = canvas.stroke($$).noFill().ellipse(3, 3, 3, 2);

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

  it("should be able to fill an ellipse", function() {
    var result = canvas.noStroke().fill($$).ellipse(3, 3, 3, 2);

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

  it("should be able to fill and stroke an ellipse", function() {
    var result = canvas.stroke($$).fill(ll).ellipse(3, 3, 3, 2);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,__,__,
      $$,ll,ll,ll,ll,ll,$$,__,
      $$,ll,ll,ll,ll,ll,$$,__,
      $$,ll,ll,ll,ll,ll,$$,__,
      __,$$,$$,$$,$$,$$,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to clip", function() {
    var result = canvas.stroke($$).fill(ll).ellipse(0, 0, 3, 2);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      ll,ll,ll,$$,__,__,__,__,
      ll,ll,ll,$$,__,__,__,__,
      $$,$$,$$,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
