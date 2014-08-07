var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#tile", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should tile", function() {
    canvas.clear([　$$, __, 8 ]);

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


  it("should not tile", function() {
    canvas.clear([　__, __, 0 ]);

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
