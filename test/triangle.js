var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("Canvas#triangle", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to stroke a triangle", function() {
    var result = canvas.stroke($$).noFill().triangle(1, 1, 6, 3, 3, 6);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,__,__,__,__,__,
      __,$$,__,$$,$$,__,__,__,
      __,__,$$,__,__,$$,$$,__,
      __,__,$$,__,__,$$,__,__,
      __,__,__,$$,$$,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to fill a triangle", function() {
    var result = canvas.noStroke().fill($$).triangle(1, 1, 6, 3, 3, 6);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,__,__,__,__,__,__,
      __,$$,$$,$$,$$,__,__,__,
      __,__,$$,$$,$$,$$,$$,__,
      __,__,$$,$$,$$,$$,__,__,
      __,__,__,$$,$$,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to fill and stroke a triangle", function() {
    var result = canvas.stroke($$).fill(ll).triangle(1, 1, 6, 3, 3, 6);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,__,__,__,__,__,
      __,$$,ll,$$,$$,__,__,__,
      __,__,$$,ll,ll,$$,$$,__,
      __,__,$$,ll,ll,$$,__,__,
      __,__,__,$$,$$,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
