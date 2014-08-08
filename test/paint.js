var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var oo = 12;
var __ =  0;

describe("#paint", function() {
  var canvas = null;

  beforeEach(function() {
    /*
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,$$,$$,$$,$$,
      __,__,__,__,oo,__,__,__,
      __,__,__,__,oo,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
    */
    canvas = new gretro.Canvas(8, 8);

    canvas.line(3, 0, 3, 2, $$);
    canvas.line(3, 2, 8, 2, $$);
    canvas.line(0, 5, 4, 5, $$);
    canvas.line(4, 5, 4, 8, $$);
    canvas.line(4, 3, 4, 4, oo);
  });

  it("should fill", function() {
    var result = canvas.paint(3, 3, ll);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      ll,ll,ll,$$,__,__,__,__,
      ll,ll,ll,$$,__,__,__,__,
      ll,ll,ll,$$,$$,$$,$$,$$,
      ll,ll,ll,ll,oo,__,__,__,
      ll,ll,ll,ll,oo,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
