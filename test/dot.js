var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#dot", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should dot a single point", function() {
    var result = canvas.dot(2, 2, $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,$$,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
