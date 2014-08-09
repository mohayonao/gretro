var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("color", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("shoule be able to set a number as monotone", function() {
    canvas.fill($$).clear();

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
      $$,$$,$$,$$,$$,$$,$$,$$,
    ]));
  });

  it("should be able to an array as tile pattern", function() {
    canvas.fill([　$$, __, 8 ]).clear();

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
    ]));
  });

  it("should convert an array to monotone if like monotone pattern", function() {
    canvas.fill([　__, __, 0 ]).clear();

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));
  });

  it("should be able to a function as color generator", function() {
    canvas.fill(function(x, y) {
      return y & 1 ? $$ : -1;
    }).clear();

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,$$,
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,$$,
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,$$,
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,$$,
    ]));
  });

  it("should convert an invalid value to 0", function() {
    canvas.fill($$).clear();
    canvas.fill("").clear();

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));
  });

});
