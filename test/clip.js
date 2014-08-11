var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("clip", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("clipping", function() {
    canvas.clip(0, 0, 4, 4).noStroke().fill($$).circle(3, 3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,$$,$$,__,__,__,__,
      __,$$,$$,$$,__,__,__,__,
      $$,$$,$$,$$,__,__,__,__,
      $$,$$,$$,$$,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));
  });

  it("noClip", function() {
    canvas.clip(0, 0, 4, 4).noClip().noStroke().fill($$).circle(3, 3, 3);

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
  });

});
