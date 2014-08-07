var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#rect", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should draw a rectangle", function() {
    var result = canvas.rect(1, 1, 6, 6, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });


  it("should draw a rectangle", function() {
    var result = canvas.rect(6, 6, -6, -6, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,__,__,__,__,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should fill a rectangle", function() {
    var result = canvas.rect(1, 1, 6, 6, $$, true);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should fill a rectangle", function() {
    var result = canvas.rect(6, 6, -6, -6, $$, true);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
