var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("Canvas#circle", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to stroke a circle", function() {
    var result = canvas.stroke($$).noFill().circle(3, 3, 3);

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

  it("should be able to fill a circle", function() {
    var result = canvas.noStroke().fill($$).circle(3, 3, 3);

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

  it("should be able to fill and storke a circle", function() {
    var result = canvas.stroke($$).fill(ll).circle(3, 3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,$$,$$,$$,__,__,__,
      __,$$,ll,ll,ll,$$,__,__,
      $$,ll,ll,ll,ll,ll,$$,__,
      $$,ll,ll,ll,ll,ll,$$,__,
      $$,ll,ll,ll,ll,ll,$$,__,
      __,$$,ll,ll,ll,$$,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("shoule be able to clip", function() {
    var result = canvas.stroke($$).fill(ll).circle(0, 0, 4);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      ll,ll,ll,ll,$$,__,__,__,
      ll,ll,ll,ll,$$,__,__,__,
      ll,ll,ll,ll,$$,__,__,__,
      ll,ll,ll,$$,__,__,__,__,
      $$,$$,$$,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
