var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#char", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should draw a char", function() {
    var result = canvas.char(65, 0, 0, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,$$,$$,$$,__,__,__,__,
      $$,__,__,__,$$,__,__,__,
      $$,__,__,__,$$,__,__,__,
      $$,__,__,__,$$,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      $$,__,__,__,$$,__,__,__,
      $$,__,__,__,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should draw a char", function() {
    var result = canvas.char("日本語".charCodeAt(0), 0, 0, $$);

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

    expect(result, "should return self").to.equal(canvas);
  });

});
