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

  it("should return new canvas with given buffer", function() {
    var buffer = new Uint8Array(64);
    var canvas = new gretro.Canvas(8, 8, buffer);

    expect(canvas.getRawData()).to.equal(buffer);
  });

  it("should return new rgb-canvas with given buffer", function() {
    var buffer = new Uint8Array(64 * 3);
    var canvas = new gretro.Canvas(8, 8, buffer);

    expect(canvas.getRawData()).to.equal(buffer);
    expect(canvas).to.be.an.instanceOf(gretro.CanvasRGB);
  });

  it("should return new rgba-canvas with given buffer", function() {
    var buffer = new Uint8Array(64 * 4);
    var canvas = new gretro.Canvas(8, 8, buffer);

    expect(canvas.getRawData()).to.equal(buffer);
    expect(canvas).to.be.an.instanceOf(gretro.CanvasRGBA);
  });

});

describe("CanvasRGB", function() {

  it("should be inherited Canvas", function() {
    var canvas = new gretro.CanvasRGB(8, 8);

    expect(canvas).to.be.an.instanceOf(gretro.CanvasRGB);
    expect(canvas).to.be.an.instanceOf(gretro.Canvas);
  });

  it("should be able to directly draw", function() {
    var buffer = new Uint8Array([
      0x11, 0x22, 0x33, 0x44, 0x55, 0x66,
      0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc,
    ]);
    var canvas = new gretro.CanvasRGB(2, 2, buffer);

    canvas.fill(function(x, y) {
      return x === y ? 1 : -1;
    }).clear();

    expect(buffer).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0x44, 0x55, 0x66,
      0x77, 0x88, 0x99, 0x00, 0x00, 0x77,
    ]));
  });

});

describe("CanvasRGBA", function() {

  it("should be inherited CanvasRGB", function() {
    var canvas = new gretro.CanvasRGBA(8, 8);

    expect(canvas).to.be.an.instanceOf(gretro.CanvasRGBA);
    expect(canvas).to.be.an.instanceOf(gretro.CanvasRGB);
    expect(canvas).to.be.an.instanceOf(gretro.Canvas);
  });

  it("should be able to directly draw", function() {
    var buffer = new Uint8Array([
      0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88,
      0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff, 0x00,
    ]);
    var canvas = new gretro.CanvasRGBA(2, 2, buffer);

    canvas.fill(function(x, y) {
      return x === y ? 1 : -1;
    }).clear();

    expect(buffer).to.eql(new Uint8Array([
      0x00, 0x00, 0x77, 0x44, 0x55, 0x66, 0x77, 0x88,
      0x99, 0xaa, 0xbb, 0xcc, 0x00, 0x00, 0x77, 0x00,
    ]));
  });

});
