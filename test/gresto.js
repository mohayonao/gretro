"use strict";

var chai = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("gretro", function() {
  it("version", function() {
    var pkg = require("../package.json");

    expect(gretro.version).to.equal(pkg.version);
  });
  describe("Canvas", function() {
    describe(".new", function() {
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
    });
    describe("#getWidth", function() {
      it("should return canvas width", function() {
        var canvas = new gretro.Canvas(8, 1);

        expect(canvas.getWidth()).to.equal(8);
      });
    });
    describe("#getHeight", function() {
      it("should return canvas height", function() {
        var canvas = new gretro.Canvas(1, 8);

        expect(canvas.getHeight()).to.equal(8);
      });
    });
    describe("#getColor / #setColor", function() {
      it("should get/set RGB data hex color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.setColor(1, 0x2ecc71);

        expect(canvas.getColor(1)).to.equal(0x22cc77);
      });
    });
    describe("#getTile / #setTile", function() {
      it("should get/set tile pattern data", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.setTile(1, 0xf0f0);

        expect(canvas.getTile(1)).to.equal(0xf0f0);
      });
      it("should not set when index is 0", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.setTile(0, 0xf0f0);

        expect(canvas.getTile(0)).to.equal(0x0000);
      });
    });
    describe("#clear", function() {
      it("should fill the entire canvas with the specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
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
    describe("#dot", function() {
      it("should dot a single point with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.dot(2, 2, $$);

        canvas.dot(5, 6, $$);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,$$,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,$$,__,__,
          __,__,__,__,__,__,__,__,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
    });
    describe("#line", function() {
      it("should draw a line segment with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.line(0, 0, 8, 3, $$);

        canvas.line(0, 0, 3, 8, $$);
        canvas.line(7, 4, 7, 8, $$);
        canvas.line(4, 7, 8, 7, $$);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
            $$,$$,__,__,__,__,__,__,
            $$,__,$$,$$,__,__,__,__,
            __,$$,__,__,$$,$$,$$,__,
            __,$$,__,__,__,__,__,$$,
            __,__,$$,__,__,__,__,$$,
            __,__,$$,__,__,__,__,$$,
            __,__,$$,__,__,__,__,$$,
            __,__,__,$$,$$,$$,$$,$$,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
    });
    describe("#rect", function() {
      it("should draw a rect with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.rect(1, 1, 3, 3, $$);

        canvas.rect(6, 6, -3, -3, $$);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
            __,__,__,__,__,__,__,__,
            __,$$,$$,$$,__,__,__,__,
            __,$$,__,$$,__,__,__,__,
            __,$$,$$,$$,__,__,__,__,
            __,__,__,__,$$,$$,$$,__,
            __,__,__,__,$$,__,$$,__,
            __,__,__,__,$$,$$,$$,__,
            __,__,__,__,__,__,__,__,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
      it("should fill a rect with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.rect(1, 1, 6, 6, $$, true);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,__,__,__,__,__,__,__,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
    });
    describe("#circle", function() {
      it("should draw a circle with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.circle(3, 3, 3, $$);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,$$,$$,$$,__,__,__,
          __,$$,__,__,__,$$,__,__,
          $$,__,__,__,__,__,$$,__,
          $$,__,__,__,__,__,$$,__,
          $$,__,__,__,__,__,$$,__,
          __,$$,__,__,__,$$,__,__,
          __,__,$$,$$,$$,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
      it("should fill a circle with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.circle(3, 3, 3, $$, true);

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

        expect(result, "should return self").to.equal(canvas);
      });
    });
    describe("#ellipse", function() {
      it("should draw an ellipse with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.ellipse(3, 3, 3, 2, $$);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          $$,__,__,__,__,__,$$,__,
          $$,__,__,__,__,__,$$,__,
          $$,__,__,__,__,__,$$,__,
          __,$$,$$,$$,$$,$$,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
      it("should fill an ellipse with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.ellipse(3, 3, 3, 2, $$, true);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          __,$$,$$,$$,$$,$$,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
    });
    describe("#text", function() {
      it("should draw a text with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.text("A", 0, 0, $$);

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
      it("should skip if not ascii char", function() {
        var canvas = new gretro.Canvas(8, 8);
        var result = canvas.text("日本語", 0, 0, $$);

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
    describe("#paint", function() {
      it("should fill with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);

        canvas.line(3, 0, 3, 2, $$);
        canvas.line(3, 2, 8, 2, $$);
        canvas.line(0, 5, 4, 5, $$);
        canvas.line(4, 5, 4, 8, $$);

        var result = canvas.paint(3, 3, ll);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          ll,ll,ll,$$,__,__,__,__,
          ll,ll,ll,$$,__,__,__,__,
          ll,ll,ll,$$,$$,$$,$$,$$,
          ll,ll,ll,ll,ll,ll,ll,ll,
          ll,ll,ll,ll,ll,ll,ll,ll,
          $$,$$,$$,$$,$$,ll,ll,ll,
          __,__,__,__,$$,ll,ll,ll,
          __,__,__,__,$$,ll,ll,ll,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
      it("should fill with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);

        canvas.line(3, 0, 3, 2, $$);
        canvas.line(3, 2, 8, 2, $$);
        canvas.line(0, 5, 4, 5, $$);
        canvas.line(4, 5, 4, 8, $$);
        canvas.line(4, 3, 4, 4, ll);

        var result = canvas.paint(3, 3, $$, true);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          $$,$$,$$,$$,__,__,__,__,
          $$,$$,$$,$$,__,__,__,__,
          $$,$$,$$,$$,$$,$$,$$,$$,
          $$,$$,$$,$$,$$,$$,$$,$$,
          $$,$$,$$,$$,$$,$$,$$,$$,
          $$,$$,$$,$$,$$,$$,$$,$$,
          __,__,__,__,$$,$$,$$,$$,
          __,__,__,__,$$,$$,$$,$$,
        ]));

        expect(result, "should return self").to.equal(canvas);
      });
    });
    describe("#plotter", function() {
      it("should plot with specified color", function() {
        var canvas = new gretro.Canvas(8, 8);
        var plotter = canvas.plotter(1, 1, $$);

        plotter.lineTo(5, 1);
        plotter.moveTo(1, 5);
        plotter.lineToRel(5, 0);
        plotter.moveToRel(1, 1);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,$$,$$,$$,$$,$$,$$,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));

        expect(plotter.getX()).to.equal(7);
        expect(plotter.getY()).to.equal(6);
      });
    });
    describe("#clone", function() {
      it("should return clone", function() {
        var canvas = new gretro.Canvas(8, 8);

        canvas.setColor(2, 0x123456);
        canvas.circle(4, 4, 3, 2);

        var cloned = canvas.clone();

        expect(canvas).to.not.equal(cloned);
        expect(cloned.toRGB()).to.eql(canvas.toRGB());
      });
    });
    describe("#toRGB", function() {
      it("should return Uint8Array contains RGB data", function() {
        var canvas = new gretro.Canvas(2, 2);

        canvas.clear(1);

        expect(canvas.toRGB()).to.eql(new Uint8Array([
          0x00, 0x00, 0x77,  0x00, 0x00, 0x77,
          0x00, 0x00, 0x77,  0x00, 0x00, 0x77,
        ]));
      });
    });
    describe("#toRGBA", function() {
      it("should return Uint8Array contains RGBA data", function() {
        var canvas = new gretro.Canvas(2, 2);

        canvas.clear(1);

        expect(canvas.toRGBA()).to.eql(new Uint8Array([
          0x00, 0x00, 0x77, 0xff,  0x00, 0x00, 0x77, 0xff,
          0x00, 0x00, 0x77, 0xff,  0x00, 0x00, 0x77, 0xff,
        ]));
      });
    });
  });
  describe("Color", function() {
    it("color with tile pattern", function() {
      var canvas = new gretro.Canvas(8, 8);

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
    it("color with tile pattern", function() {
      var canvas = new gretro.Canvas(8, 8);

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
