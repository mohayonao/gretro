var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#line", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should draw a line", function() {
    var result = canvas.line(1, 3, 6, 3, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should draw a line", function() {
    var result = canvas.line(3, 1, 3, 6, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should draw a line", function() {
    var result = canvas.line(0, 0, 7, 3, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,$$,__,__,__,__,__,__,
      __,__,$$,$$,__,__,__,__,
      __,__,__,__,$$,$$,__,__,
      __,__,__,__,__,__,$$,$$,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should draw a line", function() {
    var result = canvas.line(0, 0, 3, 7, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,__,__,__,__,__,__,__,
      $$,__,__,__,__,__,__,__,
      __,$$,__,__,__,__,__,__,
      __,$$,__,__,__,__,__,__,
      __,__,$$,__,__,__,__,__,
      __,__,$$,__,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
