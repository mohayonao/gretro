var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("Canvas", function() {

  it("should return new canvas with the specified size", function() {
    var canvas = new gretro.Canvas(8, 8);

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

  describe("#getWidth", function() {
    it("should return canvas width", function() {
      var canvas = new gretro.Canvas(100, 1);

      expect(canvas.getWidth()).to.equal(100);
    });
  });

  describe("#getHeight", function() {
    it("should return canvas height", function() {
      var canvas = new gretro.Canvas(1, 100);

      expect(canvas.getHeight()).to.equal(100);
    });
  });

  describe("#setColor", function() {
    it("should set RGB hex color code", function() {
      var canvas = new gretro.Canvas(1, 1);
      var result = canvas.setColor(1, 0x2ecc71);

      expect(result, "should return self").to.equal(canvas);
      expect(canvas.getColor(1)).to.equal(0x22cc77);
    });
  });

  describe("#setTile", function() {
    it("should set tile pattern code", function() {
      var canvas = new gretro.Canvas(8, 8);
      var result = canvas.setTile(1, 0xf0f0);

      expect(result, "should return self").to.equal(canvas);
      expect(canvas.getTile(1)).to.equal(0xf0f0);
    });
    it("should not set tile pattern code if tileIndex is 0", function() {
      var canvas = new gretro.Canvas(8, 8);
      var result = canvas.setTile(0, 0xf0f0);

      expect(result, "should return self").to.equal(canvas);
      expect(canvas.getTile(0)).to.equal(0x0000);
    });
  });

  describe("#getColorIndex", function() {
    it("should return color index", function() {
      var canvas = new gretro.Canvas(8, 8);

      canvas.paint(0, 0, [ 0, 4, 8 ]);

      expect(canvas.getColorIndex( 0,  0)).to.equal( 4);
      expect(canvas.getColorIndex( 1,  0)).to.equal( 0);
      expect(canvas.getColorIndex(-1, -1)).to.equal(-1);
    });
  });

  describe("#clone", function() {
    it("should return a clone", function() {
      var canvas = new gretro.Canvas(8, 8);

      canvas.setColor(2, 0x123456);
      canvas.circle(4, 4, 3, 2);

      var cloned = canvas.clone();

      expect(canvas).to.not.equal(cloned);
      expect(cloned.toRGB()).to.eql(canvas.toRGB());
    });
  });

  describe("error case", function() {
    it("should replace 0 if got an invalid argument", function() {
      var canvas = new gretro.Canvas(8, 8);

      canvas.clear($$);
      canvas.clear("blue");

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

});
