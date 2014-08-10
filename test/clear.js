var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("Canvas#clear", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to fill the entire canvas", function() {
    var result = canvas.fill($$).clear();

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

    expect(result, "should return self").to.equal(canvas);
  });

  it("should NOT be able to fill the entire canvas when noFill", function() {
    var result = canvas.noFill().clear();

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
