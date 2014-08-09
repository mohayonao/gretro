var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#line", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
    canvas.noFill().stroke($$);
  });

  it("should be able to draw a horizontal line", function() {
    var result = canvas.line(1, 3, 6, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to draw a horizontal line with clipping", function() {
    var result = canvas.line(-100, 3, 100, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      $$,$$,$$,$$,$$,$$,$$,$$,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to draw a vertical line", function() {
    var result = canvas.line(3, 1, 3, 6);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to draw a vertical line with clipping", function() {
    var result = canvas.line(3, -100, 3, 100);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to draw a diagonal line", function() {
    var result = canvas.line(0, 0, 7, 3); // ↘

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,$$,__,__,__,__,__,__,
      __,__,$$,$$,__,__,__,__,
      __,__,__,__,$$,$$,__,__,
      __,__,__,__,__,__,$$,$$,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to draw a diagonal steep line", function() {
    var result = canvas.line(0, 0, 3, 7); // ↘

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,__,__,__,__,__,__,__,
      $$,__,__,__,__,__,__,__,
      __,$$,__,__,__,__,__,__,
      __,$$,__,__,__,__,__,__,
      __,__,$$,__,__,__,__,__,
      __,__,$$,__,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  describe("should be able to draw a diagonal line with clipping", function() {
    describe("left", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          $$,__,__,__,__,__,__,__,
          __,$$,$$,__,__,__,__,__,
          __,__,__,$$,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));
      });
      it("↖", function() {
        canvas.line(3, 3, -4, 0);
      });

      it("↘", function() {
        canvas.line(-4, 0, 3, 3);
      });
    });

    describe("right", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,$$,$$,__,__,
          __,__,__,__,__,__,$$,$$,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));
      });
      it("↘", function() {
        canvas.line(4, 4, 11, 7);
      });

      it("↖", function() {
        canvas.line(11, 7, 4, 4);
      });
    });

    describe("top", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,$$,__,__,__,__,__,__,
          __,__,$$,__,__,__,__,__,
          __,__,$$,__,__,__,__,__,
          __,__,__,$$,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));
      });
      it("↖", function() {
        canvas.line(3, 3, 0, -4);
      });
      it("↘", function() {
        canvas.line(0, -4, 3, 3);
      });
    });

    describe("bottom", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,$$,__,__,__,
          __,__,__,__,$$,__,__,__,
          __,__,__,__,__,$$,__,__,
          __,__,__,__,__,$$,__,__,
        ]));
      });
      it("↘", function() {
        canvas.line(4, 4, 7, 11);
      });
      it("↖", function() {
        canvas.line(7, 11, 4, 4);
      });
    });
  });

  describe("invisible line", function() {
    afterEach(function() {
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
    it("left", function() {
      canvas.line(-8, 0, -1, 7);
    });
    it("left top", function() {
      canvas.line(-4, 3, 1, -8);
    });
    it("top", function() {
      canvas.line(0, -1, 7, -8);
    });
    it("top right", function() {
      canvas.line(6, -8, 11, 3);
    });
    it("right", function() {
      canvas.line(8, 0, 15, 7);
    });
    it("right bottom", function() {
      canvas.line(11, 4, 6, 15);
    });
    it("bottom", function() {
      canvas.line(7, 8, 0, 15);
    });
    it("bottom left", function() {
      canvas.line(1, 15, -4, 4);
    });

    it("top horizontal", function() {
      canvas.line(-10, -1, 10, -1);
    });
    it("right vertical", function() {
      canvas.line(10, -10, 10, 10);
    });
    it("bottom horizontal", function() {
      canvas.line(-10, 8, 10, 8);
    });
    it("left vertical", function() {
      canvas.line(-1, -10, -1, 10);
    });
    it("should NOT able to fill a line", function() {
      canvas.noStroke().fill($$).line(1, 3, 6, 3);
    });
  });

});
