var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#clear", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should fill the entire canvas", function() {
    var result = canvas.clear($$);

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

});
