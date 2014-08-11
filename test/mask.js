var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("mask", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to mask", function() {
    canvas.mask([
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
    ]).noStroke().fill($$).circle(3, 3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));
  });

  it("mask should be able to remove", function() {
    canvas.mask([
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
    ]).noMask().noStroke().fill($$).circle(3, 3, 3);

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

  it("canvas should be converted as mask automatically", function() {
    var mask = new gretro.Canvas(8, 8)
      .fill($$).clear().fill(__).rect(2, 0, 3, 3);

    canvas.mask(mask).noStroke().fill($$).circle(3, 3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,__,__,__,$$,__,__,
      $$,$$,__,__,__,$$,$$,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      $$,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));
  });

  describe("CanvasRGB", function() {
    it("should be able to be applied mask", function() {
      var canvas = new gretro.CanvasRGB(2, 2);

      canvas.mask([
        1, 0,
        0, 1
      ]).fill($$).clear();

      expect(canvas.toRGB()).to.eql(new Uint8Array([
        0xff, 0xff, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0xff, 0xff, 0xff,
      ]));
    });
  });

  describe("CanvasRGBA", function() {
    it("should be able to be applied mask", function() {
      var canvas = new gretro.CanvasRGBA(2, 2);

      canvas.mask([
        1, 0,
        0, 1
      ]).fill($$).clear();

      expect(canvas.toRGBA()).to.eql(new Uint8Array([
        0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00,
      ]));
    });
  });

});
