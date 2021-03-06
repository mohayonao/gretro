var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("Canvas#paste", function() {
  var canvas = null;
  var src    = null;

  before(function() {
    /*
    __,__,$$,$$,$$,__,__,__,
    __,$$,__,__,__,$$,__,__,
    $$,__,__,__,__,__,$$,__,
    $$,__,__,__,__,__,$$,__,
    $$,__,__,__,__,__,$$,__,
    __,$$,__,__,__,$$,__,__,
    __,__,$$,$$,$$,__,__,__,
    __,__,__,__,__,__,__,__,
    */
    src = new gretro.Canvas(8, 8);
    src.stroke($$).noFill().circle(3, 3, 3);
  });

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to paste the specified canvas", function() {
    var result = canvas.paste(src, 0, 0, -1);

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

  it("should be able to paste with masking", function() {
    canvas.mask([
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
    ]).paste(src, 0, 0, -1);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
      $$,__,__,__,__,__,$$,__,
      __,__,__,__,__,__,__,__,
      $$,__,__,__,__,__,$$,__,
      __,__,__,__,__,__,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));
  });

  describe("clipping", function() {
    it("left", function() {
      canvas.paste(src, -4, 0, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        $$,__,__,__,__,__,__,__,
        __,$$,__,__,__,__,__,__,
        __,__,$$,__,__,__,__,__,
        __,__,$$,__,__,__,__,__,
        __,__,$$,__,__,__,__,__,
        __,$$,__,__,__,__,__,__,
        $$,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
      ]));
    });
    it("left top", function() {
      canvas.paste(src, -4, -4, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,$$,__,__,__,__,__,
        __,$$,__,__,__,__,__,__,
        $$,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
      ]));
    });
    it("top", function() {
      canvas.paste(src, 0, -4, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        $$,__,__,__,__,__,$$,__,
        __,$$,__,__,__,$$,__,__,
        __,__,$$,$$,$$,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
      ]));
    });
    it("right top", function() {
      canvas.paste(src, 4, -4, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,$$,__,__,__,
        __,__,__,__,__,$$,__,__,
        __,__,__,__,__,__,$$,$$,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
      ]));
    });
    it("right", function() {
      canvas.paste(src, 4, 0, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,$$,$$,
        __,__,__,__,__,$$,__,__,
        __,__,__,__,$$,__,__,__,
        __,__,__,__,$$,__,__,__,
        __,__,__,__,$$,__,__,__,
        __,__,__,__,__,$$,__,__,
        __,__,__,__,__,__,$$,$$,
        __,__,__,__,__,__,__,__,
      ]));
    });
    it("right bottom", function() {
      canvas.paste(src, 4, 4, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,$$,$$,
        __,__,__,__,__,$$,__,__,
        __,__,__,__,$$,__,__,__,
        __,__,__,__,$$,__,__,__,
      ]));
    });
    it("bottom", function() {
      canvas.paste(src, 0, 4, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,$$,$$,$$,__,__,__,
        __,$$,__,__,__,$$,__,__,
        $$,__,__,__,__,__,$$,__,
        $$,__,__,__,__,__,$$,__,
      ]));
    });
    it("bottom left", function() {
      canvas.paste(src, -4, 4, -1);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        $$,__,__,__,__,__,__,__,
        __,$$,__,__,__,__,__,__,
        __,__,$$,__,__,__,__,__,
        __,__,$$,__,__,__,__,__,
      ]));
    });
  });

  describe("error case", function() {
    it("invalid argument", function() {
      var saved = new Uint8Array(canvas.getRawData());
      var src = new gretro.CanvasRGB(8, 8);

      src.stroke($$).noFill().circle(3, 3, 3);

      canvas.paste(src, -4, 4, -1);

      expect(canvas.getRawData()).to.eql(saved);
    });
  });

});

describe("CanvasRGB#paste", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.CanvasRGB(8, 8);
  });

  it("should be able to paste the specified canvas", function() {
    var src = new gretro.CanvasRGB(8, 8);

    src.stroke($$).noFill().circle(3, 3, 3);
    var result = canvas.paste(src, 0, 0, -1);

    expect(canvas.toRGB()).to.eql(src.toRGB());

    expect(result, "should return self").to.equal(canvas);
  });

  describe("error case", function() {
    it("invalid argument", function() {
      var saved = new Uint8Array(canvas.getRawData());
      var src = new gretro.Canvas(8, 8);

      src.stroke($$).noFill().circle(3, 3, 3);

      canvas.paste(src, -4, 4, -1);

      expect(canvas.getRawData()).to.eql(saved);
    });
  });

});

describe("CanvasRGBA#paste", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.CanvasRGBA(8, 8);
  });

  it("should be able to paste the specified canvas", function() {
    var src = new gretro.CanvasRGBA(8, 8);

    src.stroke($$).noFill().circle(3, 3, 3);
    var result = canvas.paste(src, 0, 0, -1);

    expect(canvas.toRGBA()).to.eql(src.toRGBA());

    expect(result, "should return self").to.equal(canvas);
  });

  describe("error case", function() {
    it("invalid argument", function() {
      var saved = new Uint8Array(canvas.getRawData());
      var src = new gretro.Canvas(8, 8);

      src.stroke($$).noFill().circle(3, 3, 3);

      canvas.paste(src, -4, 4, -1);

      expect(canvas.getRawData()).to.eql(saved);
    });
  });

});
